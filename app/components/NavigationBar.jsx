import React from "react";
import styles from "./navigationBar.module.css";

export default function NavigationBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <button className={styles.homeButton}>Home</button>
      </div>
      <div className={styles.navbarTitle}>
        <h1>City Gazer </h1>
      </div>
      <div className={styles.navbarRight}>
        <button className={styles.contactButton}>Contact</button>
      </div>
    </div>
  );
}
