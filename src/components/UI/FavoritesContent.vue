<template>
  <div class="favorites-content ">
    <div v-if="isLoading" class="favorites-content__loader">
      <svg-icon class="favorites-content__icons spinner" type="mdi" :path="path"></svg-icon>
    </div>
    <div class="favorites-content__box" v-else>
      <HeaderAside />
      <FavoritesList/>
      <DashboardInfo class="dashboard-info"/>
    </div>
  </div>
</template>

<script>
import HeaderAside from "@/components/UI/HeaderAside.vue";
import DashboardInfo from "@/components/UI/DashboardInfo.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReload } from '@mdi/js';
import FavoritesList from "@/components/UI/FavoritesList.vue";

export default {
  components: {FavoritesList, DashboardInfo, HeaderAside, SvgIcon },

  data() {
    return {
      isLoading: true,
      path: mdiReload,
    };
  },
  mounted() {
    this.delay(2000).then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },


  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.dashboard-info{
  width: 350px;
}
.favorites-content {
  &__box {
    display: flex;
    justify-content: space-between;
  }

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