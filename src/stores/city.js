import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
  state: () => ({
    searchQuery: '',
    cities: ['Ivano-Frankivsk', 'London', 'Paris', 'Tokyo', 'Berlin'],
  }),
  getters: {
    filteredCities(state) {
      return state.cities.filter((city) =>
          city.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    showSuggestions(state) {
      return state.searchQuery.length > 0 && state.filteredCities.length > 0;
    },
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
  },
});