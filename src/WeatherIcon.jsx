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

/* =========================
   WEATHER ICON COMPONENT
========================= */

export default function WeatherIcon({ description, icon }) {
  if (!description) {
    return null;
  }

  const condition = description.toLowerCase();
  const isDay = icon?.endsWith("d");

  if (condition.includes("clear")) {
    return isDay ? <WiDaySunny /> : <WiNightClear />;
  }

  if (condition.includes("few clouds")) {
    return isDay ? <WiDayCloudy /> : <WiCloudy />;
  }

  if (condition.includes("thunderstorm")) {
    return <WiThunderstorm />;
  }

  if (condition.includes("snow")) {
    return <WiSnow />;
  }

  if (condition.includes("rain")) {
    if (condition.includes("shower") || condition.includes("light rain")) {
      return <WiDayRain />;
    }

    return <WiRain />;
  }

  if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    return <WiFog />;
  }

  if (
    condition.includes("scattered clouds") ||
    condition.includes("broken clouds") ||
    condition.includes("overcast clouds")
  ) {
    return <WiCloudy />;
  }

  return isDay ? <WiDaySunny /> : <WiNightClear />;
}
