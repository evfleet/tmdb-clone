import * as React from "react";

import styles from "./MediaImage.scss";

interface IMediaImageProps {
  name: string;
  path: string;
}

const MediaImage: React.SFC<IMediaImageProps> = ({ name, path }) => {
  const imageURL = "https://image.tmdb.org/t/p/";

  return (
    <img
      className={styles.image}
      srcSet={`
        ${imageURL}/w300${path} 300w,
        ${imageURL}/w500${path} 500w,
        ${imageURL}/w780${path} 780w
      `}
      sizes={`
        (max-width: 300px) 260px,
        (max-width: 500px) 460px,
        780px
      `}
      src={`${imageURL}/w780${path}`}
      alt={`Backdrop image for ${name}`}
    />
  );
};

export default MediaImage;
