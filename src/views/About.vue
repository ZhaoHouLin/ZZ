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

const pageOne = () => {
  console.log(document.body.scrollHeight, document.body.offsetHeight)
  console.dir(document.body)
  // gsap.to(".about", { duration: 2, yPercent: 0, xPercent: 0 })
  gsap.to(window, {
    // duration: 2,
    scrollTo: { x: "#section2", y: "#section2" },
  })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  gsap.defaults({ ease: "none" })

  const tl = gsap.timeline()

  tl.to(".page1", { yPercent: -100 })
  tl.from(".page2", { yPercent: 100 }, "<")
  tl.to(".crawl1", {
    xPercent: -200,
    // duration: 5,
  })
  tl.to(".crawl2", {
    xPercent: -200,
    // duration: 5,
  })
  tl.to(".page2", {
    xPercent: -100,
    // duration: 5,
  })
  tl.from(
    ".page3",
    {
      xPercent: 100,
      // duration: 5,
    },
    "<"
  )
  tl.to(".page3 .box", { width: "100%", height: "100%" })
  tl.to(".page3", { yPercent: -100 })
  tl.from(".page4", { yPercent: 100 }, "<")

  ScrollTrigger.create({
    animation: tl,
    trigger: ".about",
    pin: true,
    pinSpacing: true,
    scrub: 2,
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
    InfoCrawl.crawl1(text='Hello Hello Hello Hello Hello Hello Hello Hello ')
    InfoCrawl.crawl2(text='World World World World World World World World ')
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
    size(100px)
    border 1px solid #000
.page4
  background-color yellow
</style>
