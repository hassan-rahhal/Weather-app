import React, { useState, useEffect } from "react";
import "./weather.css";

const WeatherApp = () => {
  useEffect(() => {
    alert("Make sure your location on the device is turned on and accepting location access permission.");
  }, []);
  const [weatherData, setWeatherData] = useState(null); 
  const [locationName, setLocationName] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  const getWeatherIcon = (code, size = 24) => {
    if (code === 0 || code === 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <circle cx="12" cy="12" r="5" fill="#FDB813" />
          <g stroke="#FDB813" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </g>
        </svg>
      );
    } else if (code === 2 || code === 3) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path d="M6 14c-2.21 0-4-1.79-4-4s1.79-4 4-4c.34 0 .67.04 1 .1C7.74 5.16 9.64 4 12 4c3.31 0 6 2.69 6 6 0 .34-.04.67-.1 1h.1c1.66 0 3 1.34 3 3s-1.34 3-3 3H6z" fill="#90A4AE" />
        </svg>
      );
    } else if (code >= 51 && code <= 67) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path
            d="M16 13c1.66 0 3-1.34 3-3s-1.34-3-3-3c-.34 0-.67.04-1 .1A4.992 4.992 0 0 0 12 4 5 5 0 0 0 7 8c0 .34.04.67.1 1A3.99 3.99 0 0 0 4 13c0 2.21 1.79 4 4 4h8c1.66 0 3-1.34 3-3s-1.34-3-3-3h-1v2h1z"
            fill="#4FC3F7"
          />
          <line x1="8" y1="19" x2="8" y2="21" stroke="#4FC3F7" strokeWidth="2" />
          <line x1="12" y1="19" x2="12" y2="21" stroke="#4FC3F7" strokeWidth="2" />
          <line x1="16" y1="19" x2="16" y2="21" stroke="#4FC3F7" strokeWidth="2" />
        </svg>
      );
    } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path d="M8 16h8M12 8v8" stroke="#B3E5FC" strokeWidth="2" strokeLinecap="round" fill="none" />
          <line x1="6" y1="10" x2="10" y2="10" stroke="#B3E5FC" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="10" x2="18" y2="10" stroke="#B3E5FC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    } else if (code >= 95 && code <= 99) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#FFCC80" />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <path d="M6 14c-2.21 0-4-1.79-4-4s1.79-4 4-4c.34 0 .67.04 1 .1C7.74 5.16 9.64 4 12 4c3.31 0 6 2.69 6 6 0 .34-.04.67-.1 1h.1c1.66 0 3 1.34 3 3s-1.34 3-3 3H6z" fill="#90A4AE" />
      </svg>
    );
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const fetchWeather = async (lat, lon, name) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&timezone=auto`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      const data = await response.json();
      setWeatherData(data);
      setLocationName(name);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=5`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch location suggestions.");
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
        setError(null);
      } else {
        setSearchResults([]);
        setError("No locations found.");
      }
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        fetchSuggestions(query);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchSuggestions(query);
    }
  };

  const selectLocation = (loc) => {
    setSearchResults([]);
    setQuery("");
    const name = `${loc.name}${loc.admin1 ? ", " + loc.admin1 : ""}${
      loc.country ? ", " + loc.country : ""
    }`;
    fetchWeather(loc.latitude, loc.longitude, name);
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude, "Your Location");
        },
        () => {
          setError("Unable to retrieve current location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  return (
    <div className="app-container">
      <div className="clouds">
        <div className="cloud" style={{ top: "10%", left: "5%" }}></div>
        <div className="cloud" style={{ top: "20%", left: "60%" }}></div>
        <div className="cloud" style={{ top: "30%", left: "20%" }}></div>
        <div className="cloud" style={{ top: "40%", left: "75%" }}></div>
      </div>
      <div className="weather-app fade-in">
        <header className="app-header slide-up">
          <h1>Weather</h1>
          <button className="current-location-btn" onClick={getCurrentLocationWeather}>
            Current Location
          </button>
        </header>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for a location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
          {searchResults.length > 0 && (
            <ul className="search-results fade-in">
              {searchResults.map((loc) => (
                <li
                  key={loc.id || loc.latitude + loc.longitude}
                  onClick={() => selectLocation(loc)}
                >
                  {loc.name}
                  {loc.admin1 ? `, ${loc.admin1}` : ""}
                  {loc.country ? `, ${loc.country}` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {weatherData && !loading && (
          <div className="weather-info fade-in">
            {/* Current Weather */}
            <h2 className="location-name">{locationName}</h2>
            <div className="current-weather">
              <div className="current-temp">
                <p className="temp">{weatherData.current_weather.temperature}°C</p>
                <div className="current-icon">
                  {getWeatherIcon(weatherData.current_weather.weathercode, 40)}
                </div>
              </div>
              <p className="weather-description">
                {weatherDescriptions[weatherData.current_weather.weathercode] || "Unknown"}
              </p>
              <div className="sun-times">
                <div className="sunrise">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  >
                    <path d="M12 5V2" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M5.64 7.64l-2.12-2.12" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M19.48 7.64l2.12-2.12" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M4 13H2" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M22 13h-2" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M7.64 18.36l-2.12 2.12" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <path d="M19.48 18.36l2.12 2.12" stroke="#FFA726" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="17" r="5" stroke="#FFA726" strokeWidth="2" fill="none" />
                  </svg>
                  <span>Sunrise: {formatTime(weatherData.daily.sunrise[0])}</span>
                </div>
                <div className="sunset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  >
                    <path d="M12 19v3" stroke="#FF7043" strokeWidth="2" fill="none" />
                    <path d="M5.64 16.36l-2.12 2.12" stroke="#FF7043" strokeWidth="2" fill="none" />
                    <path d="M19.48 16.36l2.12 2.12" stroke="#FF7043" strokeWidth="2" fill="none" />
                    <path d="M4 11H2" stroke="#FF7043" strokeWidth="2" fill="none" />
                    <path d="M22 11h-2" stroke="#FF7043" strokeWidth="2" fill="none" />
                    <path d="M7.64 5.64l-2.12-2.12" stroke="#FF7043" strokeWidth="2" fill="none" />
                    <path d="M19.48 5.64l2.12-2.12" stroke="#FF7043" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="7" r="5" stroke="#FF7043" strokeWidth="2" fill="none" />
                  </svg>
                  <span>Sunset: {formatTime(weatherData.daily.sunset[0])}</span>
                </div>
              </div>
            </div>

            <div className="forecast-container">
              {weatherData.daily.time.map((date, index) => {
                if (index === 0) return null;
                return (
                  <div className="forecast-item slide-up" key={date}>
                    <p className="forecast-date">{formatDate(date)}</p>
                    <div className="forecast-icon">
                      {getWeatherIcon(weatherData.daily.weathercode[index], 28)}
                    </div>
                    <p className="forecast-temp">
                      {Math.round(weatherData.daily.temperature_2m_min[index])}° /{" "}
                      {Math.round(weatherData.daily.temperature_2m_max[index])}°
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
