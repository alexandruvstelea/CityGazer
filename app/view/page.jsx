"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import NavigationBar from "../components/NavigationBar";

function ViewPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  console.log(searchParams.get("geoId"));
  return (
    <>
      <NavigationBar />
    </>
  );
}

export default ViewPage;
