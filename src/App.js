import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastContainer from "./components/ForecastContainer";
import { fetchCurrentWeather, fetchForecast } from "./api/weather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    try {
      const current = await fetchCurrentWeather(city);
      const forecast = await fetchForecast(city);
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      setError("City not found or API error.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <div className="spinner"></div>}
      {error && <p>{error}</p>}
      {weatherData && <CurrentWeatherCard data={weatherData} />}
      {forecastData && <ForecastContainer data={forecastData} />}
    </div>
  );
}

export default App;
