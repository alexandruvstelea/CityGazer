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
        />
        <h1 className={styles.title}>City Gazer</h1>
      </div>
    </>
  );
}
