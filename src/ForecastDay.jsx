import WeatherIcon from "./WeatherIcon";

export default function ForecastDay(props) {
  function maxTemperature() {
    const temperature = Math.round(props.data.temp.max);
    return `${temperature}°C`;
  }

  function minTemperature() {
    const temperature = Math.round(props.data.temp.min);
    return `${temperature}°C`;
  }

  function getDayOfWeek() {
    const localDate = new Date((props.data.dt + props.timezone) * 1000);

    const options = {
      weekday: "long",
      timeZone: "UTC",
    };

    return localDate.toLocaleDateString("en-GB", options);
  }

  return (
    <div>
      <div className="WeatherForecast-day">{getDayOfWeek()}</div>

      <div className="weather-icon-forecast">
        <WeatherIcon
          description={props.data.weather[0].description}
          icon={props.data.weather[0].icon}
        />
      </div>

      <div className="WeatherForecast-temperature">
        <span className="WeatherForecast-temperature-max">
          {maxTemperature()}
        </span>

        {" | "}

        <span className="WeatherForecast-temperature-min">
          {minTemperature()}
        </span>
      </div>
    </div>
  );
}
