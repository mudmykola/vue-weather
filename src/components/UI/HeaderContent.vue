<template>
  <div class="header-content">
    <HeaderAside/>
    <Dashboard/>
    <DashboardInfo/>
  </div>
</template>

<script>
import HeaderAside from "@/components/UI/HeaderAside.vue";
import Dashboard from "@/components/UI/Dashboard.vue";
import DashboardInfo from "@/components/UI/DashboardInfo.vue";

export default {
  components: {DashboardInfo, Dashboard, HeaderAside}

};
</script>


<style lang="scss" scoped>
@use "src/styles/variables" as var;
.header-content{
  display: flex;
}

// 768

@media (max-width: 768px) {
  .header-content{
    flex-direction: column;
  }
}

// 600
@media (max-width: 600px) {
  .header-content{
    flex-direction: column;
  }
}

// 480
@media (max-width: 480px) {
  .header-content{
    flex-direction: column;
  }
}

// 320
@media (max-width: 320px) {
.header-content{
  flex-direction: column;
}
}
</style>