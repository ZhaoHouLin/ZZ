// import { selector } from "gsap"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      keepAlive: true,
    },
    component: () => import("../views/About.vue")
  },
  {
    path: "/about",
    name: "about",
    meta: {
      keepAlive: true,
    },
    component: () => import("../views/About.vue")
  },
  {
    path: "/resume",
    name: "resume",
    meta: {
      keepAlive: true,
    },
    component: () => import("../views/Resume.vue"),
  },
  {
    path: "/portfolio",
    name: "portfolio",
    meta: {
      keepAlive: true,
    },
    component: () => import("../views/Portfolio.vue"),
  },
  {
    path: "/favorite",
    name: "favorite",
    meta: {
      keepAlive: true,
    },
    component: () => import("../views/Favorite.vue"),
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (to.fullPath == '/about') {
  //     return { top: 0 }
  //   }
  //   // if (to.fullPath == '/portfolio') {
  //   //   return savedPosition || { top: 0 }
  //   // }

  // },
})

export default router
