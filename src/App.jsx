import { useState } from "react";
import Search from "./Search";
import Weather from "./Weather";
import Footer from "./Footer";

import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Search setCity={setCity} setError={setError} />
      <Weather city={city} setError={setError} error={error} />
      <Footer />
    </div>
  );
}
