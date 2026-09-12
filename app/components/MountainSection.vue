<script setup>
// 原 Favorite 頁的滿版開場：山脊線 + 對聯。一頁式後改為捲到時才進場
const { gsap } = useGsap()
const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap
      .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: root.value, start: "top 60%" } })
      .from(".couplet h2", { yPercent: 30, opacity: 0, duration: 1.4, stagger: 0.2 })
      .from(".mtn-kicker", { opacity: 0, x: -20, duration: 0.8 }, "-=0.8")
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.mountain#mountain(ref="root")
  ClientOnly
    RidgeLines
  .mtn-kicker
    span.mtn-idx 05
    span 山 / Mountain
  .couplet
    h2 走路要找難路走
    h2 挑擔要揀重擔挑
</template>

<style lang="stylus" scoped>
.mountain
  position relative
  size(100%,100vh)
  min-height 600px
  overflow hidden
  flex()

.mtn-kicker
  position absolute
  top 8rem
  left outlineSpace
  flex(flex-start,baseline)
  gap 1rem
  font-family fontDigital
  font-size 1.2rem
  letter-spacing .2em
  color colorMuted
  .mtn-idx
    color colorAccent

.couplet
  position relative
  flex(center,flex-start,row-reverse)
  gap 3rem
  h2
    writing-mode vertical-lr
    font-size clamp(1.8rem, 5vh, 3.4rem)
    font-weight 900
    letter-spacing .45em
    line-height 1
    background-image linear-gradient(180deg, colorSecondary 0%, colorSecondary 55%, colorAccent 100%)
    -webkit-background-clip text
    background-clip text
    -webkit-text-fill-color transparent
    &:nth-child(1)
      margin-top -4rem
    &:nth-child(2)
      margin-top 4rem

@media (max-width: breakMobile)
  .couplet
    gap 1.5rem
    h2
      &:nth-child(1)
        margin-top -3rem
      &:nth-child(2)
        margin-top 3rem
  .mtn-kicker
    top 6rem
</style>
