<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

import InfoCrawl from "../components/InfoCrawl.vue"
import LineAnimation from "../components/LineAnimation.vue"
import SectionHome from "../components/SectionHome.vue"
import SectionIntro from "../components/SectionIntro.vue"
// import SectionResume from "../components/SectionResume.vue"
// import SectionFavorite from "../components/SectionFavorite.vue"

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)
  gsap.defaults({ ease: "none" })

  const tl = gsap.timeline()

  tl.to(".section-home", { yPercent: -100, duration: 3 })
  // ========== 自介頁面動畫設定 Start ========== //
  tl.from(".section-intro", { yPercent: 100, duration: 1 }, "<")
  // tl.from(".section-intro .introduction", {
  //   yPercent: 100,
  //   opacity: 0,
  //   duration: 10,
  //   ease: "circ.out",
  // })
  tl.from(".section-intro .introduction p", {
    text: "",
    duration: 20,
  })

  ScrollTrigger.create({
    animation: tl,
    trigger: ".about",
    pin: true,
    pinSpacing: true,
    scrub: 3,
    // anticipatePin: 1,
  })
})
</script>

<template lang="pug">
.about
  SectionHome.section
  SectionIntro.section
</template>
<style lang="stylus" scoped>
.about
  position fixed      //手機版底部不會空白的關鍵
  size()
  flex()
  color colorSecondary
  background-color colorPrimary
  // scroll-behavior smooth
.section
  size()
  position fixed
  top 0
  bottom 0
</style>
