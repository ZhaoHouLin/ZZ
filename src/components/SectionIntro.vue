<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

onMounted(() => {})
</script>

<template lang="pug">
.section-intro
  .introduction
    p 林炤后(ZhaoHou Lin)曾任職於文境資科前端工程師，不斷地追求網頁互動特效技術。目前就職於藍新資訊-疾管署專案工程師，擅長使用Vue3前端網頁開發，以及解決電腦硬體相關問題。平時喜歡研究3C產品、汲取網頁程式相關新知、玩玩線上遊戲，偶而與朋友爬山...
</template>

<style lang="stylus" scoped>
.section-intro
  // background-color transparent
  background-color colorPrimary
  flex()
  .introduction
    // position absolute
    size()
    flex(,,column)
  .introduction p
    size(60%,auto)
    fontStyle()

@media screen and (max-width: 768px)
  .section-intro .introduction p
    width 80%
    fontStyle(1.4rem)
</style>
