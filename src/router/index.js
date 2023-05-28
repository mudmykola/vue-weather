import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorite from "../views/Favorite.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    },

    {
      path: "/:catchAll(.*)",
      name: "noRoute",
      component: () => import("../views/ErrorPage.vue"),
    },

  ]
})

export default router