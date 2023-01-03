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
  tl.from(
    ".page2 .introduction",
    {
      yPercent: 200,
      opacity: 0,
      duration: 3,
      ease: "circ.out",
    },
    "<"
  )
  // tl.to(".crawl1", {
  //   xPercent: -400,
  //   duration: 18,
  //   ease: "power1.out",
  // })
  // tl.to(".crawl2", {
  //   xPercent: -400,
  //   duration: 18,
  //   ease: "slow(0.7, 0.7, false)",
  // })
  // tl.to(".crawl3", {
  //   xPercent: -400,
  //   duration: 18,
  //   ease: "steps(10)",
  // })
  // tl.to(
  //   ".crawl4",
  //   {
  //     xPercent: -400,
  //     duration: 18,
  //     ease: "steps(12)",
  //   },
  //   "<"
  // )

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
  // tl.to(".page3 .box", {
  //   width: "100%",
  //   height: "100%",
  //   duration: 5,
  // })
  // tl.to(".page3", { yPercent: -100, duration: 15 })
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
  .page.page1
    Logo
    Ring
    InfoText
  .page.page2
    //- LineAnimation
    //- InfoCrawl.crawl1(text='大家好~ ')
    //- InfoCrawl.crawl2(text='我叫林炤后')
    //- InfoCrawl.crawl3(text='生於')
    //- InfoCrawl.crawl4(text='zz')
    //- .avatar
    .introduction
      p 林炤后(ZhaoHou Lin)曾任職於文境資科前端工程師，不斷地追求網頁互動特效技術。目前就職於藍新資訊-疾管署專案工程師，擅長使用Vue3前端網頁開發，以及解決電腦硬體相關問題。
      p 平時喜歡研究3C產品、汲取網頁程式相關新知、玩玩線上遊戲，偶而與朋友爬山...

  .page.page3
    .resume 
      .work-experience 
        h1.title 工作經歷
        .experience
          .now
            span 2019-01 ~ 仍在職
            h3 藍新資訊股份有限公司
            h4 專案工程師
            p 疾病管制署駐點電腦相關維護
          .past 
            span 2022-05 ~ 2022-08
            h3 文境資科股份有限公司
            h4 前端工程師
            p 前端頁面切版、與後端API介接

      .education
        h1.title 學習經歷
        .experience
          .now
            span 2018-08 
            h3 Alpha Camp 
          .past
            span 2008-09 ~ 2012-06 
            h3 國立臺北科技大學
            h4 光電工程系 學士
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
  flex()
  // .avatar
  //   size(30%,300px)
  //   border 1px solid #000
  .introduction
    flex(,,column)
  .introduction p
    size(80%,auto)
    fontStyle()
.page3
  flex()
  .resume
    flex(,,column)
    size(80%,auto)
    .work-experience,.education
      size()
      flex(,flex-start,column)
      margin 1rem 0

      .experience
        size()
        flex(space-around,,)
        padding 1rem
        line-height 1.6rem
      .experience .now,.past
        size(40%,100%)



.page4
  // background-color yellow

@media screen and (max-width: 768px)
  .page2 .introduction p
    fontStyle(1.4rem)
  .page3 .resume
    .work-experience,.education
      .experience
        flex(,,column)
        .now,.past
          size()
        .now
          margin-bottom 1rem
</style>
