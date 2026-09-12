<script setup>
const { gsap } = useGsap()

const intro =
  "林炤后（ZhaoHou Lin）曾任職於文境資科前端工程師，不斷地追求網頁互動特效技術。目前就職於藍新資訊－疾管署專案工程師，擅長使用 Vue 3 前端網頁開發，以及解決電腦硬體相關問題。平時喜歡研究 3C 產品、汲取網頁程式相關新知、玩玩線上遊戲，偶而與朋友爬山⋯"
const chars = Array.from(intro)

const tags = ["FRONTEND ENGINEER", "VUE 3", "NUXT 4", "GSAP", "CSS ANIMATION", "100 DAYS CSS", "P5.JS"]
const marquee = [...tags, ...tags]

const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // 逐字隨捲動點亮（取代舊站 TextPlugin 打字機）
    // 只動 opacity：color 是字串 tween，120 個 span 每個捲動幀都要重組字串
    gsap.to(".intro-char", {
      opacity: 1,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: { trigger: ".intro-text", start: "top 75%", end: "bottom 40%", scrub: 0.6 },
    })
    gsap.from(".intro-head", {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: ".intro-head", start: "top 85%" },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.intro(ref="root")
  .marquee(aria-hidden="true")
    .marquee-track.is-outline
      span(v-for="(t, i) in marquee" :key="'a' + i") {{ t }}
    .marquee-track.is-reverse
      span(v-for="(t, i) in marquee" :key="'b' + i") {{ t }}
  .intro-body
    .intro-head
      span.intro-idx 01
      h2 About
    p.intro-text
      span.intro-char(v-for="(c, i) in chars" :key="i") {{ c }}
</template>

<style lang="stylus" scoped>
.intro
  position relative
  padding 4rem 0 8rem

.marquee
  overflow hidden
  border-top 1px solid colorLine
  border-bottom 1px solid colorLine
  padding 1rem 0

.marquee-track
  display flex
  gap 3rem
  width max-content
  font-family fontPixel
  font-size clamp(3rem, 8vw, 6rem)
  line-height 1
  white-space nowrap
  animation marquee 40s linear infinite
  span::after
    content '·'
    margin-left 3rem
    color colorAccent
  &.is-outline
    color transparent
    -webkit-text-stroke 1px colorSecondary
  &.is-reverse
    animation-direction reverse
    margin-top .5rem

@keyframes marquee
  to
    transform translateX(-50%)

.intro-body
  max-width 60rem
  margin 6rem auto 0
  padding 0 outlineSpace

.intro-head
  flex(flex-start,baseline)
  gap 1rem
  margin-bottom 2rem
  .intro-idx
    font-family fontDigital
    font-size 1.2rem
    color colorAccent
  h2
    font-family fontPixel
    font-size 3.5rem
    line-height 1
    font-weight 400
    text-transform uppercase

.intro-text
  font-size clamp(1.3rem, 2.4vw, 2rem)
  line-height 1.9
  letter-spacing .08em
  text-indent 2em
  font-weight 500
  .intro-char
    opacity .12

@media (max-width: breakMobile)
  .intro
    padding 2rem 0 5rem
  .intro-body
    margin-top 4rem
</style>
