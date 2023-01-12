<template>
  <header>
    <div class="header__wrapper">
      <div class="column-1">
        <h1 class="header__title">Weather App</h1>
        <p class="header__p">See the current weather data wherever you want</p>
      </div>
      <div class="column-2">
        <img class="header__img" src="@/assets/img/favicon.png" />
      </div>
    </div>

    <div class="header__inputContainer">
      <button
        @click="this.$emit('getCurrentWeather')"
        class="header__getCurrentWeatherBtn"
        title="Get the current weather data in your region"
      >
        <span class="material-icons">room</span>
      </button>
      <input
        class="header__searchInput"
        spellcheck="false"
        placeholder="Search city or country"
        :value="query"
        @keypress="
          (e) => {
            this.$emit('input', e);
          }
        "
      />
      <button
        title="Search for current weather data for any region"
        class="header__searchBtn"
        @click="this.$emit('handleSearch')"
      >
        <span class="material-icons">search</span>
      </button>
    </div>
    <div class="header__errorContainer" style="textAlign: center">
      <div v-if="isError">
        Something went wrong 😔!
      </div>
      <div v-else></div>
    </div>
  </header>
</template>

<script>
export default {
  props: ["query", "isError"],
};
</script>
