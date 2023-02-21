import { useState, useEffect } from "react";

import { getWeatherByCityName } from "../services/WeatherServices";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    getWeatherByCityName(country.capital[0])
      .then((responseData) => setWeather(responseData))
      .catch((err) => console.log(err));
  }, [country]);

  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <b>Languages:</b>
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} style={{ width: "200px", height: "auto" }} />
      {weather ? (
        <>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} style={{ width: "150px", height: "auto" }} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CountryInfo;
