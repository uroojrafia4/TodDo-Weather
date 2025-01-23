import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";


export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "a612d5f69393456e3e242518ed4f9e0a";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeatherByCity = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setError("");
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
    } catch {
      setWeather(null);
      setError("City not found or an error occurred.");
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setError("");
        try {
          const response = await axios.get(API_URL, {
            params: {
              lat: latitude,
              lon: longitude,
              appid: API_KEY,
              units: "metric",
            },
          });
          setWeather(response.data);
        } catch {
          setWeather(null);
          setError("Unable to fetch weather for your location.");
        }
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Weather App</h1>
      <div style={styles.inputContainer}>
        <TextField
          sx={{
            width: "320px",
            "&:focus": { borderColor: "#CD6666" },
          }}
          id="outlined-basic"
          label="Enter city name"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          sx={{
            padding: "14px",
            marginLeft: "20px",
            "&:hover": {
              backgroundColor: "#CD6666", // Hover background color
            },
          }}
          onClick={fetchWeatherByCity}
          variant="contained"
          size="large"
        >
          Get Weather
        </Button>
        <Button
          sx={{
            padding: "14px",
            marginLeft: "10px",
            backgroundColor: "#FFA500",
            "&:hover": {
              backgroundColor: "#FF8C00", // Hover background color
            },
          }}
          onClick={fetchWeatherByLocation}
          variant="contained"
          size="large"
        >
          Locate Me 
        </Button>
      </div>
      {error && (
        <Alert sx={{ backgroundColor: "#EDAE9B" }} severity="error">
          {error}
        </Alert>
      )}
      {weather && (
        <div style={styles.weatherInfo}>
          <h2>{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={styles.icon}
          />
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>
            Sunrise:{" "}
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    margin: "50px auto",
    
  },
  title: {
    fontSize: "2rem",
    color: "#333",
  },
  inputContainer: {
    marginBottom: "20px",
    borderRadius: '10px',
    borderWidth : '3px',
    
   
  },
  weatherInfo: {
    width: "430px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "inline-block",
    marginTop: "20px",
  },
  icon: {
    width: "100px",
    height: "100px",
  },
};
