import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/About.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue")
    },
    // {
    //   path: "/portfolio",
    //   name: "portfolio",
    //   // component: () => import("../views/Page-1.vue"),
    // },
    // {
    //   path: "/favorite",
    //   name: "favorite",
    //   // component: () => import("../views/Page-1.vue"),
    // },
    // {
    //   path: "/contact",
    //   name: "contact",
    //   // component: () => import("../views/Page-1.vue")
    // },
  ],
})

export default router
