<template>
  <div class="dashboard-weather">
    <div v-if="loading">Завантаження...</div>
    <div v-else-if="error">Помилка при отриманні погоди.</div>
    <div v-else-if="weather">
      <h2>{{
          wather.name
        }}</h2>
      <p>Температура: {{
          weather.main.temp
        }}°C</p>
      <p>Вологість: {{
          weather.main.humidity
        }}%</p>
      <p>Швидкість вітру: {{
          weather.wind.speed
        }} м/с</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardWeather',
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
      weather: null,
    };
  },
  watch: {
    city: {
      immediate: true,
      handler() {
        this.fetchWeather();
      },
    },
  },
  methods: {
    async fetchWeather() {
      if (!this.city) return;

      this.loading = true;
      this.error = null;
      this.weather = null;

      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=${apiKey}&units=metric`
        );
        this.weather = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.dashboard-weather {
  margin-top: 20px;
}
</style>