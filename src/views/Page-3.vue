<script setup>
import { onMounted } from "@vue/runtime-core"
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
      trigger: ".page-3",
      pin: true,
      // markers: true,
      start: "top bottom",
      end: "top top",
      scrub: 15,
    },
  })

  tl.to(".page-3 .info-crawl .title", { xPercent: "300" })
})
</script>

<template lang="pug">
.page.page-3
  h1 {{props.title}} 
  LineAnimation
  InfoCrawl(text='test')
</template>
<style lang="stylus" scoped>
.page-3
  flex()
  size(300%,100%)
  background-color #fff
  transform translate(0%,100%)
  .info-crawl
    top 0
</style>
