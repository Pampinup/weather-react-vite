import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

function WeatherIcon({ description, icon }) {
  if (!description) {
    return null;
  }

  const isDay = icon?.endsWith("d");

  if (description.includes("clear")) {
    return isDay ? <WiDaySunny /> : <WiNightClear />;
  }

  if (description.includes("few clouds")) {
    return <WiDayCloudy />;
  }

  if (description.includes("thunderstorm")) {
    return <WiThunderstorm />;
  }

  if (description.includes("snow")) {
    return <WiSnow />;
  }

  if (description.includes("rain")) {
    if (description.includes("shower") || description.includes("light rain")) {
      return <WiDayRain />;
    }

    return <WiRain />;
  }

  if (
    description.includes("mist") ||
    description.includes("fog") ||
    description.includes("haze")
  ) {
    return <WiFog />;
  }

  if (
    description.includes("scattered clouds") ||
    description.includes("broken clouds") ||
    description.includes("overcast clouds")
  ) {
    return <WiCloudy />;
  }

  return isDay ? <WiDaySunny /> : <WiNightClear />;
}

export default function Weather({ city, setError, error }) {
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (!city) {
      return;
    }

    // ESLint: loading is intentionally updated when the API request starts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    function showTemperature(response) {
      setTemperature(response.data.main.temp);
      setDescription(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setIcon(response.data.weather[0].icon);
      setInfo(`Current weather in ${response.data.name}`);

      setLoading(false);
      setError(false);
    }

    function handleError() {
      setLoading(false);
      setError(true);

      setTemperature(null);
      setDescription(null);
      setHumidity(null);
      setWind(null);
      setIcon(null);
      setInfo("");
    }

    axios.get(url).then(showTemperature).catch(handleError);
  }, [city, setError]);

  if (error) {
    return (
      <div className="Weather">
        <p className="error">City not found. Please try again 🤓</p>
      </div>
    );
  }

  return (
    <div className="Weather">
      {loading && (
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
      )}

      {!loading && (
        <>
          <h2>{info}</h2>

          <ul>
            <li>
              Temperature:{" "}
              {temperature !== null ? `${Math.round(temperature)}°C` : "--"}
            </li>

            <li>Description: {description || "--"}</li>

            <li>Humidity: {humidity !== null ? `${humidity}%` : "--"}</li>

            <li>Wind: {wind !== null ? `${wind} m/s` : "--"}</li>

            <li>
              <div className="weather-icon">
                <WeatherIcon description={description} icon={icon} />
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
