"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import NavigationBar from "../components/NavigationBar";
import CityCard from "../components/CityCard";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import cities from "./startCities";

async function formatCityData(data, searchTerm) {
  const formattedCities = data
    .map((city) => {
      const parts = city.matching_full_name.split(",");
      if (parts.length >= 2) {
        const cityName = parts[0].trim();
        const regionName = `${parts[parts.length - 2]},${
          parts[parts.length - 1]
        }`
          .trim()
          .replace(/ *\([^)]*\) */g, "");
        if (
          cityName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(searchTerm.toLowerCase())
        )
          return {
            name: cityName,
            region: regionName,
            fullName: city.matching_full_name,
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
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      city.imageUrl = data["photos"][0]["image"]["web"];
      console.log(city.imageUrl);
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
  const [cityData, setCityData] = useState(cities);

  const fetchCityData = async (searchTerm) => {
    const resultsLimit = 24;
    const apiUrl = `https://api.teleport.org/api/cities/?search=${searchTerm.toLowerCase()}&limit=${resultsLimit}`;
    console.log(apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const formatedData = await formatCityData(
        data["_embedded"]["city:search-results"],
        searchTerm
      );
      const fullData = await addCityImages(formatedData);
      setCityData(fullData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className={styles.searchSection}>
        <SearchBar onSearch={fetchCityData} />
      </div>
      <div className={styles.header}>
        <h1>Explore these Cities</h1>
      </div>
      <div className={styles.cardSection}>
        {cityData.map((city, index) => (
          <CityCard
            key={index}
            city={city.name}
            region={city.region}
            imageUrl={city.imageUrl}
            fullName={city.fullName}
          />
        ))}
      </div>
      <Footer text="Developed By Alexandru Stelea" />
    </>
  );
}

export default HomePage;
