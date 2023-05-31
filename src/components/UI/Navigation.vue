<template>
  <div class="navigation">
    <div class="navigation-menu">
      <ul>
        <li v-for="(menuItem, index) in menuItems" :key="index">
          <div class="menu-item" v-if="menuItem">
            <svg-icon
                type="mdi"
                :path="menuItem.path"></svg-icon>
            <router-link :to="menuItem.url" :class="{ active: menuItem.active }">
              {{ menuItem.title }}
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHomeOutline } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Головна',
          url: '/',
          path: mdiHomeOutline,
          active: false,
        },

      ],
    };
  },
  mounted() {
    const currentURL = this.$route.path;
    this.menuItems.forEach(menuItem => {
      if (menuItem.url === currentURL) {
        menuItem.active = true;
      } else {
        menuItem.active = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/variables" as var;
.navigation {
  margin-top: 60px;

  &-menu {
    li + li {
      padding-top: 20px;
    }
  }
}
.menu-item {
  display: flex;
  align-items: center;
  color: var.$c102;
  a {
    font-size: 18px;
    line-height: 30px;
    font-weight: var.$font-m;
    margin-left: 10px;
    color: var.$c102;
    cursor: pointer;
  }
}
// 768

@media (max-width: 768px) {
  .navigation{
    margin-top: 20px;
  }
}

// 600
@media (max-width: 600px) {
  .navigation{
    margin-top: 20px;
  }
}

// 480
@media (max-width: 480px) {
  .navigation{
    margin-top: 20px;
  }
}

// 320
@media (max-width: 320px) {
  .navigation{
    margin-top: 20px;
  }
}
</style>