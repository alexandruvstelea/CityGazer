import React, { useState, useRef, useEffect } from "react";
import styles from "./searchBar.module.css";
import { useRouter, useSearchParams } from "next/navigation";

function SearchBar({ onSearch }) {
  const [isFocused, setIsFocused] = useState(false);
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(`/home?search=${encodeURIComponent(searchTerm)}`);
      inputRef.current && inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (searchParams.get("search")) {
      // !console.log("useEffect triggered", searchParams.get("search"));
      setSearchTerm(searchParams.get("search"));
      onSearch(searchParams.get("search"));
    } else {
      setSearchTerm("");
    }
  }, [searchParams.get("search")]);

  return (
    <div className={`${styles.searchBar} ${isFocused ? styles.focused : ""}`}>
      <span className={styles.searchIcon}>&#128269;</span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search a city"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
