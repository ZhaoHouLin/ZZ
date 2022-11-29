<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Menu from "./components/Menu.vue"
import About from "./views/About.vue"
// import Page3Vue from "./views/Page-3.vue"
// import Page4Vue from "./views/Page-4.vue"

import InfoText from "./components/InfoText.vue"
import Logo from "./components/Logo.vue"
import Ring from "./components/Ring.vue"
import InfoCrawl from "./components/InfoCrawl.vue"

const title = ["one", "two", "three", "four"]
</script>

<template lang="pug">
Menu
RouterView
</template>

<style lang="stylus">
colors = red green blue

body::-webkit-scrollbar
  display none
</style>
