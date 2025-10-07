import React, { useEffect, useState } from "react";
import searchIcon from "../assets/search.png";
import clearImg from "../assets/clear.png";
import rainyImg from "../assets/rain.png";
import snowyImg from "../assets/snow.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import pressure from "../assets/drizzle.png";

function Weather() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const allIcons = {
    "01d": clearImg,
    "01n": rainyImg,
    "02d": clearImg,
    "02n": windIcon,
    "03d": pressure,
    "03n": pressure,
    "04d": pressure,
    "04n": pressure,
    "09d": rainyImg,
    "09n": rainyImg,
    "10d": rainyImg,
    "10n": rainyImg,
    "11d": rainyImg,
    "11n": rainyImg,
    "13d": snowyImg,
    "13n": snowyImg,
    "50d": clearImg,
    "50n": clearImg,
  };

  const search = async (city) => {
    if (!city.trim()) return alert("Please enter a city name!");
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clearImg;

      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        location: data.name,
        temperature: Math.floor(data.main.temp),
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-blue-300 px-4 py-10">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center text-gray-800 border border-white/40">

        {/* Search Bar */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-white/80 border border-gray-300 rounded-full px-5 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <div
            onClick={() => search(city)}
            className="w-14 h-14 flex items-center justify-center cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <img src={searchIcon} alt="Search" className="w-7 h-7 object-contain" />
          </div>
        </div>

        {/* Weather Info */}
        {weatherData.temperature && (
          <>
            <div className="flex flex-col items-center mb-8">
              <img
                src={weatherData.icon}
                alt="Weather Icon"
                className="w-28 h-28 mb-3 drop-shadow-lg"
              />
              <p className="text-6xl font-extrabold mb-1 text-blue-700">
                {weatherData.temperature}°C
              </p>
              <p className="text-2xl font-medium text-gray-700">
                {weatherData.location}
              </p>
            </div>

            {/* Weather Stats */}
            <div className="grid grid-cols-2 gap-6">
              {/* Humidity Card */}
              <div className="flex items-center justify-center gap-3 bg-blue-50 rounded-2xl p-4 hover:bg-blue-100 transition-all shadow-md border border-blue-100">
                <div className="bg-blue-200/80 rounded-full p-2 flex items-center justify-center">
                  <img src={humidityIcon} alt="Humidity" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-blue-700">
                    {weatherData.humidity}%
                  </p>
                  <span className="text-sm text-gray-600">Humidity</span>
                </div>
              </div>

              {/* Wind Speed Card */}
              <div className="flex items-center justify-center gap-3 bg-blue-50 rounded-2xl p-4 hover:bg-blue-100 transition-all shadow-md border border-blue-100">
                <div className="bg-indigo-200/80 rounded-full p-2 flex items-center justify-center">
                  <img src={windIcon} alt="Wind" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-indigo-700">
                    {weatherData.wind} km/h
                  </p>
                  <span className="text-sm text-gray-600">Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
