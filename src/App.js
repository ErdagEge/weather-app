import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastContainer from "./components/ForecastContainer";
import { fetchCurrentWeather, fetchForecast } from "./api/weather";
import { useEffect, useState } from "react";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
          );
          const current = await response.json();

          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
          );
          const forecast = await forecastResponse.json();

          setWeatherData(current);
          setForecastData(forecast);
        } catch (err) {
          setError("Unable to fetch weather with geolocation.");
        } finally {
          setLoading(false);
        }
      });
    }
  }, []);


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
      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={() => setError("")}>Dismiss</button>
        </div>
      )}
      {weatherData && <CurrentWeatherCard data={weatherData} />}
      {forecastData && <ForecastContainer data={forecastData} />}
    </div>
  );
}

export default App;
