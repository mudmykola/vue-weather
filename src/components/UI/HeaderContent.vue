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
</style>