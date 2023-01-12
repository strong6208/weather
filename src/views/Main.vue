<template>
  <main>
    <div class="main__container">
      <div class="column-1">
        <h1 class="main__title">{{ weather.name }}</h1>
        <h1 class="main__temp">{{ weather.celcius }}°C</h1>
        <div class="main__description">
          <img :src="weather.icon" alt="" />
          <p>{{ weather.description }}</p>
        </div>
        <div class="main__humidity">
          <img src="@/assets/img/humidity.png" alt="" />
          <p>Humidity: {{ weather.humidity }}%</p>
        </div>
        <div class="main__windspeed">
          <img src="@/assets/img/wind.png" alt="" />
          <p>Wind speed: {{ weather.windspeed }}km/h</p>
        </div>

        <div class="main__time">
          <img src="@/assets/img/time.png" alt="" />
          <p>{{ time }}</p>
        </div>
      </div>

      <div class="column-2">
        <div v-if="position" class="main__map">
          <iframe
            loading="lazy"
            allowfullscreen
            :src="
              `https://www.google.com/maps/embed/v1/view?center=${position.lat},${position.lon}&zoom=10&key=AIzaSyCXeckAkyZNnAPDyJjl_9bSLYvCwV3nprs`
            "
          >
          </iframe>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ["query", "weather", "time", "position"],
};
</script>
