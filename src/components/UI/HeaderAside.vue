<template>
  <div class="header-aside">
    <HeaderAsideContent :logoIcon="logoIcon" :logo="logo"/>
  </div>
</template>

<script>
import HeaderAsideContent from "@/components/UI/HeaderAsideContent.vue";

export default {
  name: "HeaderAside",
  components: {HeaderAsideContent},
  props: {
    logoIcon: {
      type: String,
      required: true,
      default: 'W',

    },
    logo: {
      type: String,
      required: true,
      icon: 'W',
      default: 'Weather'
    }
  }
}
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.header-aside{
  color: var.$c101;
}
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