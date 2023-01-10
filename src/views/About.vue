<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

import InfoCrawl from "../components/InfoCrawl.vue"
import LineAnimation from "../components/LineAnimation.vue"
import PageHome from "../components/PageHome.vue"
import PageIntro from "../components/PageIntro.vue"
import PageResume from "../components/PageResume.vue"

import FacebookAlbum from "../data/FacebookAlbum.json"

const album = ref(FacebookAlbum)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)
  gsap.defaults({ ease: "none" })

  const tl = gsap.timeline()

  tl.to(".page-home", { yPercent: -100, duration: 3 })
  // ========== 自介頁面動畫設定 Start ========== //
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
  tl.from(".page-intro .introduction p", {
    text: "",
    ease: "power1.in",
    duration: 10,
    delay: 2,
  })
  tl.to(".page-intro", { opacity: 0, duration: 3, delay: 3 })
  // ========== 履歷頁面動畫設定 Start ========== //
  tl.from(
    ".page-resume",
    {
      xPercent: 100,
      duration: 5,
      opacity: 0,
      delay: 3,
    },
    "<"
  )
  // tl.from(".page-resume .resume .now", {
  //   xPercent: 100,
  //   duration: 5,
  //   opacity: 0,
  //   stagger: 0.2,
  // })
  // tl.from(
  //   ".page-resume .resume .past",
  //   {
  //     xPercent: 100,
  //     duration: 5,
  //     opacity: 0,
  //   },
  //   "<"
  // )
  tl.from(".page-resume .line", {
    yPercent: 100,
    duration: 5,
    opacity: 0,
  })
  tl.to(".page-resume", {
    yPercent: -100,
    duration: 5,
    opacity: 0,
  })

  // ========== 興趣頁面動畫設定 Start ========== //
  tl.from(
    ".page.page-favorite",
    {
      yPercent: 100,
      duration: 5,
      opacity: 0,
    },
    "<"
  )
  tl.to(".page.page-favorite .sport .pic", {
    width: "100%",
    height: "100%",
    duration: 5,
    delay: 2,
  })
  tl.from(".page.page-favorite .sport .couplet h2", {
    backgroundImage: "linear-gradient(45deg,#222 200%,#fff 100%,#222 300%)",
    yPercent: 125,
    opacity: 0,
    stagger: 2,
    duration: 10,
    delay: 2,
    // yoyo: true,
  })
  tl.to(".page.page-favorite", {
    yPercent: -100,
    duration: 5,
    opacity: 0,
    delay: 3,
  })

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
  .page.page-favorite
    .sport
      .couplet
        h2 走路要找難路走
        h2 挑擔要揀重擔挑
      .pic
    .Games
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

.page.page-favorite
  // background-color #eee
  // position relative
  .sport .couplet
    size(auto,100%)
    position absolute
    left 10%
    flex(,,row-reverse)
    // border 1px solid #000

  .sport .couplet h2
    // z-index 2
    -webkit-writing-mode vertical-lr
    writing-mode vertical-lr
    background-image linear-gradient(45deg,#222 -200%,#fff -100%,#222 0%)
    -webkit-background-clip text
    background-clip text
    -webkit-text-fill-color transparent
    text-fill-color transparent
    margin 0 1rem
    font-size 3rem
    letter-spacing 1rem
    &:nth-child(1)
      margin-top -8rem
    &:nth-child(2)
      margin-bottom -8rem
  .sport .pic
    size(100%,400px)
    position absolute
    bottom outlineSpace
    right outlineSpace
    // border 1px solid #000
    transform-origin 100% 100%
    background url('https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.6435-9/107600357_10214009046854001_7560704228675992564_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=0debeb&_nc_ohc=2Bj1brtHxzwAX8aFbTo&_nc_ht=scontent.ftpe8-1.fna&oh=00_AfBKoqHkt34nnsy_qXi9aCPSgygAKC_i_mnsfFD030kBjw&oe=63E0746B') no-repeat
    background-position right bottom
    background-size contain
    background-color transparent


@media screen and (max-width: 1200px)
  .page.page-favorite
    .sport .couplet
      display none
</style>
