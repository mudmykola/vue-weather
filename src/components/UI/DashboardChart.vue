<template>
  <div class="dashboard-chart">
    <div v-if="isLoading" class="dashboard-chart__loader">
      <svg-icon class="dashboard-chart__icons spinner" type="mdi" :path="path"></svg-icon>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { mdiArrowUp, mdiArrowDown } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReload } from '@mdi/js';

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      chartCanvas: null,
      temperatureData: [],
      city: '',
      isLoading: true,
      path: mdiReload,
    };
  },
  mounted() {
    this.fetchTemperatureData();
  },
  methods: {
    async fetchTemperatureData() {
      try {
        const position = await this.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const apiKey = "4904ff7c9fa86ba4a1bcf9b9e92cc3f3";
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        this.temperatureData = this.extractTemperatureData(data);
        this.city = data.city.name;
        this.createChart();
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    extractTemperatureData(data) {
      const hourlyData = data.list.map(item => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        const temperature = this.kelvinToCelsius(item.main.temp);
        const temperatureChangeIcon = this.getTemperatureChangeIcon(item.main.temp);
        return { hour, temperature, temperatureChangeIcon };
      });

      return hourlyData;
    },
    kelvinToCelsius(kelvin) {
      return (kelvin - 273.15).toFixed(1);
    },
    getTemperatureChangeIcon(temperature) {
      const previousTemperature = this.temperatureData[this.temperatureData.length - 1]?.temperature;
      if (previousTemperature) {
        return temperature > previousTemperature ? mdiArrowUp : mdiArrowDown;
      }
      return null;
    },
    createChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');

      const labels = this.temperatureData.map(data => `${data.hour}`);
      const values = this.temperatureData.map(data => data.temperature);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: `Температура (${this.city})`,
              data: values,
              backgroundColor: '#2E5FD9',
              borderColor: '#0A223E',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.dashboard-chart {
  padding-top: 100px;
  width: 600px;
  margin: 0 auto;
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  &__icons{
    color: var.$c102;
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