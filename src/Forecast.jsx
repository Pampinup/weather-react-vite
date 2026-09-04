import { useState, useEffect } from "react";

import axios from "axios";

import "./Forecast.css";

import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
  const [forecast, setForecast] = useState(null);

  /* =========================
     GET FORECAST DATA
  ========================= */

  useEffect(() => {
    if (!props.coordinates || props.timezone === null) {
      return;
    }

    const lat = props.coordinates.lat;
    const lon = props.coordinates.lon;
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const apiUrl = `https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        /*
          Get today's date in the LOCAL timezone
          of the selected city.

          We use YYYY-MM-DD so that dates can be
          compared correctly.
        */

        const now = new Date();

        const localToday = new Date(now.getTime() + props.timezone * 1000);

        const todayParts = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "UTC",
        }).formatToParts(localToday);

        const todayYear = todayParts.find((part) => part.type === "year").value;

        const todayMonth = todayParts.find(
          (part) => part.type === "month",
        ).value;

        const todayDay = todayParts.find((part) => part.type === "day").value;

        const todayString = `${todayYear}-${todayMonth}-${todayDay}`;

        /*
          Convert each API timestamp to the LOCAL
          calendar date of the selected city.
        */

        function getLocalDateString(timestamp) {
          const localDate = new Date((timestamp + props.timezone) * 1000);

          const parts = new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "UTC",
          }).formatToParts(localDate);

          const year = parts.find((part) => part.type === "year").value;

          const month = parts.find((part) => part.type === "month").value;

          const day = parts.find((part) => part.type === "day").value;

          return `${year}-${month}-${day}`;
        }

        /*
          Keep ONLY dates after today.

          This prevents yesterday's date from appearing
          because of the difference between UTC and the
          city's local timezone.
        */

        const futureDays = response.data.data.filter((day) => {
          const localDateString = getLocalDateString(day.dt);

          return localDateString > todayString;
        });

        /*
          We only need the next 5 complete days.
        */

        const forecastDays = futureDays.slice(0, 5);

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

  /* =========================
     RENDER
  ========================= */

  if (!props.coordinates || !forecast) {
    return null;
  }

  return (
    <div className="WeeklyForecast">
      <h3>5-Day Forecast</h3>

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
