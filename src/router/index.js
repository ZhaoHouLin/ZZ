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
    component: () => import("../views/Page-4.vue"),
  },
  // {
  //   path: "/contact",
  //   name: "contact",
  //   // component: () => import("../views/Page-1.vue")
  // },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.fullPath == '/about') {
      console.log(savedPosition)
      return savedPosition
    }
    if (to.hash == '#section-one') {
      // console.log('to.hash', to.hash)
      return {
        el: to.hash,
        top: -window.innerHeight
      }
    } else {
      return to.path
    }
  },
})

export default router
