<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

onMounted(() => {})
</script>

<template lang="pug">
.section-resume
  .line
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
          h4 學期一、二
        .past
          span 2008-09 ~ 2012-06 
          h3 國立臺北科技大學
          h4 光電工程系 學士
</template>

<style lang="stylus" scoped>
.section-resume
  // position fixed
  position absolute
  size(,100vh)
  background-color colorPrimary
  color colorSecondary
  flex()
  .line
    position absolute
    right outlineSpace + 1rem
    size(1px,80vh)
    background-color colorSecondary
  .resume
    // border 1px solid #fff
    flex(,,column)
    size(60%,auto)
    .work-experience
      margin-bottom 1rem
    .work-experience,.education
      size()
      flex(,flex-start,column)
      // margin 1rem 0
      .experience
        size()
        flex(space-around,,)
        padding 1rem
        line-height 1.6rem
      .experience .now,.past
        size(40%,100%)
        // flex(space-between,flex-start,column)
        // border 1px solid #fff
        span
          opacity 0.7
        h3
          font-weight 900
          margin-top 0.5rem
        h4
          font-weight 700
          opacity 0.7
          margin-bottom 0.5rem

@media screen and (max-width: 768px)
  .section-resume .resume
    width 80%
    .work-experience,.education
      .experience
        flex(,,column)
        .now,.past
          size()
        .now
          margin-bottom 1rem
</style>
