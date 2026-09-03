import { useEffect, useState } from "react";

export default function DateTime({ timezone }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (timezone === null) {
    return null;
  }

  const cityTime = new Date(now.getTime() + timezone * 1000);

  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(cityTime);

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(cityTime);

  return (
    <div className="DateTime">
      <span>{date}</span>
      <span>{time}</span>
    </div>
  );
}
