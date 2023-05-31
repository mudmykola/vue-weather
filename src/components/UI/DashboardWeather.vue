<template>
  <div class="dashboard-weather">
    <button class="dashboard-weather__btn" @click="addWeatherBlock">
      {{
        addWeatherText
      }}
    </button>
    <div class="dashboard-weather__tabs">
      <button
          class="dashboard-weather__tab"
          :class="{ 'dashboard-weather__tab--active': activeTab === 'weather' }"
          @click="setActiveTab('weather')"
      >
        {{
          tabWeatherText
        }}
      </button>
      <button
          class="dashboard-weather__tab"
          :class="{ 'dashboard-weather__tab--active': activeTab === 'favorites' }"
          @click="setActiveTab('favorites')"
      >
        {{
          tabFavoriteText
        }}
      </button>
    </div>

    <div v-if="activeTab === 'weather'" class="dashboard-weather__box">
      <div v-for="(weather, index) in weatherBlocks" :key="index" class="dashboard-weather__card">
        <div class="dashboard-weather__card--text">
          <h3>{{
              weather.city
            }}</h3>
          <p>
            {{
              temperatureText
            }} {{
              Math.round(weather.temperature)
            }} °C
          </p>
          <span>{{
              weather.description
            }}</span>
          <p v-if="isMorning(weather.time)">
            {{
              temperatureMorningText
            }} {{
              Math.round(weather.temperatureMorning)
            }} °C
          </p>
          <p v-else>
            {{
              temperatureDayText
            }} {{
              Math.round(weather.temperatureDay)
            }} °C
          </p>
        </div>
        <button class="dashboard-weather__card--close" @click="deleteWeatherBlock(index)">
          <svg-icon type="mdi" :path="path"></svg-icon>
        </button>
        <button class="dashboard-weather__card--favorite" @click="addFavorite(index)">
          <svg-icon type="mdi" :path="mdiHeartOutline"></svg-icon>
        </button>
      </div>
    </div>

    <div v-else-if="activeTab === 'favorites'" class="dashboard-weather__box">
      <div v-for="(favorite, index) in favoriteWeatherBlocks" :key="index" class="dashboard-weather__card">
        <div class="dashboard-weather__card--text">
          <h3>{{
              favorite.city
            }}</h3>
          <p>
            {{
              temperatureText
            }} {{
              Math.round(favorite.temperature)
            }} °C
          </p>
          <span>{{
              favorite.description
            }}</span>
        </div>
        <button class="dashboard-weather__card--close" @click="deleteFavorite(index)">
          <svg-icon type="mdi" :path="path"></svg-icon>
        </button>
      </div>
    </div>

    <div v-if="showDeletePopup" class="dashboard-weather__delete">
      <p>{{
          showDeletePopupText
        }}</p>
      <button @click="confirmDelete">{{
          confirmDeleteText
        }}
      </button>
      <button @click="cancelDelete">{{
          cancelDeleteText
        }}
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import SvgIcon from '@jamescoyle/vue-icon';
import {mdiClose} from '@mdi/js';
import {mdiHeartOutline} from '@mdi/js';

export default {
  name: 'DashboardWeather',
  components: {
    SvgIcon,
  },
  props: {
    addWeatherText: {
      type: String,
      default: 'Додати блок погоди',
    },
    temperatureText: {
      type: String,
      default: 'Температура: ',
    },
    temperatureMorningText: {
      type: String,
      default: 'Температура вранці: ',
    },
    temperatureDayText: {
      type: String,
      default: 'Температура в обід:',
    },
    confirmDeleteText: {
      type: String,
      default: 'Так',
    },
    cancelDeleteText: {
      type: String,
      default: 'Скасувати',
    },
    showDeletePopupText: {
      type: String,
      default: 'Ви впевнені, що хочете видалити блок погоди?',
    },
    tabWeatherText: {
      type: String,
      default: 'Погода',
    },
    tabFavoriteText: {
      type: String,
      default: 'Обране',
    }
  },
  data() {
    return {
      weatherBlocks: [],
      showDeletePopup: false,
      deleteIndex: null,
      apiKey: '4904ff7c9fa86ba4a1bcf9b9e92cc3f3',
      path: mdiClose,
      mdiHeartOutline: mdiHeartOutline,
      favoriteWeatherBlocks: [],
      activeTab: 'weather',
    };
  },
  mounted() {
    this.loadWeatherBlocks();
    this.loadFavoriteWeatherBlocks();
  },
  methods: {
    async addWeatherBlock() {
      const city = prompt('Введіть назву міста:');
      if (!city) return;

      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=uk`),
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=uk`),
        ]);

        const weatherData = weatherResponse.data;
        const forecastData = forecastResponse.data;

        const temperatureDay = forecastData.list[2].main.temp;
        const temperatureMorning = forecastData.list[0].main.temp;

        const newWeatherBlock = {
          city: weatherData.name,
          temperature: Math.round(weatherData.main.temp),
          description: weatherData.weather[0].description,
          temperatureMorning: Math.round(temperatureMorning),
          temperatureDay: Math.round(temperatureDay),
          time: new Date().getUTCHours(),
        };

        this.weatherBlocks.push(newWeatherBlock);
        this.saveWeatherBlocks();
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
      this.saveWeatherBlocks();
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
    saveWeatherBlocks() {
      localStorage.setItem('weatherBlocks', JSON.stringify(this.weatherBlocks));
    },
    loadWeatherBlocks() {
      const savedWeatherBlocks = localStorage.getItem('weatherBlocks');
      if (savedWeatherBlocks) {
        this.weatherBlocks = JSON.parse(savedWeatherBlocks);
      }
    },
    addFavorite(index) {
      const weatherBlock = this.weatherBlocks[index];
      const favoriteWeather = {
        city: weatherBlock.city,
        temperature: weatherBlock.temperature,
        description: weatherBlock.description,
      };

      this.favoriteWeatherBlocks.push(favoriteWeather);
      this.saveFavoriteWeatherBlocks();
    },
    deleteFavorite(index) {
      this.favoriteWeatherBlocks.splice(index, 1);
      this.saveFavoriteWeatherBlocks();
    },
    saveFavoriteWeatherBlocks() {
      localStorage.setItem('favoriteWeatherBlocks', JSON.stringify(this.favoriteWeatherBlocks));
    },
    loadFavoriteWeatherBlocks() {
      const savedFavoriteWeatherBlocks = localStorage.getItem('favoriteWeatherBlocks');
      if (savedFavoriteWeatherBlocks) {
        this.favoriteWeatherBlocks = JSON.parse(savedFavoriteWeatherBlocks);
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>


<style lang="scss">
@use "src/styles/variables" as var;

.dashboard-weather {
  position: relative;
  padding-top: 50px;

  h3 {
    font-size: 22px;
    line-height: 30px;
    font-weight: var.$font-b;
    color: var.$c103;
  }

  p {
    font-size: 15px;
    line-height: 20px;
    font-weight: var.$font-m;
    color: var.$c101;
  }

  span {
    font-size: 15px;
    line-height: 20px;
    font-weight: var.$font-m;
    color: var.$c101;
    text-transform: capitalize;
  }

  &__btn {
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

    &:hover {
      background: var.$c103;
      @extend %htrans;
    }
  }

  &__tabs {
    display: flex;
    gap: 10px;
  }

  &__tab {

    padding: 10px;
    border-radius: 5px;
    border: 1px solid var.$c103;
    background: transparent;
    color: var.$c103;
    font-weight: var.$font-b;
    @extend %dtrans;

    &--active {
      background: var.$c103;
      @extend %htrans;
      color: var.$default;
    }

    &:hover {

    }
  }

  &__box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 30px;
    justify-items: center;
  }

  &__card {
    position: relative;
    display: flex;
    width: 250px;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #f2f2f2;
    border-radius: 5px;
    cursor: pointer;

    &--close {
      position: absolute;
      right: 2%;
      top: 4%;
      border: none;
      background: transparent;
    }

    &--favorite {
      position: absolute;
      right: 2%;
      top: 25%;
      border: none;
      background: transparent;
    }
  }

  &__delete {
    width: 300px;

    position: fixed;
    display: grid;
    gap: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    @extend %form-ef;

    p {
      margin-bottom: 10px;
      font-size: 18px;
      text-align: center;
    }

    button {
      border: none;
      padding: 10px;
      border-radius: 5px;
      background: var.$c102;
      color: var.$default;
      font-weight: var.$font-b;
      @extend %dtrans;

      &:hover {
        background: var.$c103;
        @extend %htrans;
      }
    }
  }
}

// 1200

@media (max-width: 1200px) {

  .dashboard-weather {

    &__box {

      grid-template-columns: repeat(2, 1fr);
      width: 550px;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
}

// 768

@media (max-width: 768px) {
  .container-848 {
    width: 100%;
  }
  .dashboard-weather {
    &__box {

      grid-template-columns: repeat(2, 1fr);
      width: 550px;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
}

// 600
@media (max-width: 600px) {
  .container-848 {
    width: 100%;
  }
  .dashboard-weather {
    &__box {
      grid-template-columns: repeat(2, 1fr);
      width: 250px;

      margin-top: 30px;
    }
  }
}

// 480
@media (max-width: 480px) {
  .container-848 {
    width: 100%;

  }
  .dashboard-weather {

    &__tabs {
      justify-content: flex-end;
    }

    &__box {
      grid-template-columns: repeat(1, 1fr);
      width: 250px;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
}

// 320
@media (max-width: 320px) {
  .container-848 {
    width: 250px;

  }
  .dashboard-weather {
    &__btn {

    }

    &__tabs {
      justify-content: flex-end;
    }

    &__box {
      grid-template-columns: repeat(1, 1fr);
      width: 250px;
    }
  }
}
</style>