import React, { useContext } from "react";
import styles from "./infoCard.module.css";
import Link from "next/link";
import { CityContext } from "./CityContext";

function InfoCard({ title, data, icon }) {
  const { setSelectedCity } = useContext(CityContext);

  return (
    <div className={styles.infoCard}>
      <h1>{title}</h1>
      <h2>{data}</h2>
      {icon}
    </div>
  );
}

export default InfoCard;
