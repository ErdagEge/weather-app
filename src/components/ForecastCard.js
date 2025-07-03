function ForecastCard({ data }) {
  const date = new Date(data.dt_txt).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const tempMin = data.main.temp_min.toFixed(1);
  const tempMax = data.main.temp_max.toFixed(1);
  const description = data.weather[0].description;

  return (
    <div className="glass-card forecast-card">
      <h3>{date}</h3>
      <img src={weatherIcon} alt={description} />
      <p>{description}</p>
      <p>
        {tempMin}°C / {tempMax}°C
      </p>
    </div>
  );
}

export default ForecastCard;
