import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastContainer from "./components/ForecastContainer";
import SearchHistory from "./components/SearchHistory";
import { fetchCurrentWeather, fetchForecast } from "./api/weather";
import { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [units, setUnits] = useState("metric"); // "metric" for °C, "imperial" for °F
  const [history, setHistory] = useState([]);

  const HISTORY_KEY = "searchHistory";
  const MAX_HISTORY = 5;

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    if (weatherData) {
      const city = weatherData.name;
      handleSearch(city);
    }
  }, [units]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setLoading(true);
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}`
            );
            const current = await response.json();

            const forecastResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}`
            );
            const forecast = await forecastResponse.json();

            setWeatherData(current);
            setForecastData(forecast);
          } catch (err) {
            setError("Unable to fetch weather with geolocation.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error(err);
          if (err.code === err.PERMISSION_DENIED) {
            setError("Location permission denied. Please search for a city.");
          } else {
            setError("Unable to retrieve your location. Please search for a city.");
          }
        }
      );
    }
  }, []);


  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    try {
      const current = await fetchCurrentWeather(city, units);
      const forecast = await fetchForecast(city, units);
      setWeatherData(current);
      setForecastData(forecast);
      // Update search history
      let newHistory = history.filter(
        (c) => c.toLowerCase() !== city.toLowerCase()
      );
      newHistory.unshift(city);
      if (newHistory.length > MAX_HISTORY) {
        newHistory = newHistory.slice(0, MAX_HISTORY);
      }
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (err) {
      setError("City not found or API error.");
    }
    setLoading(false);
  };

  const handleHistorySelect = (city) => {
    handleSearch(city);
  };

  const handleHistoryRemove = (city) => {
    const newHistory = history.filter((c) => c !== city);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="search-controls">
        <SearchBar onSearch={handleSearch} />
        <button
          onClick={() => setUnits(units === "metric" ? "imperial" : "metric")}
          className="unit-toggle"
        >
          Switch to {units === "metric" ? "°F" : "°C"}
        </button>
      </div>
      <SearchHistory
        history={history}
        onSelect={handleHistorySelect}
        onRemove={handleHistoryRemove}
      />

      {loading && <div className="spinner"></div>}
      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}
      {weatherData && <CurrentWeatherCard data={weatherData} units={units} />}
      {forecastData && <ForecastContainer data={forecastData} units={units} />}
    </div>
  );
}

export default App;
