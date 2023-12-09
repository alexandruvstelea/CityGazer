import React from "react";
import styles from "./cityCard.module.css";
import Image from "next/image";
import Link from "next/link";

function CityCard({ city, region, imageUrl, fullName }) {
  return (
    <div className={styles.cityCard}>
      <div className={styles.cardImage}>
        <Image
          className={styles.cityImage}
          src={imageUrl}
          alt={city}
          fill={true}
          quality={100}
          priority={true}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
        />
      </div>
      <div className={styles.cityInfo}>
        <h2>{city}</h2>
        <p>{region}</p>
        <Link href={"/view/" + city.toLowerCase()}>
          <button className={styles.viewMoreBtn}>Gaze city</button>
        </Link>
      </div>
    </div>
  );
}

export default CityCard;
