<script setup>
import { onMounted, onUnmounted, ref } from "@vue/runtime-core"
import { useRoute, useRouter } from "vue-router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import Logo from "../components/Logo.vue"
import Ring from "../components/Ring.vue"
import InfoText from "../components/InfoText.vue"
import Menu from "../components/Menu.vue"
import InfoCrawl from "../components/InfoCrawl.vue"
import LineAnimation from "../components/LineAnimation.vue"

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  gsap.defaults({ ease: "none" })

  const tl = gsap.timeline()

  tl.to(".page1", { yPercent: -100, duration: 3 })
  tl.from(".page2", { yPercent: 100, duration: 3 }, "<")
  tl.to(".crawl1", {
    xPercent: -400,
    duration: 3,
  })
  tl.to(".crawl2", {
    xPercent: -300,
    duration: 18,
  })
  tl.to(".page2", {
    xPercent: -100,
    duration: 5,
  })
  tl.from(
    ".page3",
    {
      xPercent: 100,
      duration: 5,
    },
    "<"
  )
  tl.to(".page3 .box", {
    width: "100%",
    height: "100%",
    duration: 5,
  })
  tl.to(".page3", { yPercent: -100, duration: 15 })
  tl.from(".page4", { yPercent: 100, duration: 15 }, "<")

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
  .page.page1
    Logo
    Ring
    InfoText
  .page.page2
    InfoCrawl.crawl1(text='大家好~ ')
    InfoCrawl.crawl2(text='歡迎光臨!歡迎光臨!歡迎光臨!歡迎光臨!歡迎光臨!歡迎光臨!')
    LineAnimation
  .page.page3
    .box
  .page.page4

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


.page2
  background-color transparent
  flex(,,column)
  // border-top 1px solid #000
  // border-bottom 1px solid #000

.page3
  background-color orange
  .box
    box-sizing border-box
    size(100px)
    border 3px solid #000
.page4
  background-color yellow
</style>
