"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import NavigationBar from "../components/NavigationBar";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";
import defaultCities from "./defaultCities";
import LoadingSpinner from "../components/loadingSpinner";

function extractGeoId(url) {
  const match = url.match(/geonameid:(\d+)/);
  if (match && match.length > 1) return match[1];
}

async function formatCityData(data, searchTerm) {
  const formattedCities = data
    .map((city) => {
      const parts = city.matching_full_name.split(",");
      if (parts.length >= 2) {
        const cityName = parts[0].trim();
        const region = `${parts[parts.length - 2]}`;
        const country = `${parts[parts.length - 1]}`
          .trim()
          .replace(/ *\([^)]*\) */g, "");
        const geoUrl = city["_links"]["city:item"]["href"];
        const geoId = extractGeoId(geoUrl);
        if (
          cityName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(searchTerm.toLowerCase())
        )
          return {
            name: cityName,
            region: region,
            country: country,
            fullName: city.matching_full_name,
            geoId: geoId,
          };
      }
      return null;
    })
    .filter(Boolean);
  return formattedCities;
}

async function addCityImages(data) {
  const promises = data.map(async (city) => {
    try {
      const response = await fetch(
        `https://api.teleport.org/api/urban_areas/slug:${city.name
          .toLowerCase()
          .replace(/\s+/g, "-")}/images/`
      );
      if (!response.ok) {
        throw new Error("An error has occured while fetching data.");
      }
      const data = await response.json();
      city.imageUrl = data["photos"][0]["image"]["web"];
      return city;
    } catch (error) {
      let randomNumber = Math.floor(Math.random() * 4 + 1);
      city.imageUrl = `/stock_${randomNumber}.png`;
      return city;
    }
  });
  const fullData = await Promise.all(promises);
  return fullData;
}

function HomePage() {
  const [cityData, setCityData] = useState(defaultCities);
  const [loading, setLoading] = useState(false);

  const fetchCityData = async (searchTerm) => {
    setLoading(true);
    const resultsLimit = 24;
    const apiUrl = `https://api.teleport.org/api/cities/?search=${searchTerm.toLowerCase()}&limit=${resultsLimit}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("An error has occured while fetching data.");
      }
      const data = await response.json();
      const formatedData = await formatCityData(
        data["_embedded"]["city:search-results"],
        searchTerm
      );
      const fullData = await addCityImages(formatedData);
      setLoading(false);
      setCityData(fullData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setLoading(false);
    }
  };

  const displayDefaultCities = () => {
    setCityData(defaultCities);
  };

  return (
    <>
      <NavigationBar onHomeClick={displayDefaultCities} />
      <div className={styles.searchSection}>
        <SearchBar onSearch={fetchCityData} />
      </div>
      <div className={styles.header}>
        <h1>Explore these Cities</h1>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
}

export default HomePage;
