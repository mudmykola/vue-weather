<template>
  <div class="dashboard-info">
    <DashboardCountry/>
    <DashboardWeatherDay/>
    <div>
      <DashboardWeatherWeek/>
    </div>

  </div>
</template>
<script>
import DashboardCountry from "@/components/UI/DashboardCountry.vue";
import DashboardWeatherDay from "@/components/UI/DashboardWeatherDay.vue";
import DashboardWeatherWeek from "@/components/UI/DashboardWeatherWeek.vue";

export default {
  name: "DashboardInfo",
  components: {
    DashboardWeatherDay,
    DashboardCountry,
    DashboardWeatherWeek,
  },


};
</script>

<style lang="scss">
@use "src/styles/variables" as var;

.dashboard-info {
  padding: 20px;
  background: var.$c106;
  width: 100%;

}
</style>