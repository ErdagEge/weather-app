import './App.css';
import { useEffect } from "react";
import { fetchCurrentWeather, fetchForecast } from "./api/weather";

function App() {
  useEffect(() => {
    const loadData = async () => {
      try {
        const weather = await fetchCurrentWeather("London");
        console.log("Current weather:", weather);
        const forecast = await fetchForecast("London");
        console.log("Forecast:", forecast);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  return <div>Weather App</div>;
}

export default App;

