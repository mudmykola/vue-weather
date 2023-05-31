<template>
  <div class="dashboard-search">
    <div class="dashboard-search__box">
      <input type="text" v-model="city" placeholder="Введіть місто" @input="searchCity" />
      <ul v-if="suggestions.length > 0" class="dashboard-search__suggestions">
        <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">{{ suggestion.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'DashboardSearch',
  props: {
    selectedCity: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const city = ref('');
    const suggestions = ref([]);

    const searchCity = async () => {
      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/find?q=${city.value}&appid=${apiKey}&units=metric`
        );
        suggestions.value = response.data.list;
      } catch (error) {
        console.log(error);
      }
    };

    const selectSuggestion = async (suggestion) => {
      try {
        const apiKey = '4904ff7c9fa86ba4a1bcf9b9e92cc3f3';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${suggestion.id}&appid=${apiKey}&units=metric&lang=ua`
        );
        emit('city-selected', response.data);
        city.value = '';
        suggestions.value = [];
      } catch (error) {
        console.log(error);
      }
    };

    watch(
        () => props.selectedCity,
        (newCity) => {
          if (newCity) {
            city.value = newCity.name;
          }
        }
    );

    return {
      city,
      suggestions,
      searchCity,
      selectSuggestion,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.dashboard-search {
  input {
    background: var.$c104;
    border: none;
  }

  ul {
    li {
      cursor: pointer;
    }
  }


  &__box{
    display: flex;
    flex-direction: column;
    position: relative;
    ul{
      position: absolute;
      bottom: -35px;
      max-width: 100px;
      li{

      }


    }
    button{
      border: none;
      font-size: 12px;
      line-height: 18px;
      font-weight: var.$font-m;
      color: var.$default;
      background: var.$c106;
    }
  }
  &__weather{
    position: absolute;
    top: 100px;
    left: 4%;

    &--list{
      display: grid;
      grid-template-columns: repeat(3,1fr);
    }
  }
}

// 768

@media (max-width: 768px) {
  .dashboard-search{
    width: 200px;
    margin-top: 20px;
  }
}

// 600
@media (max-width: 600px) {
  .dashboard-search{
    width: 200px;
    margin-top: 20px;
  }

}

// 480
@media (max-width: 480px) {
  .dashboard-search{
    width: 200px;
    margin-top: 20px;
  }
}

// 320
@media (max-width: 320px) {

.dashboard-search{
  width: 200px;
  margin-top: 20px;
}
}
</style>