<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Test from "./components/test.vue"
import Page1Vue from "./views/Page-1.vue"
import Page2Vue from "./views/Page-2.vue"
import Page3Vue from "./views/Page-3.vue"

const title = ["one", "two", "three"]

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
      trigger: ".wrapper",
      pin: true, // pin the trigger element while active
      // start: "top", // when the top of the trigger hits the top of the viewport
      // end: "bottom", // end after scrolling 500px beyond the start
      markers: true,
      scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    },
  })
  tl.to(".pages", { xPercent: "-200" })
})
</script>

<template lang="pug">

.wrapper
  .pages
    Page1Vue(:title='title[0]')
    Page2Vue(:title='title[1]')
    Page3Vue(:title='title[2]')
  
  

Test(@turn='changePage')

</template>

<style lang="stylus">
colors = red green blue

body::-webkit-scrollbar
  display none

.wrapper
  size()
  .pages
    position relative
    size(,100vh)
    flex()
    background-color transparent
    .page
      size(,100vh)
      position absolute
</style>
