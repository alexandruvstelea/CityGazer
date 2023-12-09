import React from "react";
import styles from "./cityCard.module.css";
import Image from "next/image";
import Link from "next/link";

function cityCard({ cityName, region, imageUrl, geoId }) {
  return (
    <div className={styles.cityCard}>
      <div className={styles.cardImage}>
        <Image
          className={styles.cityImage}
          src={imageUrl}
          alt={cityName}
          fill={true}
          quality={100}
          priority={true}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
        />
      </div>
      <div className={styles.cityInfo}>
        <h2>{cityName}</h2>
        <p>{region}</p>
        <Link href={`/view?geoId=${geoId}`}>
          <button className={styles.viewMoreBtn}>Gaze city</button>
        </Link>
      </div>
    </div>
  );
}

export default cityCard;
