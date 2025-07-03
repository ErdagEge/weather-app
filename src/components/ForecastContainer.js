import ForecastCard from "./ForecastCard";
import "./Forecast.css";

function ForecastContainer({ data }) {
  if (!data) return null;

  // OpenWeatherMap returns 3-hour intervals
  // We can filter to one forecast per day around 12:00
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {dailyForecasts.map((item) => (
          <ForecastCard key={item.dt} data={item} />
        ))}
      </div>
    </div>
  );
}

export default ForecastContainer;
