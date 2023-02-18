<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Logo from "./Logo.vue"
import Ring from "./Ring.vue"
import InfoText from "./InfoText.vue"

const homepage = ref()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ duration: 1 })
  const tl = gsap.timeline()

  tl.to(".section-home .logo", { yPercent: -100, duration: 5 }, "<")
  tl.to(
    ".section-home .ring",
    {
      yPercent: -50,
      transformOrigin: "100% 100%",
      transform: "scale(2)",
      duration: 15,
    },
    "<"
  )
  tl.to(".section-home .info-text", { yPercent: -50, duration: 15 }, "<")

  ScrollTrigger.create({
    animation: tl,
    scrub: 3,
  })
})
</script>

<template lang="pug">
.section-home(ref='homepage')
  Logo
  Ring
  InfoText
</template>

<style lang="stylus" scoped>
.section-home
  flex()
  position absolute
</style>
