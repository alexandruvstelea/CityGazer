import AnimatedButton from "./components/AnimatedButton.jsx";
import styles from "./page.module.css";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <div className={styles.landingContainer}>
        <Image
          className={styles.landingImage}
          src="/landing_page_bw.png"
          alt="City skyline."
          fill={true}
          quality={100}
          priority={true}
        />
        <h1 className={styles.title}>City Gazer</h1>
        <AnimatedButton text="Start Gazing" href="/home"/>
      </div>
    </>
  );
}
