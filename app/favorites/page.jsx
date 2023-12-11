"use client";
import styles from "./page.module.css";
import NavigationBar from "../components/NavigationBar";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/loadingSpinner";
import CityCard from "../components/CityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function FavoritesPage() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    setCityData(favorites);
    setLoading(false);
  }, []);

  return (
    <>
      <NavigationBar />
      <div className={styles.header}>
        <h1>Favorite Cities</h1>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {cityData && cityData.length > 0 ? (
            <div className={styles.cardSection}>
              {cityData.map((city, index) => (
                <CityCard
                  key={index}
                  name={city.name}
                  region={city.region}
                  country={city.country}
                  imageUrl={city.imageUrl}
                  geoId={city.geoId}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noFavorites}>
              <h1>Use the star when gazing to set favorites.</h1>
              <FontAwesomeIcon
                icon={faStar}
                style={{
                  fontSize: "3em",
                  color: "black",
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FavoritesPage;
