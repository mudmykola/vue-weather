<template>
  <div class="dashboard">
    <div class="container-848">
      <div class="dashboard-box">
        <DashboardDate/>
        <DashboardSearch/>
      </div>
      <div class="dashboard-weather" ref="dashboardWeather">
        <DashboardWeather />
        <DashboardChart/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DashboardDate from "@/components/UI/DashboardDate.vue";
import DashboardSearch from "@/components/UI/DashboardSearch.vue";
import DashboardWeather from "@/components/UI/DashboardWeather.vue";
import DashboardChart from "@/components/UI/DashboardChart.vue";

export default {
  name: "Dashboard",
  components: {DashboardChart, DashboardWeather, DashboardDate, DashboardSearch},
  setup() {
    const dashboardWeatherRef = ref(null);

    onMounted(() => {
      const container = dashboardWeatherRef.value;
      if (container) {
        container.addEventListener('scroll', handleScroll);
      }
    });

    const handleScroll = () => {
      // Handle scroll event logic here
    };

    return {
      dashboardWeatherRef
    };
  },
}
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.dashboard{
  position: relative;
  padding: 20px;

  &-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-weather {
    overflow-y: auto;
    max-height: 600px; /* Adjust the max height as needed */
  }
}
</style>