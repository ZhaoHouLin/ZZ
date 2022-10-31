<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Menu from "./components/Menu.vue"
import Page1Vue from "./views/Page-1.vue"
import Page2Vue from "./views/Page-2.vue"
import Page3Vue from "./views/Page-3.vue"
import Page4Vue from "./views/Page-4.vue"

import InfoText from "./components/InfoText.vue"
import Logo from "./components/Logo.vue"
import Ring from "./components/Ring.vue"

const title = ["one", "two", "three", "four"]

const counter = ref(0)

const changePage = (num) => {
  counter.value = num
  // console.log(num);
}

const pageStyle = computed(() => {
  return {
    transform: `translateX(${counter.value * -100}vw)`,
  }
})

onMounted(() => {
  // window.addEventListener("scroll", handleScroll);
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    // yes, we can add it to an entire timeline!
    scrollTrigger: {
      trigger: ".pages",
      pin: true, // pin the trigger element while active
      // pinSpacing: false,
      // start: "top", // when the top of the trigger hits the top of the viewport
      // end: "bottom", // end after scrolling 500px beyond the start
      // markers: true,
      scrub: 3, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
  })
  // tl.to(".page-1", { yPercent: "-100" })
  // tl.to(".page-2", { yPercent: "-100" }, "<")
  tl.to(".pages", { yPercent: "-100" })
  tl.to(".pages", { xPercent: "-100" })
  // tl.to(".pages", { xPercent: "-200" })
})
</script>

<template lang="pug">
.pages
  Page1Vue(:title='title[0]')
  Page2Vue(:title='title[1]')
  Page3Vue(:title='title[2]')
  //- Page4Vue(:title='title[3]')
  
InfoText
Logo
Ring
Menu

</template>

<style lang="stylus">
colors = red green blue

body::-webkit-scrollbar
  display none



.pages
  position absolute
  size(,100%)
  flex(,,column)
  background-color transparent
</style>
