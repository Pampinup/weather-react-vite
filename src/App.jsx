import { useState, useEffect } from "react";

import Search from "./Search";
import Weather from "./Weather";
import Footer from "./Footer";

import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const [locationLoading, setLocationLoading] = useState(
    Boolean(navigator.geolocation),
  );

  const [error, setError] = useState(false);

  /* =========================
     GET USER LOCATION
  ========================= */

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setUserLocation({
          lat: latitude,
          lon: longitude,
        });
      },

      () => {
        console.log("Location access was denied.");
        setLocationLoading(false);
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  /* =========================
     APP
  ========================= */

  return (
    <div className="App">
      <h1>Weather App</h1>

      <Search
        setCity={setCity}
        setError={setError}
        setUserLocation={setUserLocation}
      />

      <Weather
        city={city}
        userLocation={userLocation}
        locationLoading={locationLoading}
        setLocationLoading={setLocationLoading}
        setError={setError}
        error={error}
      />

      <Footer />
    </div>
  );
}
