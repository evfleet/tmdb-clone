import * as fetch from "isomorphic-unfetch";
import * as moment from "moment";

const movieAPIKey = process.env.MOVIEDB_KEY;

function secondsLeftToday() {
  const now = moment();
  const tomorrow = moment()
    .add(1, "day")
    .startOf("day");
  const difference = moment.duration(tomorrow.diff(now));

  return Math.round(difference.asSeconds());
}

function movieAPI(path) {
  return fetch(`https://api.themoviedb.org/3${path}?api_key=${movieAPIKey}`).then(res =>
    res.json()
  );
}

export default {
  Query: {
    getCurrentMovies: async (_parent, _args, { redis }) => {
      try {
        const redisKey = "homepage_in_theaters";
        const cachedMovies = await redis.get(redisKey);

        if (cachedMovies) {
          return JSON.parse(cachedMovies);
        }

        const { results } = await movieAPI(`/movie/now_playing`);

        const movies = await Promise.all([
          ...results.slice(0, 3).map(movie => {
            return new Promise(async resolve => {
              const { cast } = await movieAPI(`/movie/${movie.id}/credits`);
              const actors = cast.slice(0, 5).map(({ name }) => name);

              resolve({ ...movie, actors });
            });
          })
        ]);

        await redis.setex(redisKey, secondsLeftToday(), JSON.stringify(movies));
        return movies;
      } catch (error) {
        console.log("error", error);
        return [];
      }
    },

    getCurrentShows: async (_parent, _args, { redis }) => {
      try {
        const redisKey = "homepage_upcoming_tv";
        const cachedShows = await redis.get(redisKey);

        if (cachedShows) {
          return JSON.parse(cachedShows);
        }

        // Get current shows on air
        const { results } = await movieAPI(`/tv/on_the_air`);

        // Calculate next air date for first three currently on air shows
        const shows = await Promise.all([
          // Get first three shows
          ...results.slice(0, 3).map(show => {
            return new Promise(async (resolve, reject) => {
              // Get details for each show
              const { seasons, status } = await movieAPI(`/tv/${show.id}`);

              // Reject if the show is not currently on the air
              if (status !== "Returning Series") {
                reject(`$[show.name} is not running episodes`);
              }

              const currentSeason = seasons.slice(-1)[0].season_number;
              const { episodes } = await movieAPI(`/tv/${show.id}/season/${currentSeason}`);

              // Find upcoming episode date
              const { air_date } = episodes.find(episode => {
                const airDate = moment(episode.air_date);
                const dayDiff = airDate.diff(new Date(), "days");

                if (dayDiff >= 0 && dayDiff <= 7) {
                  return true;
                }
              });

              resolve({ ...show, next_air_date: air_date });
            });
          })
        ]);

        await redis.setex(redisKey, secondsLeftToday(), JSON.stringify(shows));
        return shows;
      } catch (error) {
        console.log("error", error);
        return [];
      }
    }
  }
};
