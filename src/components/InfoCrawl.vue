<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const props = defineProps({
  text: String,
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.to(
    ".info-crawl",
    {
      scrollTrigger: ".info-crawl",
      duration: 10,
      xPercent: "200",
    },
    "<"
  )
})
</script>

<template lang="pug">

h1.info-crawl {{props.text}}
</template>

<style lang="stylus" scoped>
.info-crawl
  width 100%
  position absolute
  background-color transparent
  z-index 2
  transform translateX(-100%)
  font-size 2rem
</style>
