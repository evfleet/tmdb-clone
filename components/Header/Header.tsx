import * as React from "react";

import styles from "./Header.scss";

import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";

const Header = () => (
  <header>
    <div className={styles["navigation-content"]}>
      <div>
        <img
          className={styles.logo}
          alt="Logo for The Movie Database (TMDb)"
          src="https://www.themoviedb.org/static_cache/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
        />
      </div>
      <Navigation />
    </div>

    <SearchBar />
  </header>
);

export default Header;
