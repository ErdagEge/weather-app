const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeather(city, units = "metric") {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
  );
  if (!response.ok) throw new Error("Failed to fetch current weather");
  return response.json();
}

export async function fetchForecast(city, units = "metric") {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
  );
  if (!response.ok) throw new Error("Failed to fetch forecast");
  return response.json();
}

