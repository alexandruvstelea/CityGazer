"use client";
import React, { useState, useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import NavigationBar from "../components/NavigationBar";
import { CityContext } from "../components/CityContext";
import Image from "next/image";
import InfoCard from "../components/infoCard";
import LoadingSpinner from "../components/loadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  faFlag,
  faPerson,
  faClock,
  faTemperatureThreeQuarters,
  faCloudRain,
  faSnowflake,
  faWind,
  faLocationCrosshairs,
  faSun,
  faMoon,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ViewPage() {
  const { selectedCity } = useContext(CityContext);
  const searchParams = useSearchParams();
  const [extraInfo, setExtraInfo] = useState();
  const [weatherInfo, setWeatherInfo] = useState();
  const [chartData, setChartData] = useState();
  const [chartOptions, setChartOptions] = useState();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState();
  const router = useRouter();

  const fetchExtraInfo = async () => {
    setLoading(true);
    const url = `https://api.teleport.org/api/cities/geonameid:${selectedCity.geoId}/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("An error has occured while fetching data.");
      }
      const data = await response.json();
      const timezone = data._links["city:timezone"].name;
      const latlon = data.location.latlon;
      const population = data.population;
      const extraInfo = {
        timezone: timezone,
        latlon: latlon,
        population: population,
      };
      setExtraInfo(extraInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeatherInfo = async () => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${extraInfo.latlon["latitude"]}&longitude=${extraInfo.latlon["longitude"]}&current=temperature_2m,is_day,rain,snowfall,wind_speed_10m&hourly=temperature_2m&timezone=auto`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("An error has occured while fetching data.");
      }
      const data = await response.json();
      const currentTemperature = data["current"]["temperature_2m"];
      const currentRain = data["current"]["rain"];
      const currentSnow = data["current"]["snowfall"];
      const currentWind = data["current"]["wind_speed_10m"];
      const isDay = data["current"]["is_day"];
      const forecastData = data["hourly"];
      const weatherInfo = {
        currentTemperature: currentTemperature,
        currentRain: currentRain,
        currentSnow: currentSnow,
        currentWind: currentWind,
        isDay: isDay,
        forecastData: forecastData,
      };
      setWeatherInfo(weatherInfo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formatGraphData = (data) => {
    const formattedLabels = data.time.map((time) => {
      const date = new Date(time);
      return format(date, "dd-MMM");
    });
    const chartData = {
      labels: formattedLabels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: data.temperature_2m,
          fill: false,
          borderColor: "#0074b7",
          tension: 0.1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    };

    setChartData(chartData);
    setChartOptions(chartOptions);
  };

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    const isFav = favorites.some((city) => city.geoId === selectedCity.geoId);

    if (isFav) {
      const newFavorites = favorites.filter(
        (city) => city.geoId !== selectedCity.geoId
      );
      sessionStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      sessionStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, selectedCity])
      );
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
      if (favorites.some((city) => city.geoId === selectedCity.geoId)) {
        setIsFavorite(true);
      }
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchExtraInfo();
  }, []);

  useEffect(() => {
    fetchExtraInfo();
  }, []);

  useEffect(() => {
    if (extraInfo) {
      fetchWeatherInfo();
    }
  }, [extraInfo]);

  useEffect(() => {
    if (weatherInfo) {
      formatGraphData(weatherInfo.forecastData);
    }
  }, [weatherInfo]);

  useEffect(() => {
    if (!selectedCity) {
      router.push("/home");
    }
  }, [selectedCity, router]);

  return (
    <>
      <NavigationBar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className={styles.header}>
            {isFavorite ? (
              <button
                onClick={handleFavoriteClick}
                className={styles.favoriteButton}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    fontSize: "3em",
                    color: "#0074b7",
                  }}
                />
              </button>
            ) : (
              <button
                className={styles.favoriteButton}
                onClick={handleFavoriteClick}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    fontSize: "3em",
                    color: "black",
                  }}
                />
              </button>
            )}

            <h1>{selectedCity.name}</h1>
          </div>
          {selectedCity && (
            <div>
              <div className={styles.weatherSection}>
                <div className={styles.cardSectionWeather}>
                  <InfoCard
                    title={"Temperature"}
                    data={`${weatherInfo.currentTemperature} °C`}
                    icon={
                      <FontAwesomeIcon
                        icon={faTemperatureThreeQuarters}
                        style={{ fontSize: "4em" }}
                      />
                    }
                  />
                  <InfoCard
                    title={"Rain"}
                    data={`${weatherInfo.currentRain} mm`}
                    icon={
                      <FontAwesomeIcon
                        icon={faCloudRain}
                        style={{ fontSize: "4em" }}
                      />
                    }
                  />
                  <InfoCard
                    title={"Snow"}
                    data={`${weatherInfo.currentSnow} cm`}
                    icon={
                      <FontAwesomeIcon
                        icon={faSnowflake}
                        style={{ fontSize: "4em" }}
                      />
                    }
                  />
                  <InfoCard
                    title={"Wind"}
                    data={`${weatherInfo.currentWind} km/h`}
                    icon={
                      <FontAwesomeIcon
                        icon={faWind}
                        style={{ fontSize: "4em" }}
                      />
                    }
                  />
                </div>
                {chartData && chartOptions ? (
                  <div className={styles.chartSection}>
                    {chartData.datasets && chartData.datasets.length > 0 ? (
                      <Line data={chartData} options={chartOptions} />
                    ) : (
                      <p>No chart data available</p>
                    )}
                  </div>
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            </div>
          )}
          <div className={styles.cardSectionInfo}>
            <InfoCard
              title={"Country"}
              data={selectedCity.country}
              icon={
                <FontAwesomeIcon icon={faFlag} style={{ fontSize: "4em" }} />
              }
            />
            <InfoCard
              title={"Population"}
              data={extraInfo.population}
              icon={
                <FontAwesomeIcon icon={faPerson} style={{ fontSize: "4em" }} />
              }
            />
            <InfoCard
              title={"Timezone"}
              data={extraInfo.timezone}
              icon={
                <FontAwesomeIcon icon={faClock} style={{ fontSize: "4em" }} />
              }
            />
            <InfoCard
              title={"Coordinates"}
              data={`${extraInfo.latlon["latitude"]}, 
                    ${extraInfo.latlon["longitude"]}`}
              icon={
                <FontAwesomeIcon
                  icon={faLocationCrosshairs}
                  style={{ fontSize: "4em" }}
                />
              }
            />
            {weatherInfo.isDay ? (
              <InfoCard
                title={"Time of Day"}
                data={"Day"}
                icon={
                  <FontAwesomeIcon icon={faSun} style={{ fontSize: "4em" }} />
                }
              />
            ) : (
              <InfoCard
                title={"Time of Day"}
                data={"Night"}
                icon={
                  <FontAwesomeIcon icon={faMoon} style={{ fontSize: "4em" }} />
                }
              />
            )}
          </div>
          <div className={styles.bannerImage}>
            <Image
              className={styles.cityImage}
              src={selectedCity.imageUrl}
              alt={name}
              quality={100}
              priority={true}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPage;
