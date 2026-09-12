<script setup>
// 原 Favorite 頁的滿版開場：山脊線 + 對聯。一頁式後改為捲到時才進場
const { gsap } = useGsap()
const root = ref(null)
const photoSrc = `${useRuntimeConfig().app.baseURL}mountain.jpg` // 綁定而非靜態 src；要帶 baseURL，GitHub Pages 部署在 /ZZ/ 底下
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap
      .timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: root.value, start: "top 60%" },
      })
      .from(".couplet h2", {
        yPercent: 30,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
      })
      .from(
        ".mtn-kicker, .mtn-note",
        { opacity: 0, x: -20, duration: 0.8, stagger: 0.1 },
        "-=0.8",
      )

    // 背景照片捲動視差：照片放大 1.2 倍，跟著捲動上移，只動 transform
    gsap.fromTo(
      ".mtn-photo",
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.value,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    )
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.mountain#mountain(ref="root")
  img.mtn-photo(:src="photoSrc" alt="" loading="lazy" aria-hidden="true")
  .mtn-shade
  ClientOnly
    RidgeLines
  .mtn-kicker
    span.mtn-idx 06
    span 山 / Mountain
  .couplet
    h2 我命由我不由天
    //- h2 走路要找難路走
    //- h2 挑擔要揀重擔挑
  .mtn-note 2025 · 考照時的體會
</template>

<style lang="stylus" scoped>
.mountain
  position relative
  size(100%,100vh)
  min-height 600px
  overflow hidden
  flex()

// 背景照片：放大留視差空間；上方壓暗讓對聯可讀，上下緣漸黑接回頁面底色
.mtn-photo
  position absolute
  inset 0
  size()
  object-fit cover
  object-position center 40%
  transform scale(1.2)
  will-change transform
  pointer-events none

.mtn-shade
  position absolute
  inset 0
  pointer-events none
  background linear-gradient(180deg, colorPrimary 0%, rgba(5,5,5,.55) 25%, rgba(5,5,5,.55) 70%, colorPrimary 100%)

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

.mtn-note
  position absolute
  bottom outlineSpace + 2rem
  right outlineSpace
  font-family fontDigital
  font-size 1rem
  letter-spacing .2em
  color colorMuted

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
