<template>
  <div class="dashboard-week__card">
    <div v-if="isLoading" class="dashboard-week__loader">
      <svg-icon class="dashboard-week__icons spinner" type="mdi" :path="path"></svg-icon>
    </div>
    <div v-else>
      <div v-for="(day, index) in weatherData" :key="index" class="dashboard-week__item">
        <div class="dashboard-week__day">{{ day.day }}</div>
        <div class="dashboard-week__icon">
          <img :src="getWeatherIconUrl(day.icon)" :alt="day.description" />
        </div>
        <div class="dashboard-week__temperature">
          <span class="dashboard-week__tempmax">{{ day.temperatureMax }}°C</span>
          <span class="dashboard-week__tempmin">{{ day.temperatureMin }}°C</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mdiReload} from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
export default {
  name: 'DashboardWeatherWeek',
  components: {
    SvgIcon
  },
  data() {
    return {
      weatherData: [],
      isLoading: true,
      path: mdiReload,
      apiKey: '4904ff7c9fa86ba4a1bcf9b9e92cc3f3',
      city: '',
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getWeatherByLocation);
      } else {
        console.log('Геолокація не підтримується вашим браузером.');
      }
    },
    async getWeatherByLocation(position) {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric&lang=ua`
        );
        this.city = response.data.name;
        this.fetchWeatherData();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchWeatherData() {
      this.isLoading = true;

      try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=metric&lang=ua`
        );
        const forecastData = response.data;
        const dailyForecastData = forecastData.list
            .filter((item, index) => index % 8 === 0)
            .slice(0, 7)
            .map((item) => ({
              day: this.getDayOfWeek(new Date(item.dt * 1000)),
              icon: item.weather[0].icon,
              description: item.weather[0].description,
              temperatureMax: Math.round(item.main.temp_max),
              temperatureMin: Math.round(item.main.temp_min),
            }));


        this.weatherData = dailyForecastData;
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    },
    getDayOfWeek(date) {
      const daysOfWeek = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      return daysOfWeek[date.getDay()];
    },
    getWeatherIconUrl(icon) {
      return `https://openweathermap.org/img/w/${icon}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;

.dashboard-week {

  &__tempmax,
  &__tempmin {
    margin-right: 10px;
    color: var.$c105;
    font-weight: var.$font-b;
  }
  &__tempmin{
    font-weight: var.$font-l;
    color: var.$default;

  }

  &__card {
    background: var.$c103;
    width: 100%;
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    padding: 10px;
  }

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: var.$default;
  }

  &__item {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
  }

  &__day {
    font-size: 16px;
    color: var.$c104;
    font-weight: var.$font-b;
    margin-bottom: 5px;
  }

  &__icon {
    img {
      width: 50px;
      height: 50px;
    }
  }

  &__temperature {
    display: flex;
  }
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>