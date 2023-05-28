<template>
  <div class="dashboard-info">
    <DashboardCountry/>
    <DashboardWeatherDay/>
  </div>
</template>
<script>
import DashboardCountry from "@/components/UI/DashboardCountry.vue";
import DashboardWeatherDay from "@/components/UI/DashboardWeatherDay.vue";


export default {
  name: "DashboardInfo",
  components: {
    DashboardWeatherDay,
    DashboardCountry,

  },

};
</script>

<style lang="scss">
@use "src/styles/variables" as var;

.dashboard-info {
  padding: 20px;
  background: var.$c106;
  width: 100%;
  height: 100vh;
}
</style>