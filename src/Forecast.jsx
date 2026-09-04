import { useState, useEffect } from "react";

import axios from "axios";

import "./Forecast.css";

import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!props.coordinates || props.timezone === null) {
      return;
    }

    const lat = props.coordinates.lat;

    const lon = props.coordinates.lon;

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    /*
      One Call API 4.0 provides the daily forecast
      directly, so we no longer need to group
      the old 3-hour forecast ourselves.
    */

    const apiUrl = `https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)

      .then((response) => {
        /*
          One Call 4.0 returns daily data inside
          response.data.data.

          We only need the next 5 days.
        */

        const forecastDays = response.data.data.slice(0, 5);

        /*
          Keep the same data structure that
          ForecastDay.jsx already expects.
        */

        const formattedForecast = forecastDays.map((day) => {
          return {
            dt: day.dt,

            temp: {
              max: day.temp.max,
              min: day.temp.min,
            },

            weather: [
              {
                description: day.weather[0].description,
                icon: day.weather[0].icon,
              },
            ],
          };
        });

        setForecast(formattedForecast);
      })

      .catch(() => {
        setForecast(null);
      });
  }, [props.coordinates, props.timezone]);

  if (!props.coordinates || !forecast) {
    return null;
  }

  return (
    <div className="WeeklyForecast">
      <h3>Weekly Forecast</h3>

      <div className="Forecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            return (
              <div className="col" key={index}>
                <ForecastDay
                  data={dailyForecast}
                  timezone={props.timezone}
                  temperatureUnit={props.temperatureUnit}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
