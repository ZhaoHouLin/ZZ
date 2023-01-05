<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import InfoCrawl from "../components/InfoCrawl.vue"
import LineAnimation from "../components/LineAnimation.vue"
import PageHome from "../components/PageHome.vue"
import PageIntro from "../components/PageIntro.vue"
import PageResume from "../components/PageResume.vue"

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  gsap.defaults({ ease: "none" })

  const tl = gsap.timeline()

  tl.to(".page-home", { yPercent: -100, duration: 3 })
  tl.from(".page-intro", { yPercent: 100, duration: 3 }, "<")
  tl.from(
    ".page-intro .introduction",
    {
      yPercent: 200,
      opacity: 0,
      duration: 3,
      ease: "circ.out",
    },
    "<"
  )
  tl.to(".page-intro", { opacity: 0, duration: 3 })
  tl.from(
    ".page-resume",
    {
      xPercent: 100,
      duration: 5,
      opacity: 0,
    },
    "<"
  )
  // tl.to(".page-resume .box", {
  //   width: "100%",
  //   height: "100%",
  //   duration: 5,
  // })
  // tl.to(".page-resume", { yPercent: -100, duration: 15 })
  // tl.from(".page4", { yPercent: 100, duration: 15 }, "<")

  ScrollTrigger.create({
    animation: tl,
    trigger: ".about",
    pin: true,
    pinSpacing: true,
    scrub: 5,
    anticipatePin: 1,
  })
})
</script>

<template lang="pug">
.about
  PageHome.page
  PageIntro.page
  PageResume.page

</template>
<style lang="stylus" scoped>
.about
  position fixed      //手機版底部不會空白的關鍵
  size()
  flex()
  color #000
  background-color transparent
  // scroll-behavior smooth
.page
  size()
  position fixed
  top 0
  bottom 0
</style>
