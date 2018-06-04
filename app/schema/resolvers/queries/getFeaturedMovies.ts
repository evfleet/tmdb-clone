import { movieAPI, secondsLeftToday } from "../../../utils";

export default async (_parent, _args, { apiKey, redis }) => {
  try {
    const redisKey = "homepage_in_theaters";
    const cachedMovies = await redis.get(redisKey);

    if (cachedMovies) {
      return JSON.parse(cachedMovies);
    }

    const { results } = await movieAPI(`/movie/now_playing`, apiKey);

    const movies = await Promise.all([
      ...results.slice(0, 3).map(movie => {
        return new Promise(async resolve => {
          const { cast } = await movieAPI(`/movie/${movie.id}/credits`, apiKey);
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
};
