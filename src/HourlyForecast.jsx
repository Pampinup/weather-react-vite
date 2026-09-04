import { useEffect, useState } from "react";
import axios from "axios";

import WeatherIcon from "./WeatherIcon";

import "./HourlyForecast.css";

export default function HourlyForecast({
  coordinates,
  timezone,
  temperatureUnit,
}) {
  const [forecast, setForecast] = useState(null);

  /* =========================
     GET HOURLY FORECAST
  ========================= */

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    // One Call API 4.0 hourly timeline.
    // One response provides up to 20 hourly records.
    const url = `https://api.openweathermap.org/data/4.0/onecall/timeline/1h?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        // We display the first 20 hourly forecast records.
        setForecast(response.data.data.slice(0, 20));
      })
      .catch(() => {
        setForecast(null);
      });
  }, [coordinates]);

  /* =========================
     LOCAL TIME
  ========================= */

  function getLocalTime(timestamp) {
    if (timezone === null) {
      return "";
    }

    const date = new Date(timestamp * 1000 + timezone * 1000);

    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }).format(date);
  }

  /* =========================
     TEMPERATURE
  ========================= */

  function getTemperature(temperature) {
    if (temperatureUnit === "F") {
      return `${Math.round((temperature * 9) / 5 + 32)}°`;
    }

    return `${Math.round(temperature)}°`;
  }

  /* =========================
     RENDER
  ========================= */

  if (!coordinates || !forecast) {
    return null;
  }

  return (
    <div className="HourlyForecast">
      <h3>Hourly Forecast</h3>

      <div className="HourlyForecast-scroll">
        {forecast.map((forecastItem) => (
          <div className="HourlyForecast-item" key={forecastItem.dt}>
            <div className="HourlyForecast-time">
              {getLocalTime(forecastItem.dt)}
            </div>

            <div className="HourlyForecast-icon">
              <WeatherIcon
                description={forecastItem.weather[0].description}
                icon={forecastItem.weather[0].icon}
              />
            </div>

            <div className="HourlyForecast-temperature">
              {getTemperature(forecastItem.temp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
