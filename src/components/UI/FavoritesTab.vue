<template>
  <div class="favorites-tab">
    <div v-for="(weather, index) in favoriteWeatherBlocks" :key="index" class="favorites-tab__card">
      <h3>{{ weather.city }}</h3>
      <p>{{ temperatureText }} {{ Math.round(weather.temperature) }} °C</p>
      <span>{{ weather.description }}</span>
      <button class="favorites-tab__card--close" @click="deleteFavorite(index)">
        <svg-icon type="mdi" :path="path"></svg-icon>
      </button>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose } from '@mdi/js';

export default {
  name: 'FavoritesTab',
  components: {
    SvgIcon,
  },
  props: {
    favoriteWeatherBlocks: {
      type: Array,
      default: () => [],
    },
    temperatureText: {
      type: String,
      default: 'Температура: ',
    },
  },
  data() {
    return {
      path: mdiClose,
    };
  },
  methods: {
    deleteFavorite(index) {
      this.$emit('favorite-deleted', index);
    },
  },
};
</script>

<style scoped>
.favorites-tab {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 30px;
  justify-items: center;
}

.favorites-tab__card {
  position: relative;
  display: flex;
  width: 250px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
  cursor: pointer;
}

.favorites-tab__card--close {
  position: absolute;
  right: 2%;
  top: 4%;
  border: none;
  background: transparent;
}
</style>