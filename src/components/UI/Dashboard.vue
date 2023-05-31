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
// 1200

@media (max-width: 1200px) {
  .container-848{
    width: 100%;

  }
  .dashboard{
    width:100%;
    margin: 0 auto;

    &-box{
      width: 100%;

    }
  }
}
// 768
@media (max-width: 768px) {
  .container-848{
    width: 100%;

  }
  .dashboard{
    width:100%;
    margin: 0 auto;

    &-box{
      width: 100%;

    }
  }
}

// 600
@media (max-width: 600px) {
  .container-848{
    width: 100%;

  }
  .dashboard{
    width:100%;
    margin: 0 auto;

    &-box{
      width: 100%;

    }
  }
}

// 480
@media (max-width: 480px) {
  .container-848{
    width: 100%;

  }
  .dashboard{
    width:100%;
    margin: 0 auto;

    &-box{
      width: 250px;
      flex-direction: column;
    }
  }
}

// 320
@media (max-width: 320px) {
  .container-848{
    width: 100%;

  }
.dashboard{
  width: 100%;
  margin: 0 auto;

  &-box{
    width: 100%;
    flex-direction: column;
  }
}
}
</style>