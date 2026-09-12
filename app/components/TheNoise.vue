<template lang="pug">
.noise(aria-hidden="true")
</template>

<style lang="stylus" scoped>
// 全頁膠捲顆粒，讓純黑背景有質感；SVG feTurbulence 內嵌，不用外部圖
.noise
  position fixed
  // 只需蓋過 grain 位移的最大幅度（6%），-100% 會做出 9 倍視窗大的圖層
  inset -10%
  z-index 9000
  pointer-events none
  opacity .07
  will-change transform
  background-image url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")
  background-size 256px 256px
  animation grain 1s steps(6) infinite

@keyframes grain
  0%
    transform translate(0, 0)
  20%
    transform translate(-5%, 3%)
  40%
    transform translate(4%, -6%)
  60%
    transform translate(-3%, -2%)
  80%
    transform translate(6%, 5%)
  100%
    transform translate(0, 0)
</style>
