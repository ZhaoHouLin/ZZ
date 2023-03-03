<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Logo from "./Logo.vue"
import Ring from "./Ring.vue"
import InfoText from "./InfoText.vue"
import BackgroundLikeNeon from "./BackgroundLikeNeon.vue"

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ duration: 1 })
  const tl = gsap.timeline()

  tl.to(".section-home .logo", { yPercent: -200, opacity: 0, duration: 5 }, "<")
  tl.to(
    ".section-home .ring",
    {
      yPercent: 100,
      opacity: 0,
      duration: 7,
    },
    "<"
  )
  tl.to(
    ".section-home .ring #ring",
    {
      // yPercent: -50,
      // transformOrigin: "100% 100%",
      transformOrigin: "50% 50%",
      transform: "scale(2)",
      duration: 7,
    },
    "<"
  )
  tl.to(
    ".section-home .info-text",
    { yPercent: -50, opacity: 0, duration: 15 },
    "<"
  )

  ScrollTrigger.create({
    animation: tl,
    scrub: 3,
  })
})
</script>

<template lang="pug">
.section-home
  Logo
  Ring
  InfoText
  //- BackgroundLikeNeon
</template>

<style lang="stylus" scoped>
.section-home
  flex()
  position absolute
</style>
