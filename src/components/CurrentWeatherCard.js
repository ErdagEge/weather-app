import "./CurrentWeatherCard.css";

function CurrentWeatherCard({ data, units }) {
  if (!data) return null;

  const {
    name,
    main: { temp, humidity },
    wind: { speed },
    weather,
  } = data;

  const weatherDescription = weather[0].description;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="glass-card current-weather">
      <h2>{name}</h2>
      <img src={weatherIcon} alt={weatherDescription} />
      <p>{weatherDescription}</p>
      <p>Temperature: {temp}°{units === "metric" ? "C" : "F"}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind: {speed} m/s</p>
    </div>
  );
}

export default CurrentWeatherCard;
