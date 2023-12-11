import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const linkedinUrl = "https://www.linkedin.com/in/alexandrustelea/";

  return (
    <div className={styles.footer}>
      Developed by{" "}
      <a href={linkedinUrl} target="_blank">
        Alexandru Stelea
      </a>
    </div>
  );
}
