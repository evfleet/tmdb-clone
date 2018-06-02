import * as fetch from "isomorphic-unfetch";
import * as moment from "moment";

export default {
  Query: {
    test: () => "Hello World",

    getCurrentMovies: async (_parent, _args, {}) => {
      try {
        /*
        const cachedMovies = await client.get("current-movies");

        if (cachedMovies) {
          return cachedMovies;
        }

        const movies = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${}`);

        let movies = await client.get("current-movies");

        if (movies) {
          return 321;
        }

        movies = await fetch()
        */

        return 321;
      } catch (error) {
        return 123;
      }
    },

    getCurrentShows: async (_parent, _args, { movieAPIKey, redis }) => {
      try {
        const redisKey = "homepage_upcoming_tv";
        const cachedShows = await redis.get(redisKey);

        if (cachedShows) {
          return JSON.parse(cachedShows);
        }

        // Get current shows on air
        const { results: showsOnAir } = await fetch(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${movieAPIKey}`
        ).then(res => res.json());

        // Calculate next air date for first three currently on air shows
        const shows = await Promise.all([
          // Get first three shows
          ...showsOnAir.slice(0, 3).map(show => {
            return new Promise(async (resolve, reject) => {
              // Get details for each show
              const { seasons, status } = await fetch(
                `https://api.themoviedb.org/3/tv/${show.id}?api_key=${movieAPIKey}`
              ).then(res => res.json());

              // Reject if the show is not currently on the air
              if (status !== "Returning Series") {
                reject(`$[show.name} is not running episodes`);
              }

              const currentSeason = seasons.slice(-1)[0].season_number;

              const { episodes } = await fetch(
                `https://api.themoviedb.org/3/tv/${
                  show.id
                }/season/${currentSeason}?api_key=${movieAPIKey}`
              ).then(res => res.json());

              const { air_date } = episodes.find(episode => {
                const airDate = moment(episode.air_date);
                const dayDiff = airDate.diff(new Date(), "days");

                if (dayDiff >= 0 && dayDiff <= 7) {
                  return true;
                }
              });

              resolve({
                backdrop_path: show.backdrop_path,
                id: show.id,
                next_air_date: air_date,
                poster_path: show.poster_path,
                title: show.name
              });
            });
          })
        ]);

        // Get seconds until end of the day
        const now = moment();
        const tomorrow = moment()
          .add(1, "day")
          .startOf("day");
        const difference = moment.duration(tomorrow.diff(now));

        await redis.setex(redisKey, Math.round(difference.asSeconds()), JSON.stringify(shows));
        return shows;
      } catch (error) {
        console.log("error", error);
        return [];
      }
    }
  }
};
