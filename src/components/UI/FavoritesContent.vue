<template>
  <div class="favorites-content">
    <div v-if="isLoading" class="favorites-content__loader">
      <svg-icon class="favorites-content__icons spinner" type="mdi" :path="path"></svg-icon>
    </div>
    <div class="favorites-content__box" v-else>
      <HeaderAside/>
      <DashboardInfo/>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import HeaderAside from "@/components/UI/HeaderAside.vue";
import DashboardInfo from "@/components/UI/DashboardInfo.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReload } from '@mdi/js';

export default {
  components: { DashboardInfo, HeaderAside, SvgIcon },
  setup() {
    const isLoading = ref(true);
    const path = mdiReload;

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    return {
      isLoading,
      path,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;

.favorites-content {
  &__box {
    display: flex;
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