const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const city = req.body.city;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weather = response.data;

    if (weather.main == undefined) {
      res.render("index", { weather: null, error: "Error, please try again" });
      return;
    }

    const place = `${weather.name}, ${weather.sys.country}`;
    const weatherTimezone = new Date(
      weather.dt * 1000 - weather.timezone * 1000
    );
    const weatherTemp = weather.main.temp;
    const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const weatherDescription = weather.weather[0].description;
    const weatherHumidity = weather.main.humidity;
    const weatherWind = weather.wind.speed;
    const weatherFahrenheit = +(
      Math.round((weatherTemp * 9) / 5 + 32 + "e+2") + "e-2"
    );

    res.render("index", {
      weather,
      place,
      weatherTemp,
      weatherIcon,
      weatherDescription,
      weatherTimezone,
      weatherHumidity,
      weatherWind,
      weatherFahrenheit,
      error: null,
    });
  } catch (error) {
    res.render("index", { weather: null, error: "Error, please try again" });
  }
});

module.exports = router;
