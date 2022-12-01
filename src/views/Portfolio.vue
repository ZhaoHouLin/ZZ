<script setup>
import { onMounted, onUnmounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LineAnimation from "../components/LineAnimation.vue"
import InfoCrawl from "../components/InfoCrawl.vue"

const props = defineProps({
  title: String,
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".portfolio",
      pin: true,
      pinSpacing: true,
      scrub: 5,
    },
  })
  tl.to(".portfolio", { duration: 5, xPercent: "-100" })
})

onUnmounted(() => {})
</script>

<template lang="pug">
.portfolio
  h1 portfolio
  //- LineAnimation
  //- InfoCrawl(text='test')
</template>
<style lang="stylus" scoped>
.portfolio
  z-index 1
  position fixed
  flex()
  size(100%,100vh)
  background-color yellow
</style>
