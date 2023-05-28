<template>
  <div class="favorites">
    <div >
      <FavoritesContent/>
    </div>

  </div>
</template>

<script>
import FavoritesContent from "@/components/UI/FavoritesContent.vue";
export default {
  name: "Favorites",
  components: {FavoritesContent},
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