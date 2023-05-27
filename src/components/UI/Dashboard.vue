<template>
  <div class="dashboard ">
    <div class="container-848">
      <div class="dashboard-box ">
        <DashboardDate/>
        <DashboardSearch/>
      </div>
      <div class="dashboard-weather">
        <DashboardWeather />
      </div>
    </div>



  </div>
</template>

<script>
import DashboardDate from "@/components/UI/DashboardDate.vue";
import DashboardSearch from "@/components/UI/DashboardSearch.vue";
import DashboardWeather from "@/components/UI/DashboardWeather.vue";

export default {
  name: "Dashboard",
  components: {DashboardWeather, DashboardDate, DashboardSearch},

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
}
</style>