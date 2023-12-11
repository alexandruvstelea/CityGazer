import React, { useContext } from "react";
import styles from "./cityCard.module.css";
import Image from "next/image";
import { CityContext } from "./CityContext";
import { useRouter } from "next/navigation";

function CityCard({ name, region, country, imageUrl, geoId }) {
  const { setSelectedCity } = useContext(CityContext);
  const router = useRouter();
  const handleViewCity = () => {
    setSelectedCity({
      name: name,
      region: region,
      country: country,
      imageUrl: imageUrl,
      geoId: geoId,
    });
    router.push("/view");
  };
  return (
    <div className={styles.cityCard}>
      <div className={styles.cardImage}>
        <Image
          className={styles.cityImage}
          src={imageUrl}
          alt={name}
          fill={true}
          quality={100}
          priority={true}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px"
        />
      </div>
      <div className={styles.cityInfo}>
        <h2>{name}</h2>
        <p>
          {region}, {country}
        </p>
        <button onClick={handleViewCity} className={styles.viewMoreBtn}>
          Gaze city
        </button>
      </div>
    </div>
  );
}

export default CityCard;
