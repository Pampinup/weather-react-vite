import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

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
            color="#e057a2"
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
              {icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description}
                />
              )}
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
