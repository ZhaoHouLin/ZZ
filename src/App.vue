<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Menu from "./components/Menu.vue"
import Page1Vue from "./views/Page-1.vue"
import Page3Vue from "./views/Page-3.vue"
import Page4Vue from "./views/Page-4.vue"

import InfoText from "./components/InfoText.vue"
import Logo from "./components/Logo.vue"
import Ring from "./components/Ring.vue"
import InfoCrawl from "./components/InfoCrawl.vue"

const title = ["one", "two", "three", "four"]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pages",
      pin: true,
      pinSpacing: true,
      // start: "top",
      // end: "bottom",
      // markers: true,
      scrub: 5,
    },
  })

  tl.to(".pages", { yPercent: "-100" })
  tl.to(".logo", { yPercent: "-100", opacity: 0 }, "<")
  tl.to(".info-text", { opacity: 0 }, "<")
  tl.to(".pages", { duration: 20, xPercent: "-100" })
})
</script>

<template lang="pug">
.pages
  Page1Vue(:title='title[0]')
  Page3Vue(:title='title[2]')
  //- Page4Vue(:title='title[3]')



InfoText
Logo
Menu

</template>

<style lang="stylus">
colors = red green blue

body::-webkit-scrollbar
  display none



.pages
  // position absolute
  position fixed
  size()
  flex(,,column)
  background-color transparent
  .page
    position absolute
    left 0
    right 0
    top 0
    bottom 0
</style>
