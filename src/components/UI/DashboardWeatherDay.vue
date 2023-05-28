<template>
  <div class="dashboard-weather__day">
     <div v-if="isLoading" class="dashboard-weather__loader">
    <svg-icon class="dashboard-weather__icons spinner" type="mdi" :path="path"></svg-icon>
  </div>
    <div v-else-if="error" class="dashboard-weather__day--error">{{ error }}</div>
    <div v-else class="dashboard-weather__day--info">
      <div class="dashboard-weather__day--icon">
        <img :src="getWeatherIconUrl(weather.icon)" :alt="weather.description" />
      </div>
      <div class="dashboard-weather__day--details">
        <h2>{{ location }}</h2>
        <p>{{ temperatureLabel }}: {{ roundTemperature(weather.temperature) }}°C</p>
        <p>{{ humidityLabel }}: {{ weather.humidity }}%</p>
        <p>{{ precipitationLabel }}: {{ weather.precipitation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mdiReload } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
export default {
  name: 'DashboardWeatherDay',
  components: {
    SvgIcon
  },
  props: {
    temperatureLabel: { type: String, default: 'Температура' },
    humidityLabel: { type: String, default: 'Вологість' },
    precipitationLabel: { type: String, default: 'Опади' },
  },
  data() {
    return {

      error: '',
      location: '',
      weather: {},
      animate: false,
      isLoading: true,
      path: mdiReload,
    };
  },
  mounted() {
    this.getWeatherData();
  },
  watch: {
    weather: {
      handler() {
        this.animate = true;
      },
      deep: true,
    },
  },
  methods: {
    async getWeatherData() {
      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const { coords } = await this.getCurrentPosition();
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric&lang=ua`
        );
        this.location = response.data.name;
        this.weather = {
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          precipitation: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        };
        this.isLoading = false;
      } catch (error) {
        this.error = 'Помилка при отриманні даних погоди';
        console.error(error);
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    getWeatherIconUrl(iconCode) {
      return `https://openweathermap.org/img/wn/${iconCode}.png`;
    },
    roundTemperature(temperature) {
      return Math.round(temperature);
    },
  },
};
</script>

<style lang="scss">
@use "src/styles/variables" as var;
.dashboard-weather{
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__icons {
    color: var.$c102;
  }
}
.dashboard-weather__day {

  margin-top: 30px;
  background: var.$default;
  border-radius: 8px;
  text-align: center;
  padding: 20px;



  &--error {
    color: var.$c105;
    font-weight: bold;
  }


  &--details {
    h2 {
      font-size: 25px;
      line-height: 30px;
      color: var.$c103;
      font-weight: var.$font-b;
    }

    p {
      font-size: 15px;
      line-height: 20px;
      font-weight: var.$font-l;
    }
  }
}
.spinner {
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