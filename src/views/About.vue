<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
// import { TextPlugin } from "gsap/TextPlugin"

import InfoCrawl from "../components/InfoCrawl.vue"
import LineAnimation from "../components/LineAnimation.vue"
import SectionHome from "../components/SectionHome.vue"
import SectionIntro from "../components/SectionIntro.vue"
// import SectionFavorite from "../components/SectionFavorite.vue"
import Resume from "./Resume.vue"

import BackgroundLikeSnow from "../components/BackgroundLikeSnow.vue"
import BackgroundLikeNeon from "../components/BackgroundLikeNeon.vue"

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  gsap.defaults({ ease: "none" })

  // const t2tl = gsap.timeline().from(".section-intro .introduction p", {
  //   text: "",
  //   duration: 50,
  // })

  // jumpSection.value = ScrollTrigger.create({
  //   // animation: t2tl,
  //   trigger: "#test2",
  //   particlet: "top top",
  //   end: "bottom 70%",
  //   markers: 1,
  //   pin: true,
  //   scrub: true,
  // })

  // const sections = gsap.utils.toArray(".about .section")

  // gsap.to(sections, {
  //   yPercent: -100 * (sections.length - 1),
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: ".about",
  //     pin: true,
  //     particlet: "top top",
  //     scrub: 3,
  //     snap: {
  //       snapTo: 1 / (sections.length - 1),
  //       inertia: false,
  //       duration: { min: 1, max: 1 },
  //     },
  //   },
  // })

  const tl = gsap.timeline()

  tl.to(".section-home", { yPercent: -100, duration: 15 })

  // // ========== 自介頁面動畫設定 particlet ========== //
  tl.from(".section-intro", { yPercent: 100, duration: 5 })
  tl.from(".section-intro .introduction p", {
    text: "",
    duration: 50,
  })
  tl.to(".introduction", {
    xPercent: -100,
    opacity: 0,
    duration: 15,
    delay: 20,
  })
  tl.from(
    ".section-intro .section-resume",
    {
      xPercent: 100,
      opacity: 0,
      duration: 20,
    },
    "<"
  )
  tl.to(".section-intro", {
    yPercent: -100,
    opacity: 0,
    duration: 20,
    delay: 20,
  })
  tl.from(".test1", { yPercent: 100, opacity: 0, duration: 15 }, "<")
  // tl.from(".display-none", { xPercent: 100, opacity: 0, duration: 5 })
  // tl.to(".test1", { yPercent: -100, opacity: 1, duration: 5 }, "<")
  tl.to(".test1", { yPercent: -200, opacity: 1, duration: 15 })
  tl.from(".test2", { yPercent: -100, opacity: 1, duration: 15 }, "<")

  ScrollTrigger.create({
    animation: tl,
    trigger: ".about",
    pin: true,
    pinSpacing: true,
    scrub: 3,
    anticipatePin: 1,
    // snap: snapPoints,
    // markers: 1,
    end: "+=4000",
  })
})
</script>

<template lang="pug">
.about
  SectionHome.section
    
  SectionIntro.section
    //- Resume.section
  .test1.section
  //-   h1 test1 Title
  //-   .display-none
  .test2.section
  //-   h1 Test2 Title
  //- BackgroundLikeSnow
  BackgroundLikeNeon
  //- .bg 
  //-   - for(let i=1;i<=10;i++)
  //-     .particle
</template>
<style lang="stylus" scoped>
.about
  // position fixed      //手機版底部不會空白的關鍵
  size()
  color colorSecondary
  background-color transparent

.section
  size(,100vh)
  position absolute
  box-sizing border-box

.test1
  size()
  // background-color red
  background-color transparent

.test2
  size()
  // background-color yellow
  background-color transparent
</style>
