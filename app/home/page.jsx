"use client";
import styles from "./page.module.css";
import NavigationBar from "../components/NavigationBar";
import CityCard from "../components/CityCard";
import Footer from "../components/Footer.jsx";
import SearchBar from "../components/SearchBar";

export default function LandingPage() {
  return (
    <>
      <NavigationBar />
      <div className={styles.searchSection}>
        <SearchBar />
      </div>
      <div className={styles.cardSection}>
        <CityCard city="Brasov" country="Romania" imageUrl="/brasov.jpg" />
        <CityCard city="Bacau" country="Romania" imageUrl="/bacau.jpg" />
        <CityCard city="Cluj" country="Romania" imageUrl="/cluj.jpeg" />
        <CityCard city="Galati" country="Romania" imageUrl="/galati.jpg" />
        <CityCard city="Iasi" country="Romania" imageUrl="/iasi.jpg" />
        <CityCard city="Oradea" country="Romania" imageUrl="/oradea.jpg" />
        <CityCard
          city="Bucuresti"
          country="Romania"
          imageUrl="/bucuresti.jpeg"
        />
        <CityCard
          city="Timisoara"
          country="Romania"
          imageUrl="/timisoara.jpg"
        />
      </div>
      <Footer text="Developed By Alexandru Stelea" />
    </>
  );
}
