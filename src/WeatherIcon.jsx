import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltPartlyCloudy,
  WiDayCloudyHigh,
  WiNightCloudyHigh,
  WiCloudy,
  WiNightCloudy,
  WiDayShowers,
  WiNightAltShowers,
  WiDayRain,
  WiNightAltRain,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiDaySnow,
  WiNightAltSnow,
  WiDayFog,
  WiNightFog,
} from "react-icons/wi";

/* =========================
   WEATHER ICON COMPONENT
========================= */

export default function WeatherIcon({ description, icon }) {
  if (!description && !icon) {
    return null;
  }

  /*
    OpenWeather provides an icon code such as:

    01d = clear sky, day
    01n = clear sky, night
    02d = few clouds, day
    03d = scattered clouds, day
    04d = broken/overcast clouds, day
    09d = shower rain
    10d = rain
    11d = thunderstorm
    13d = snow
    50d = mist/fog
  */

  const iconCode = icon?.slice(0, 2);
  const isDay = icon?.endsWith("d");

  /* =========================
     CLEAR SKY
  ========================= */

  if (iconCode === "01") {
    return isDay ? <WiDaySunny /> : <WiNightClear />;
  }

  /* =========================
     FEW CLOUDS
  ========================= */

  if (iconCode === "02") {
    return isDay ? <WiDayCloudy /> : <WiNightAltPartlyCloudy />;
  }

  /* =========================
     SCATTERED CLOUDS
  ========================= */

  if (iconCode === "03") {
    return isDay ? <WiDayCloudyHigh /> : <WiNightCloudyHigh />;
  }

  /* =========================
     BROKEN / OVERCAST CLOUDS
  ========================= */

  if (iconCode === "04") {
    return isDay ? <WiCloudy /> : <WiNightCloudy />;
  }

  /* =========================
     SHOWER RAIN
  ========================= */

  if (iconCode === "09") {
    return isDay ? <WiDayShowers /> : <WiNightAltShowers />;
  }

  /* =========================
     RAIN
  ========================= */

  if (iconCode === "10") {
    return isDay ? <WiDayRain /> : <WiNightAltRain />;
  }

  /* =========================
     THUNDERSTORM
  ========================= */

  if (iconCode === "11") {
    return isDay ? <WiDayThunderstorm /> : <WiNightAltThunderstorm />;
  }

  /* =========================
     SNOW
  ========================= */

  if (iconCode === "13") {
    return isDay ? <WiDaySnow /> : <WiNightAltSnow />;
  }

  /* =========================
     MIST / FOG
  ========================= */

  if (iconCode === "50") {
    return isDay ? <WiDayFog /> : <WiNightFog />;
  }

  /* =========================
     FALLBACK
  ========================= */

  return isDay ? <WiDaySunny /> : <WiNightClear />;
}
