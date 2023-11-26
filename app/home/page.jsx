"use client";
import styles from "./page.module.css";
import NavigationBar from "../components/NavigationBar";
import CityCard from "../components/CityCard";
import Footer from "../components/Footer.jsx";
import SearchBar from "../components/SearchBar";

const cities = [
  { city: "Brasov", country: "Romania", imageUrl: "/brasov.jpg" },
  { city: "Bacau", country: "Romania", imageUrl: "/bacau.jpg" },
  { city: "Bucuresti", country: "Romania", imageUrl: "/bucuresti.jpeg" },
  { city: "Cluj", country: "Romania", imageUrl: "/cluj.jpeg" },
  { city: "Galati", country: "Romania", imageUrl: "/galati.jpg" },
  { city: "Iasi", country: "Romania", imageUrl: "/iasi.jpg" },
  { city: "Oradea", country: "Romania", imageUrl: "/oradea.jpg" },
  { city: "Timisoara", country: "Romania", imageUrl: "/timisoara.jpg" },
  { city: "Alba Iulia", country: "Romania", imageUrl: "/alba.jpg" },
  { city: "Hunedoara", country: "Romania", imageUrl: "/hunedoara.jpg" },
  { city: "Sibiu", country: "Romania", imageUrl: "/sibiu.jpeg" },
  { city: "Suceava", country: "Romania", imageUrl: "/suceava.jpeg" },
];

function HomePage() {
  return (
    <>
      <NavigationBar />
      <div className={styles.searchSection}>
        <SearchBar />
      </div>
      <div className={styles.header}>
        <h1>Explore this cities</h1>
      </div>
      <div className={styles.cardSection}>
        {cities.map((cityData, index) => (
          <CityCard
            key={index}
            city={cityData.city}
            country={cityData.country}
            imageUrl={cityData.imageUrl}
          />
        ))}
      </div>
      <Footer text="Developed By Alexandru Stelea" />
    </>
  );
}

export default HomePage;
