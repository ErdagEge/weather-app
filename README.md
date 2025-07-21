# Weather Web App 🌤️

A modern, responsive weather web application built with React, providing current weather conditions and a 5-day forecast for any city worldwide. The app supports geolocation, unit switching (°C/°F), and uses glassmorphism-inspired design for a modern UI.

[**Live Demo**](https://aegaen-weather.vercel.app/) 

---

## ✨ Features

- Search weather by city name
- Detects current location via geolocation
- Displays current temperature, humidity, wind speed, and weather conditions
- 5-day forecast with daily high/low temperatures and condition icons
- Local storage for displaying last searched cities
- Unit toggle between Celsius and Fahrenheit
- Responsive glassmorphism user interface
- Smooth animations powered by React Spring
- FontAwesome weather icons
- Loading spinners and error handling for a better UX

---

## 🛠️ Technologies Used

- React
- OpenWeatherMap API
- FontAwesome
- React Spring
- CSS (glassmorphism style)
- Vercel (deployment)

---

## 📦 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/ErdagEge/weather-app.git
cd weather-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

Create a .env file in the root of the project with the following:

```bash
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

4. **Run the development server:**

```bash
npm start
```
---

## 🚀 Deployment
This app is deployed on Vercel.
If you wish to redeploy, push to your GitHub main branch, and Vercel will build automatically.
Remember to configure your environment variables (REACT_APP_WEATHER_API_KEY) in Vercel settings.

---

## 📄 License
MIT
