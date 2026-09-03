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
    const timezone = props.timezone;

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        const forecastList = response.data.list;

        const dailyForecast = {};

        forecastList.forEach((item) => {
          /*
            Convert the forecast time to the city's
            local time using OpenWeather's timezone.
          */
          const localDate = new Date((item.dt + timezone) * 1000);

          const day = localDate.toISOString().split("T")[0];

          if (!dailyForecast[day]) {
            dailyForecast[day] = {
              dt: item.dt,
              temperatures: [],
              weather: [],
            };
          }

          dailyForecast[day].temperatures.push(item.main.temp);
          dailyForecast[day].weather.push(item);
        });

        const forecastDays = Object.values(dailyForecast)
          .map((day) => {
            const temperatures = day.temperatures;

            /*
              Find the forecast closest to midday
              in the city's local time.
            */
            const middayForecast = day.weather.reduce((closest, item) => {
              const itemLocalDate = new Date((item.dt + timezone) * 1000);

              const closestLocalDate = new Date((closest.dt + timezone) * 1000);

              const itemHour = itemLocalDate.getUTCHours(); /* mid day weather pronostic */ 
              const closestHour = closestLocalDate.getUTCHours();

              return Math.abs(itemHour - 12) < Math.abs(closestHour - 12)
                ? item
                : closest;
            });

            return {
              dt: day.dt,

              temp: {
                max: Math.max(...temperatures),
                min: Math.min(...temperatures),
              },

              weather: [middayForecast.weather[0]],
            };
          })

          /*
            Remove today and show the next five days.
          */
          .slice(1, 6);

        setForecast(forecastDays);
      })
      .catch(() => {
        setForecast(null);
      });
  }, [props.coordinates, props.timezone]);

  if (!props.coordinates || !forecast) {
    return null;
  }

  return (
    <div className="Forecast">
      <div className="row">
        {forecast.map(function (dailyForecast, index) {
          return (
            <div className="col" key={index}>
              <ForecastDay data={dailyForecast} timezone={props.timezone} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
