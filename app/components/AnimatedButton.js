import React from "react";
import styles from "./animatedButton.module.css";

export default function AnimatedButton({ text }) {
  return (
    <>
      <a className={styles.buttonLanding} href="/wip">
        <span className={styles.topKey}></span>
        <span className={styles.text}>{text}</span>
        <span className={styles.bottomKey1}></span>
        <span className={styles.bottomKey2}></span>
      </a>
    </>
  );
}
