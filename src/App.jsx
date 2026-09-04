import { useState } from "react";

import Search from "./Search";

import Weather from "./Weather";

import Footer from "./Footer";

import "./App.css";

/* =========================
   GUESS INITIAL CITY
========================= */

function getInitialCity() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const timezoneCities = {
    "Europe/Dublin": "Cork",
    "Europe/London": "London",
    "Europe/Madrid": "Madrid",
    "Europe/Paris": "Paris",
    "Europe/Rome": "Rome",
    "Europe/Berlin": "Berlin",
    "Europe/Lisbon": "Lisbon",
    "Europe/Amsterdam": "Amsterdam",
    "Europe/Brussels": "Brussels",
    "Europe/Vienna": "Vienna",
    "Europe/Prague": "Prague",
    "Europe/Athens": "Athens",
    "America/New_York": "New York",
    "America/Los_Angeles": "Los Angeles",
    "America/Chicago": "Chicago",
    "Asia/Tokyo": "Tokyo",
    "Australia/Sydney": "Sydney",
  };

  return timezoneCities[timezone] || "Cork";
}

/* =========================
   APP
========================= */

export default function App() {
  const [city, setCity] = useState(getInitialCity);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(false);

  return (
    <div className="App">
      <h1 className="app-title">Weather App</h1>

      <Search
        setCity={setCity}
        setError={setError}
        setUserLocation={setUserLocation}
      />

      <Weather
        city={city}
        userLocation={userLocation}
        setError={setError}
        error={error}
      />

      <Footer />
    </div>
  );
}
