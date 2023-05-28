<template>
  <div class="dashboard-weather">
    <button class="dashboard-weather__btn" @click="addWeatherBlock">{{
        addWeatherText
      }}
    </button>

    <div v-for="(weather, index) in weatherBlocks" :key="index" class="dashboard-weather__card">
      <h3>{{
          weather.city
        }}</h3>
      <p>Температура: {{
          Math.round(weather.temperature)
        }} °C</p>
      <p>{{
          weather.description
        }}</p>
      <p v-if="isMorning(weather.time)">Температура вранці: {{
          Math.round(weather.temperatureMorning)
        }} °C</p>
      <p v-else>Температура в обід: {{
          Math.round(weather.temperatureDay)
        }} °C</p>
      <img :src="weather.icon" :alt="weather.description"/>
      <button @click="deleteWeatherBlock(index)">Видалити</button>
    </div>

    <div v-if="showDeletePopup" class="dashboard-weather__delete">
      <p>Ви впевнені, що хочете видалити блок погоди?</p>
      <button @click="confirmDelete">Так</button>
      <button @click="cancelDelete">Скасувати</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WeatherCardList',
  props: {
    addWeatherText: {
      type: String,
      default: 'Додати блок погоди',
    },
  },
  data() {
    return {
      weatherBlocks: [],
      showDeletePopup: false,
      deleteIndex: null,
      apiKey: '4904ff7c9fa86ba4a1bcf9b9e92cc3f3',
    };
  },
  methods: {
    async addWeatherBlock() {
      const city = prompt('Введіть назву міста:');
      if (!city) return;

      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ua`
        );
        const weatherData = response.data;
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=ua`
        );
        const forecastData = forecastResponse.data;

        const temperatureDay = forecastData.list[2].main.temp;
        const temperatureEvening = forecastData.list[4].main.temp;

        const newWeatherBlock = {
          city: weatherData.name,
          temperature: Math.round(weatherData.main.temp),
          description: weatherData.weather[0].description,
          temperatureMorning: 0,
          temperatureDay: Math.round(temperatureDay),
          temperatureEvening: Math.round(temperatureEvening),
          time: new Date().getHours(),
          icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
        };
        this.weatherBlocks.push(newWeatherBlock);
      } catch (error) {
        console.log(error);
      }
    },
    deleteWeatherBlock(index) {
      this.showDeletePopup = true;
      this.deleteIndex = index;
    },
    confirmDelete() {
      this.weatherBlocks.splice(this.deleteIndex, 1);
      this.closeDeletePopup();
    },
    cancelDelete() {
      this.closeDeletePopup();
    },
    closeDeletePopup() {
      this.showDeletePopup = false;
      this.deleteIndex = null;
    },
    isMorning(time) {
      return time >= 6 && time < 12;
    },
  },
};
</script>

<style lang="scss">
@use "src/styles/variables" as var;
.dashboard-weather {
  position: relative;
  padding-top: 50px;

&__btn{
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  padding: 10px;
  border-radius: 5px;
  background: var.$c102;
  color: var.$default;
  font-weight: var.$font-b;
  @extend %dtrans;
  &:hover{
    background: var.$c103;
    @extend %htrans;
  }
}
  &__card {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #f2f2f2;
    border-radius: 5px;
  }

  &__delete {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}


</style>