<template>
  <div class="dashboard-chart">
    <div v-if="isLoading" class="dashboard-chart__loader">
      <svg-icon class="dashboard-chart__icons spinner" type="mdi" :path="path"></svg-icon>
    </div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { mdiArrowUp, mdiArrowDown } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReload } from '@mdi/js';

export default {
  components: {
    SvgIcon
  },
  setup() {
    const chartCanvas = ref(null);
    const temperatureData = ref([]);
    const city = ref('');

    const isLoading = ref(true);
    const path = mdiReload;
    const fetchTemperatureData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              const apiKey = "4904ff7c9fa86ba4a1bcf9b9e92cc3f3";
              const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

              fetch(apiUrl)
                  .then(response => response.json())
                  .then(data => {
                    temperatureData.value = extractTemperatureData(data);
                    city.value = data.city.name;
                    createChart();
                  })
                  .catch(error => {
                    console.error('Error fetching temperature data:', error);
                  });
            },
            error => {
              console.error('Error getting geolocation:', error);
            }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    const extractTemperatureData = data => {
      const currentDate = new Date().getDate();
      const hourlyData = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        return date.getDate() === currentDate;
      });

      return hourlyData.map(item => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        const temperature = kelvinToCelsius(item.main.temp);
        const temperatureChangeIcon = getTemperatureChangeIcon(item.main.temp);
        return { hour, temperature, temperatureChangeIcon };
      });
    };

    const kelvinToCelsius = kelvin => {
      return (kelvin - 273.15).toFixed(1);
    };

    const getTemperatureChangeIcon = temperature => {
      const previousTemperature = temperatureData.value[temperatureData.value.length - 1]?.temperature;
      if (previousTemperature) {
        return temperature > previousTemperature ? mdiArrowUp : mdiArrowDown;
      }
      return null;
    };

    const createChart = () => {
      const ctx = chartCanvas.value.getContext('2d');

      const labels = temperatureData.value.map(data => `${data.hour}`);
      const values = temperatureData.value.map(data => data.temperature);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: `Температура (${city.value})`,
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
    };
    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    onMounted(fetchTemperatureData);

    return {
      chartCanvas,
      temperatureData,
      isLoading,
      path,
    };
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