import * as React from "react";

import styles from "./Media.scss";

interface ICurrentShow {
  id: number;
  name: string;
  next_air_date: string;
  backdrop_path: string;
  poster_path: string;
}

interface ICurrentMovie {
  id: number;
  title: string;
  backdrop_path: string;
  actors: [string];
}

interface IMediaProps {
  shows: [ICurrentShow];
  movies: [ICurrentMovie];
}

const Media: React.SFC<IMediaProps> = ({ shows, movies }) => {
  const imageURL = "https://image.tmdb.org/t/p/";

  // get width passed in to do some calculations
  // image component? shouldcomponentupdate checks if width is bigger/needs a new image?

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>On TV</h2>

        <div className={styles["shows-content"]}>
          {shows.map((show, index) => {
            const key = `show-${index}`;
            const classes =
              index === 0 ? `${styles.show} ${styles["show-highlighted"]}` : styles.show;

            return (
              <div key={key} className={classes}>
                {show.name}
                <img src={`${imageURL}/w780/${show.backdrop_path}`} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.container}>
        <h2>In Theaters</h2>

        <div className={styles["movies-content"]}>
          {movies.map((movie, index) => {
            const key = `movie-${index}`;
            const classes =
              index === 0 ? `${styles.movie} ${styles["movie-highlighted"]}` : styles.movie;

            return (
              <div key={key} className={classes}>
                {movie.title}
                <img src={`${imageURL}/w780/${movie.backdrop_path}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Media;
