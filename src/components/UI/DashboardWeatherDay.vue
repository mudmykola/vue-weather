<template>
  <div class="dashboard-weather__day">
    <div v-if="loading" class="dashboard-weather__day--loading">Завантаження...</div>
    <div v-else-if="error" class="dashboard-weather__day--error">{{ error }}</div>
    <div v-else class="dashboard-weather__day--info">
      <div class="dashboard-weather__day--icon">
        <img :src="getWeatherIconUrl(weather.icon)" :alt="weather.description" />
      </div>
      <div class="dashboard-weather__day--details">
        <h2>{{ location }}</h2>
        <p>{{ temperatureLabel }}: {{ weather.temperature }}°C</p>
        <p>{{ humidityLabel }}: {{ weather.humidity }}%</p>
        <p>{{ precipitationLabel }}: {{ weather.precipitation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WeatherWidget',
  props: {
    temperatureLabel: { type: String, default: 'Температура' },
    humidityLabel: { type: String, default: 'Вологість' },
    precipitationLabel: { type: String, default: 'Опади' },
  },
  data() {
    return {
      loading: true,
      error: '',
      location: '',
      weather: {},
    };
  },
  mounted() {
    this.getWeatherData();
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
        this.loading = false;
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
  },
};
</script>

<style lang="scss">
@use "src/styles/variables" as var;
.dashboard-weather__day {
  margin-top: 30px;
  background: var.$default;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
@extend %form-ef;

  &--loading {
    font-weight: bold;
  }

  &--error {
    color: red;
    font-weight: bold;
  }

  &--icon {
    margin-bottom: 5px;
  }

  &--details {
h2{
  font-size: 25px;
  line-height: 30px;
  color: var.$c103;
  font-weight: var.$font-b;
}
  p{
    font-size: 15px;
    line-height: 20px;
    font-weight: var.$font-l;
  }
  }
}
</style>