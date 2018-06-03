import * as moment from "moment";

import { movieAPI, secondsLeftToday } from "../../../utils";

export default async (_parent, _args, { apiKey, redis }) => {
  try {
    const redisKey = "homepage_upcoming_tv";
    const cachedShows = await redis.get(redisKey);

    if (cachedShows) {
      return JSON.parse(cachedShows);
    }

    // Get current shows on air
    const { results } = await movieAPI(`/tv/on_the_air`, apiKey);

    // Calculate next air date for first three currently on air shows
    const shows = await Promise.all([
      // Get first three shows
      ...results.slice(0, 3).map(show => {
        return new Promise(async (resolve, reject) => {
          // Get details for each show
          const { seasons, status } = await movieAPI(`/tv/${show.id}`, apiKey);

          // Reject if the show is not currently on the air
          if (status !== "Returning Series") {
            reject(`$[show.name} is not running episodes`);
          }

          const currentSeason = seasons.slice(-1)[0].season_number;
          const { episodes } = await movieAPI(`/tv/${show.id}/season/${currentSeason}`, apiKey);

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
};
