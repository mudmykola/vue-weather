<template>
  <div class="dashboard-search">
    <div class="dashboard-search__box">
      <input type="text" v-model="city" placeholder="Введіть місто" @keydown.enter="getWeather"  />
      <button @click="getWeather">Отримати погоду</button>
    </div>


    <div class="dashboard-search__weather" v-if="weather">
      <h2>{{ weather.name }}</h2>
      <p>{{ weather.weather[0].description }}</p>
      <p>Температура: {{ weather.main.temp }}°C</p>
      <p>Вітер: {{ weather.wind.speed }} м/с</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardSearch',
  data() {
    return {
      city: '',
      weather: null,
    };
  },
  methods: {
    async getWeather() {
      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`
        );
        this.weather = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.dashboard-search{

  input{
    background: var.$c104;
    border: none;
  }
  ul{
    li{
      cursor: pointer;
    }
  }
  &__box{
    display: flex;
    align-items: center;
    button{
      border: none;
      font-size: 12px;
      line-height: 18px;
      font-weight: var.$font-m;
      color: var.$default;
      background: var.$c106;
    }
  }
  &__weather{
    position: absolute;
    top: 100px;
    left: 4%;
  }
}
</style>