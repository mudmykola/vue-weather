<template>
  <div class="header-aside__content">
    <div class="header-aside__content--logo">
      <h1>
        {{
          logoIcon
        }}
      </h1>
      <a :href="url">{{
          logo
        }}</a>
    </div>
    <Navigation/>
  </div>
</template>

<script>
import Navigation from "@/components/UI/Navigation.vue";
export default {
  name: "HeaderAsideContent",
  components: {
    Navigation,
  },
  props: {
    logoIcon: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
      url: '/',
    }


  }
}
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;

.header-aside__content {
  padding: 20px;
  color: var.$c101;
  width: 350px;
  height: 100vh;
  background: var.$c100;

  &--logo {
    display: flex;
align-items: center;
    h1 {
      font-size: 30px;
      color: var.$default;
      font-weight: var.$font-sb;
      background: var.$c102;
      border-radius: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
    }

    a {
      color: var.$c102;
      font-weight: var.$font-b;
      font-size: 25px;
      line-height: 30px;
      margin-left: 10px;
      cursor: pointer;
    }
  }


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