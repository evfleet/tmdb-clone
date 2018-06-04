import * as React from "react";

import styles from "./Footer.scss";

const Footer = () => (
  <div className={styles.container}>
    <span className={styles.attribution}>
      This product uses the TMDb API but is not endorsed or certified by TMDb.
    </span>
  </div>
);

export default Footer;
