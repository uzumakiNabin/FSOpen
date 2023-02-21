import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherByCityName = (cityName) =>
  axios.get(`${baseUrl}?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`).then((response) => response.data);

export { getWeatherByCityName };
