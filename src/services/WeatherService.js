import axios from "axios";

const API_KEY = "b190a0605344cc4f3af08d0dd473dd25";

const apiClient = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/weather`,
});

export default {
  getWeatherByLocation(longitutde, latitude) {
    return apiClient.get(`?lon=${longitutde}&lat=${latitude}&appid=${API_KEY}`);
  },
  getWeatherByQuery(query) {
    return apiClient.get(`?q=${query}&appid=${API_KEY}`);
  },
};
