import * as fetch from "isomorphic-unfetch";
import * as moment from "moment";

export const movieAPI = (path, apiKey) => {
  return fetch(`https://api.themoviedb.org/3${path}?api_key=${apiKey}`).then(res => res.json());
};

export const secondsLeftToday = () => {
  const now = moment();
  const tomorrow = moment()
    .add(1, "day")
    .startOf("day");
  const difference = moment.duration(tomorrow.diff(now));

  return Math.round(difference.asSeconds());
};
