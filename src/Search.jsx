import { useState } from "react";

export default function Search(props) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (city.trim() !== "") {
      props.setError(false);
      props.setCity(city.trim());
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={city}
          onChange={updateCity}
          placeholder="Enter a city"
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
