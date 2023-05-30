<template>
  <div class="dashboard">
    <div class="container-848">
      <div class="dashboard-box">
        <DashboardDate/>
        <DashboardSearch/>
      </div>
      <div class="dashboard-weather" >
        <DashboardWeather  />
        <DashboardChart/>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardDate from "@/components/UI/DashboardDate.vue";
import DashboardSearch from "@/components/UI/DashboardSearch.vue";
import DashboardWeather from "@/components/UI/DashboardWeather.vue";
import DashboardChart from "@/components/UI/DashboardChart.vue";

export default {
  name: "Dashboard",
  components: { DashboardChart, DashboardWeather, DashboardDate, DashboardSearch },
  }
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;

.dashboard {
  position: relative;
  padding: 20px;

  &-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-weather {
    overflow-y: auto;
    max-height: 600px;
    transition: opacity 0.5s ease;
  }
}
</style>