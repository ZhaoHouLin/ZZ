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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      pin: true,
      pinSpacing: true,
      scrub: 5,
    },
  })

  tl.to(".page1", { duration: 5, yPercent: -100 })
  tl.from(".page2", { duration: 5, yPercent: 100 }, "<")
  tl.to(".page2", { duration: 5, xPercent: -100 })
  tl.from(".page3", { duration: 5, xPercent: 100 }, "<")
})
</script>

<template lang="pug">

.about
  .page.page1#section1
    //- button(@click="pageOne") test
    Logo
    Ring
    InfoText
  .page.page2#section2
    //- InfoCrawl(text='Hello Hello Hello Hello Hello Hello Hello Hello ')
    //- InfoCrawl(text='World World World World World World World World ' style='transform: translateX(-120%)')
    h1 test

  .page.page3#section3

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
  background-color red
  // transform translate(0,100%)
  // transform translate(100%,0)

  .info-crawl:nth-child(1)
    top 1rem
  .info-crawl:nth-child(2)
    bottom 1rem

.page3
  background-color orange
  // transform translate(100%,100%)
  // transform translate(0,200%)
  // transform translate(200%,0%)
</style>
