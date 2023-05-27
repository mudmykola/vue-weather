<template>
<div class="header">
  <div >
    <HeaderContent/>
  </div>

</div>
</template>

<script>
import HeaderContent from "@/components/UI/HeaderContent.vue";
export default {
  name: "TheHeader",
  components: {HeaderContent},
}
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
// 768

@media (max-width: 1920px) {

}

// 600
@media (max-width: 600px) {

}

// 480
@media (max-width: 480px) {

}

// 320
@media (max-width: 320px) {

}
</style>