import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import DateTime from "./DateTime";
import WeatherIcon from "./WeatherIcon";
import Forecast from "./Forecast";

/* =========================
   WEATHER COMPONENT
========================= */

export default function Weather({
  city,
  userLocation,
  locationLoading,
  setLocationLoading,
  setError,
  error,
}) {
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [icon, setIcon] = useState(null);
  const [info, setInfo] = useState("");
  const [timezone, setTimezone] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  /* =========================
     GET WEATHER DATA
  ========================= */

  function showFahrenheit(event) {
    event.preventDefault();
    setTemperatureUnit(temperatureUnit === "C" ? "F" : "C");
  }

  useEffect(() => {
    if (!city && !userLocation) {
      return;
    }

    // Start loading while requesting weather data.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const url = userLocation
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lon}&appid=${apiKey}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    function showWeather(response) {
      setTemperature(response.data.main.temp);
      setDescription(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setIcon(response.data.weather[0].icon);
      setInfo(response.data.name);
      setTimezone(response.data.timezone);

      // OpenWeather gives rainfall in mm for the last 1 hour.
      // If there is no rain data, we display 0 mm.
      setPrecipitation(response.data.rain?.["1h"] ?? 0);

      setCoordinates(response.data.coord);
      setLoading(false);
      setLocationLoading(false);
      setError(false);
    }

    function handleError() {
      setLoading(false);
      setLocationLoading(false);
      setError(true);

      setTemperature(null);
      setDescription(null);
      setHumidity(null);
      setWind(null);
      setPrecipitation(null);
      setIcon(null);
      setInfo("");
      setTimezone(null);
      setCoordinates(null);
    }

    axios.get(url).then(showWeather).catch(handleError);
  }, [city, userLocation, setLocationLoading, setError]);

  /* =========================
     ERROR MESSAGE
  ========================= */

  if (error) {
    return (
      <div className="Weather">
        <p className="error">City not found. Please try again 🤓</p>
      </div>
    );
  }

  /* =========================
     LOADING
  ========================= */

  const waitingForWeather =
    locationLoading ||
    loading ||
    ((city || userLocation) && temperature === null);

  if (waitingForWeather) {
    return (
      <div className="loader">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#8f7660"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ margin: "20px" }}
          wrapperClass="custom-loader"
          visible={true}
        />
      </div>
    );
  }

  /* =========================
     NO WEATHER DATA
  ========================= */

  if (!city && !userLocation) {
    return null;
  }

  /* =========================
     WEATHER DISPLAY
  ========================= */

  return (
    <div className="Weather">
      <div className="weather-header">
        <h2>{info}</h2>

        <DateTime timezone={timezone} />

        <p className="weather-description">{description || "--"}</p>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="weather-icon">
            <WeatherIcon description={description} icon={icon} />
          </div>

          <div className="temperature">
            {temperature !== null && (
              <a className="temperature" href="/" onClick={showFahrenheit}>
                {temperatureUnit === "C"
                  ? `${Math.round(temperature)}°C`
                  : `${Math.round((temperature * 9) / 5 + 32)}°F`}
              </a>
            )}
          </div>
        </div>

        <div className="weather-details">
          <div className="weather-detail">
            <span>Humidity</span>
            <strong>{humidity !== null ? `${humidity}%` : "--"}</strong>
          </div>

          <div className="weather-detail">
            <span>Wind</span>
            <strong>{wind !== null ? `${wind.toFixed(1)} m/s` : "--"}</strong>
          </div>

          <div className="weather-detail">
            <span>Precipitation</span>
            <strong>
              {precipitation !== null ? `${precipitation} mm` : "--"}
            </strong>
          </div>
        </div>
      </div>

      <Forecast
        coordinates={coordinates}
        timezone={timezone}
        temperatureUnit={temperatureUnit}
      />
    </div>
  );
}
