import React, { useState } from "react";
import styles from "./searchBar.module.css";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${styles.searchBar} ${isFocused ? styles.focused : ""}`}>
      <span className={styles.searchIcon}>&#128269;</span> {/* Search icon */}
      <input
        type="text"
        placeholder="Search a city"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
