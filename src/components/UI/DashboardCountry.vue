<template>
  <div class="dashboard-country">
    <div v-if="isLoading" class="dashboard-country__loader">
      <svg-icon class="dashboard-country__icons spinner" type="mdi" :path="path"></svg-icon>
    </div>
    <div class="dashboard-country__box" v-else>
      <div class="dashboard-country__city">
        <h2>{{ country }}</h2>
        <p>{{ city }}</p>
        <span>{{ ipAddress }}</span>
      </div>

      <div class="dashboard-country__time">
        <h2>{{ currentTime }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import {mdiReload} from "@mdi/js";
import SvgIcon from '@jamescoyle/vue-icon';
export default {
  name: 'DashboardCountry',
  components: {
    SvgIcon
  },
  data() {
    return {
      isLoading: true,
      path: mdiReload,
      country: '',
      city: '',
      ipAddress: '',
      currentTime: '',
    };
  },
  mounted() {
    this.getUserLocation();
    this.startClock();
  },
  methods: {
    async getUserLocation() {
      try {
        this.loading = true;
        const { coords } = await this.getCurrentPosition();
        const { latitude, longitude } = coords;
        const { country, city } = await this.getLocationData(latitude, longitude);
        const ipAddress = await this.getIpAddress();
        this.country = country;
        this.city = city;
        this.ipAddress = ipAddress;
        this.getCurrentTime(country);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    getLocationData(latitude, longitude) {
      const apiKey = '216c0e5f4b0842cd8a21565861440be2';
      const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;
      return fetch(url)
          .then(response => response.json())
          .then(data => {
            const { country, city } = data.results[0].components;
            return { country, city };
          });
    },
    getIpAddress() {
      return fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => data.ip);
    },
    getCurrentTime(country) {
      this.currentTime = new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Kiev',
      });
    },
    startClock() {
      setInterval(() => {
        this.currentTime = new Date().toLocaleString('en-US', {
          timeZone: 'Europe/Kiev',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@use "src/styles/variables" as var;
.dashboard-country{
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  &__icons{
    color: var.$default;
  }
  &__box{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
&__city{
  h2{
    font-size: 25px;
    line-height: 30px;
    color: var.$default;
    font-weight: var.$font-b;
    margin-bottom: 5px;
  }
  p{
    font-size: 16px;
    line-height: 20px;
    color: var.$default;
    font-weight: var.$font-l;
    opacity: .7;
  }
  span {
    font-weight: var.$font-b;
    color: var.$default;
    font-size: 12px;
    line-height: 18px;
  }
}
  &__time{
    color: var.$default;
    font-weight: var.$font-m;
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