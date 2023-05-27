<template>
  <div class="dashboard-search">
    <div class="dashboard-search__box">
      <input type="text" v-model="city" placeholder="Введіть місто" @input="searchCity" />
      <ul v-if="suggestions.length > 0" class="dashboard-search__suggestions">
        <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">{{ suggestion.name }}</li>
      </ul>
    </div>

    <div class="dashboard-search__weather" v-for="(weatherData, index) in weatherList" :key="index">
      <ul class="dashboard-search__weather--list">
        <li class="dashboard-search__weather--item">
          <h2>{{ weatherData.name }}</h2>
          <p>{{ weatherData.weather[0].description }}</p>
          <p>Температура: {{ weatherData.main.temp }}°C</p>
          <p>Вітер: {{ weatherData.wind.speed }} м/с</p>
          <button @click="removeWeather(index)">Видалити</button>
        </li>

      </ul>

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
      weatherList: [],
      suggestions: [],
    };
  },
  methods: {
    async searchCity() {
      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/find?q=${this.city}&appid=${apiKey}&units=metric`
        );
        this.suggestions = response.data.list;
      } catch (error) {
        console.log(error);
      }
    },
    async selectSuggestion(suggestion) {
      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${suggestion.id}&appid=${apiKey}&units=metric`
        );
        this.weatherList.push(response.data);
        this.city = '';
        this.suggestions = [];
      } catch (error) {
        console.log(error);
      }
    },
    removeWeather(index) {
      this.weatherList.splice(index, 1);
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

    &--list{
      display: grid;
      grid-template-columns: repeat(3,1fr);
    }
  }
}
</style>