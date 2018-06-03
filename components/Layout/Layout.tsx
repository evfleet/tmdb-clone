import * as React from "react";

import styles from "./Layout.scss";

import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout = ({ children }) => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <Header />
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>
      <Footer />
    </footer>
  </div>
);

export default Layout;
