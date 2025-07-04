import "./CurrentWeatherCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHalf, faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "@react-spring/web";

function CurrentWeatherCard({ data, units }) {

  const fade = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(-20px)" },
    config: { tension: 220, friction: 20 }
  });

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
    <animated.div style={fade} className="glass-card current-weather">
      <h2>{name}</h2>
      <img src={weatherIcon} alt={weatherDescription} />
      <p>{weatherDescription}</p>
      <p>
        <FontAwesomeIcon icon={faTemperatureHalf} /> Temperature: {temp}°
        {units === "metric" ? "C" : "F"}
      </p>
      <p>
        <FontAwesomeIcon icon={faDroplet} /> Humidity: {humidity}%
      </p>
      <p>
        <FontAwesomeIcon icon={faWind} /> Wind: {speed} m/s
      </p>
    </animated.div>
  );
}

export default CurrentWeatherCard;
