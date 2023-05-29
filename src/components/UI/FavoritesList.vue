<template>
  <div class="favorites-list">
    <h2>Обране</h2>
    <ul>
      <li v-for="favorite in favorites" :key="favorite.id">
        <p>{{ favorite.name }}</p>
        <p>{{ favorite.temperature }}°C</p>
        <p>{{ favorite.description }}</p>
        <button @click="removeFromFavorites(favorite)">Видалити з обраного</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FavoritesList',
  data() {
    return {
      favorites: [],
    };
  },
  methods: {
    addFavorites(weatherData) {
      this.favorites.push(weatherData);
    },
    removeFromFavorites(weatherData) {
      this.favorites = this.favorites.filter((favorite) => favorite.id !== weatherData.id);
    },
  },
};
</script>

<style scoped>
.favorites-list {

}
</style>