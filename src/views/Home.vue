<template>
  <Header
    @getCurrentWeather="getWeatherData"
    @input="changeQuery"
    @handleSearch="handleSearch"
    :query="query"
    :isError="isError"
  />
  <Main :position="position" :time="time" :weather="weather" :query="query" />
</template>

<script>
import { ref } from "vue";
import Header from "./Header.vue";
import Main from "./Main";
import WeatherService from "@/services/WeatherService";

export default {
  components: { Header, Main },
  setup() {
    const query = ref("");
    const weather = ref({});
    const time = ref("");
    const position = ref({});
    const isError = ref(false);

    // Getting Current User Position, Weather and Time in his Country or City
    setTimeout(() => {
      getWeatherData();
    }, 200);

    // Getting Weather By Input Search
    const handleSearch = () => {
      WeatherService.getWeatherByQuery(query.value)
        .then((res) => {
          getPosition(res.data);
          getWeatherDetails(res.data);
        })
        .catch(() => {
          isError.value = true;
          setTimeout(() => {
            isError.value = false;
          }, 3000);
        });
    };

    // Getting Weather Data
    const getWeatherData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          WeatherService.getWeatherByLocation(
            position.coords.longitude,
            position.coords.latitude
          ).then((res) => {
            getPosition(res.data);
            getWeatherDetails(res.data);
            time.value = getTime(res.data);
          });
        });
      }
    };

    // Getting The Time
    const getTime = (res) => {
      const week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const ct = require("countries-and-timezones");
      const country = ct.getCountry(res.sys.country);
      const date = new Date();
      const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
      let timeOffset, currentTime, time, day;
      for (let i = 0; i < country.timezones.length; i++) {
        let currentPlace = query.value.replace(" ", "_");
        if (country.timezones[i].includes(currentPlace)) {
          timeOffset = ct.getTimezone(country.timezones[i]).utcOffset / 60;
          break;
        } else {
          timeOffset = ct.getTimezone(country.timezones[0]).utcOffset / 60;
        }
      }
      currentTime = new Date(utcTime + 3600000 * timeOffset);
      day = week[currentTime.getDay()];
      time = `${currentTime.getHours()}:${currentTime.getMinutes()}`.split(":");
      // Adding "0" to the time if it's needed
      for (let i = 0; i < time.length; i++) {
        if (time[i].length == 1) {
          let num = time[i].split("");
          num.unshift("0");
          time[i] = `${num[0]}${num[1]}`;
        }
      }
      time = `${day}, ${time[0]}:${time[1]}`;
      return time;
    };

    const getWeatherDetails = (res) => {
      // GETTING TIME BY TIMEZONES AND COUNTRIES
      time.value = getTime(res);

      // ADDING THE DATA TO THE WEATHER REF
      weather.value = {
        name: `${res.name}, ${res.sys.country}`,
        celcius: Math.round(res.main.temp - 273.15),
        fahrenheit: Math.round(((res.main.temp - 273.15) * 9) / 5 + 32),
        description: res.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${res.weather[0].icon}.png`,
        humidity: res.main.humidity,
        windspeed: res.wind.speed,
      };
    };

    // Getting User's Current Position
    const getPosition = (res) => {
      const { lat, lon } = res.coord;
      position.value = { lat, lon };
    };

    // Changing The Query
    const changeQuery = (e) => {
      query.value = e.target.value;

      if (e.key == "Enter") {
        handleSearch();
      }
    };

    return {
      query,
      changeQuery,
      weather,
      handleSearch,
      time,
      position,
      getWeatherData,
      isError,
    };
  },
};
</script>
