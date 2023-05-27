<template>
  <div class="dashboard-weather__cards">
    <div  v-for="cityWeather in weatherData" :key="cityWeather.id" class="dashboard-weather__cards--box">
      <h3>{{ cityWeather.name }}</h3>
      <div class="dashboard-weather__cards--info">
        <div>
          <p>Температура: {{ cityWeather.main.temp }}°C</p>
          <p>Опис: {{ cityWeather.weather[0].description }}</p>
        </div>

        <img :src="getWeatherIconUrl(cityWeather.weather[0].icon)" :alt="getWeatherDescription(cityWeather.weather[0].id)" />
      </div>

      <p>Вітер: {{ cityWeather.wind.speed }} м/с</p>
      <p>Оновлено: {{ formatTimestamp(cityWeather.dt) }}</p>
      <button @click="addToFavorites(cityWeather)">Додати в улюблене</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardWeather',
  data() {
    return {
      weatherData: [],
      favoriteWeather: [],

    };
  },
  mounted() {
    this.fetchWeatherData();
  },
  methods: {
    async fetchWeatherData() {
      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const cities = ['Kyiv', 'Lviv', 'Odessa'];
        const requests = cities.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=${apiKey}&units=metric&lang=ua`)
        );
        const responses = await Promise.all(requests);
        this.weatherData = responses.map(response => response.data);
      } catch (error) {
        console.log(error);
      }
    },
    addToFavorites(cityWeather) {
      this.favoriteWeather.push(cityWeather);
    },


    formatTimestamp(timestamp) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${hours}:${minutes}:${seconds}`;
    },
    getWeatherDescription(weatherId) {

      const descriptions = {
        200: 'Гроза з невеликим дощем',
        201: 'Гроза з дощем',
        202: 'Гроза з сильним дощем',

      };

      return descriptions[weatherId] || 'Невідома погода';
    },
    getWeatherIconUrl(iconCode) {
      return `https://openweathermap.org/img/w/${iconCode}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.dashboard-weather__cards{
  margin-top: 200px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
  &--info{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &--box{
    padding: 15px;
    background: var.$default;
    @extend %border-ef;
    @extend %dtrans;
    border-radius: 18px;
    cursor: pointer;
    button{
      margin-top: 10px;
      border: none;
      background: var.$c102;
      color: var.$default;
      font-weight: var.$font-l;
      padding: 5px;
      border-radius: 5px;
    }
    p{
      font-size: 14px;
      line-height: 20px;
      color: var.$c101;
      font-weight: var.$font-l;
    }
    h3{
      font-weight: var.$font-b;
      color: var.$c103;
    }
    &:hover{
      @extend %htrans;
      @extend %form-ef;
    }
  }
}
</style>