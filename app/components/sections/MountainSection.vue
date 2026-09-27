<script setup>
// 05 山：照片滿版（保留彩色），「我命由我不由天」直書，白色光帶由上往下掃過（docs/LOGO-REDESIGN.md 整頁構圖 05）
// 舊的對聯「走路要找難路走，挑擔要揀重擔挑」是 2019 年爬山的體會，使用者目前選擇不顯示
const { gsap } = useGsap()
const root = ref(null)
const photoSrc = `${useRuntimeConfig().app.baseURL}mountain.jpg` // 綁定而非靜態 src；要帶 baseURL，GitHub Pages 部署在 /ZZ/ 底下
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap
      .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: root.value, start: "top 60%" } })
      .from(".mtn-motto", { yPercent: 20, opacity: 0, duration: 1.4 })
      .from(".mtn-note", { yPercent: 100, opacity: 0, duration: 0.8 }, "-=0.8")

    // 照片放大 1.2 倍跟著捲動上移，只動 transform
    gsap.fromTo(
      ".mtn-photo",
      { yPercent: -8 },
      { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.value, start: "top bottom", end: "bottom top", scrub: true } }
    )
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.mountain#mountain(ref="root")
  img.mtn-photo(:src="photoSrc" alt="站在山頂岩石上眺望整片綠色山谷的林炤后" loading="lazy")
  .mtn-shade(aria-hidden="true")
  .mtn-head
    span.sec-idx 05
    h2 Mountain
  h2.mtn-motto 我命由我不由天
  p.mtn-note 2025 · 考照時的體會
</template>

<style lang="stylus" scoped>
.mountain
  position relative
  height unquote("max(100vh, 600px)")
  overflow hidden
  display grid
  place-items center

.mtn-photo
  position absolute
  inset 0
  size()
  object-fit cover
  object-position center 40%
  transform scale(1.2)
  will-change transform

// 上下緣接回黑底，中段壓暗讓直書字可讀
.mtn-shade
  position absolute
  inset 0
  background linear-gradient(180deg, colorPrimary 0%, rgba(5, 5, 5, .5) 22%, rgba(5, 5, 5, .5) 75%, colorPrimary 100%)

.mtn-head
  pos(outlineSpace, 6rem)
  sectionTitle()

// 白色光帶由上往下沿直書掃過；漸層放大三倍高，動 background-position
.mtn-motto
  position relative
  writing-mode vertical-rl
  font-size clamp(2.4rem, 7vh, 4.6rem)
  font-weight 900
  letter-spacing .4em
  line-height 1
  background-image linear-gradient(180deg, colorSoft 0%, colorSoft 38%, colorSecondary 50%, colorSoft 62%, colorSoft 100%)
  background-size 100% 300%
  -webkit-background-clip text
  background-clip text
  -webkit-text-fill-color transparent
  animation mottoShine 4.5s ease-in-out infinite

@keyframes mottoShine
  from
    background-position 0 100%
  to
    background-position 0 0%

.mtn-note
  labelPlate(1.2rem)
  position absolute
  right outlineSpace
  bottom 5rem

@media (max-width: breakMobile)
  .mtn-head
    top 4rem
  .mtn-note
    font-size 1rem
    bottom 3rem
</style>
