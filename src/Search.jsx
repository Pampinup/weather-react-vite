import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Search(props) {
  const [city, setCity] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  /* =========================
     CITY SEARCH
  ========================= */

  function handleSubmit(event) {
    event.preventDefault();

    if (city.trim() !== "") {
      props.setError(false);

      // Manual city search has priority.
      props.setUserLocation(null);

      props.setCity(city.trim());
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  /* =========================
     USER LOCATION
  ========================= */

  function handleLocation() {
    if (!navigator.geolocation) {
      props.setError(true);
      return;
    }

    setLocationLoading(true);
    props.setError(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        props.setCity("");

        props.setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        setLocationLoading(false);
      },
      () => {
        props.setError(true);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }

  /* =========================
     SEARCH FORM
  ========================= */

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={city}
          onChange={updateCity}
          placeholder="Enter a city"
        />

        <input type="submit" value="Search" />

        <button
          type="button"
          onClick={handleLocation}
          disabled={locationLoading}
        >
          {locationLoading ? (
            "Locating..."
          ) : (
            <>
              My <FontAwesomeIcon icon={faLocationDot} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
