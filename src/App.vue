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

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.utils.toArray(".page").forEach((page, i) => {
    ScrollTrigger.create({
      trigger: page,
      start: "top top",
      pin: true,
      pinSpacing: false,
    })
  })
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
