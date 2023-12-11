import React from "react";
import styles from "./navigationBar.module.css";
import Link from "next/link";
import Image from "next/image";

function NavigationBar({ onHomeClick }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <Link href="/home">
          {onHomeClick ? (
            <button onClick={() => onHomeClick()} className={styles.homeButton}>
              Home
            </button>
          ) : (
            <button className={styles.homeButton}>Home</button>
          )}
        </Link>
      </div>
      <div className={styles.navbarTitle}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className={styles.logoImage}
          />
          <h1>City Gazer </h1>
        </Link>
      </div>
      <div className={styles.navbarRight}>
        <Link href="/favorites">
          <button className={styles.contactButton}>Favorites</button>
        </Link>
      </div>
    </div>
  );
}

export default NavigationBar;
