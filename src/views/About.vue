<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Logo from "../components/Logo.vue"
import Ring from "../components/Ring.vue"
import InfoText from "../components/InfoText.vue"
import Menu from "../components/Menu.vue"
import InfoCrawl from "../components/InfoCrawl.vue"

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      pin: true,
      pinSpacing: true,
      // start: "top",
      // end: "bottom",
      // markers: true,
      scrub: 5,
    },
  })

  tl.to(".about", { duration: 5, yPercent: "-100" })
  tl.to(".logo", { duration: 5, yPercent: "-100", opacity: 0 }, "<")
  tl.to(".info-text", { opacity: 0 }, "<")

  tl.to(".about", { duration: 5, xPercent: "-100" }) //page-2
  tl.to(
    ".info-crawl",
    {
      duration: 10,
      xPercent: "300",
    },
    "<"
  )
  tl.to(".about", { yPercent: "-200" })
})
</script>

<template lang="pug">
.about
  Logo
  Ring
  InfoText
  .page.page1
  .page.page2
    InfoCrawl(text='Hello Hello Hello Hello Hello Hello Hello Hello ')
    InfoCrawl(text='World World World World World World World World ' style='transform: translateX(-120%)')
  .page.page3

</template>
<style lang="stylus" scoped>
.about
  position fixed
  // pos()
  // transform translate(-50%,-50%)
  size()
  flex()
  color #000
  background-color transparent

.page
  size()
  position absolute
  top 0
.page1
  height 100%
  background-color #222
  transform translateY(100%)
  z-index 2
.page2
  height 100%
  background-color red
  transform translate(100%,100%)
  // position relative

  .info-crawl:nth-child(1)
    top 1rem
  .info-crawl:nth-child(2)
    bottom 1rem

.page3
  height 100%
  background-color orange
  transform translate(100%,200%)
</style>
