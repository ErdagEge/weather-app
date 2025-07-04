import "./CurrentWeatherCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf, faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";

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
      <p>
        <FontAwesomeIcon icon={faTemperatureHalf} /> Temperature: {temp}°{units === "metric" ? "C" : "F"}
      </p>
      <p>
        <FontAwesomeIcon icon={faDroplet} /> Humidity: {humidity}%
      </p>
      <p>
        <FontAwesomeIcon icon={faWind} /> Wind: {speed} m/s
      </p>
    </div>
  );
}

export default CurrentWeatherCard;
