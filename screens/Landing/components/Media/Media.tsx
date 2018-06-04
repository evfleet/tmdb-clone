import * as React from "react";

import styles from "./Media.scss";
import MediaImage from "./components/MediaImage";

export interface ICurrentShow {
  id: number;
  name: string;
  next_air_date: string;
  backdrop_path: string;
  poster_path: string;
}

export interface ICurrentMovie {
  id: number;
  title: string;
  backdrop_path: string;
  actors: [string];
}

interface IMediaProps {
  shows: [ICurrentShow];
  movies: [ICurrentMovie];
}

class Media extends React.Component<IMediaProps> {
  public renderMovies() {
    return this.props.movies.map(
      ({ actors, backdrop_path, title }: ICurrentMovie, index) => {
        const key = `movie-${index}`;
        let classes = `${styles.item}`;
        let actorCount = 2;

        if (index === 0) {
          classes = `${classes} ${styles["highlighted-movie"]}`;
          actorCount = 3;
        }

        return (
          <div key={key} className={classes}>
            <MediaImage name={title} path={backdrop_path} />
            <div className={styles["item-text"]}>
              <h3>{title}</h3>
              <span>{actors.slice(0, actorCount).join(", ")}</span>
            </div>
          </div>
        );
      }
    );
  }

  public renderShows() {
    const today = new Date();
    const day = today.getDate();

    return this.props.shows.map(
      ({ backdrop_path, name, next_air_date }: ICurrentShow, index) => {
        const key = `show-${index}`;
        const dayDiff = parseInt(next_air_date.slice(-2), 10) - day;
        let classes = `${styles.item}`;
        let dateText = "";

        if (index === 0) {
          classes = `${classes} ${styles["highlighted-show"]}`;
        }

        switch (dayDiff) {
          case 0:
            dateText = "today";
            break;
          case 1:
            dateText = "tomorrow";
            break;
          default:
            dateText = `in ${dayDiff} days`;
        }

        return (
          <div key={key} className={classes}>
            <MediaImage name={name} path={backdrop_path} />
            <div className={styles["item-text"]}>
              <h3>{name}</h3>
              <span>New episode airs {`${dateText}`}</span>
            </div>
          </div>
        );
      }
    );
  }

  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2>On TV</h2>

          <div className={styles.content}>{this.renderShows()}</div>
        </div>

        <div className={styles.container}>
          <h2>In Theaters</h2>

          <div className={styles.content}>{this.renderMovies()}</div>
        </div>
      </div>
    );
  }
}

export default Media;
