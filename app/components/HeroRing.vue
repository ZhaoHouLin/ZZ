<script setup>
// 環形跑馬文字，繞在體素 ZZ 外圍；hero 捲出畫面就暫停旋轉
const root = ref(null)
let io

onMounted(() => {
  io = new IntersectionObserver(([e]) => root.value.classList.toggle("is-paused", !e.isIntersecting))
  io.observe(root.value)
})

onUnmounted(() => io?.disconnect())
</script>

<template lang="pug">
.ring(ref="root" aria-hidden="true")
  svg.ring-svg(viewBox="0 0 500 500")
    defs
      path#ring-path(d="M250,400 a150,150 0 0,1 0,-300 a150,150 0 0,1 0,300 Z" fill="none")
    text
      textPath(href="#ring-path" textLength="930" lengthAdjust="spacingAndGlyphs") Hello! Welcome to my website. I'm ZZ.
</template>

<style lang="stylus" scoped>
.ring
  pos()
  transform translate(-50%,-50%)
  // 文字圈直徑是這個尺寸的 60%（路徑半徑 150 / viewBox 500）：閃電高 40vh，旋轉時的外接圓約 60vh，圈設 60vh；窄螢幕改依寬度
  size(unquote("min(100vh, 140vw)"))
  flex()

.ring-svg
  size()
  animation spin 14s linear infinite
  // 固定成合成層，旋轉才會交給 GPU；SVG 文字不能掛 filter，否則每幀都在主執行緒重畫
  will-change transform
  .is-paused &
    animation-play-state paused
  text
    fill colorSecondary
    font-family fontPixel
    font-size 2.6rem

@keyframes spin
  to
    transform rotate(-360deg)
</style>
