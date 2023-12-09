import React from "react";
import styles from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
      <img src={"/logo.png"} alt="Loading" className={styles.image} />
    </div>
  );
};

export default LoadingSpinner;
