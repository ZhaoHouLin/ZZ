<script setup>
const year = new Date().getFullYear()
</script>

<template lang="pug">
footer.footer
  .footer-mark(aria-hidden="true") ZZ
  .footer-line
  .footer-row
    .footer-brand
      span.footer-logo ZZ
      span.footer-sub ZhaoHou Lin · AI Application · Cloud Native · Web
    nav.footer-links
      a(href="https://github.com/ZhaoHouLin" target="_blank" rel="noopener" data-magnet) GitHub
      a(href="https://codepen.io/rodes" target="_blank" rel="noopener" data-magnet) CodePen
      a(href="mailto:rodes5292@gmail.com" data-magnet) Mail
    .footer-copy © {{ year }} · Nuxt 4 + GSAP
</template>

<style lang="stylus" scoped>
.footer
  position relative
  padding 3rem outlineSpace 2rem
  overflow hidden

// 頁尾底層的大字：描邊、hover 填滿
.footer-mark
  position absolute
  right outlineSpace
  bottom -.1em
  z-index 0
  font-family fontPixel
  font-size clamp(8rem, 22vw, 18rem)
  line-height 1
  color transparent
  -webkit-text-stroke 1px colorLine
  transition color .6s ease, -webkit-text-stroke-color .6s ease
  pointer-events none
.footer:hover .footer-mark
  color rgba(255,255,255,.06)
  -webkit-text-stroke-color colorMuted

.footer-line, .footer-row
  position relative
  z-index 1
  color colorMuted
  font-family fontDigital
  font-size 1rem
  letter-spacing .08em

.footer-line
  size(100%,1px)
  background-color colorLine
  margin-bottom 2rem

.footer-row
  flex(space-between,center)
  gap 1.5rem
  flex-wrap wrap

.footer-brand
  flex(flex-start,baseline)
  gap 1rem
  .footer-logo
    font-family fontPixel
    font-size 2.4rem
    color colorSecondary
    line-height 1

.footer-links
  flex(center,center)
  gap 1.5rem
  a
    position relative
    padding .2rem 0
    &::after
      content ''
      position absolute
      left 0
      bottom 0
      size(100%,1px)
      background-color colorAccent
      transform scaleX(0)
      transform-origin right
      transition transform .4s cubic-bezier(.76,0,.24,1)
    &:hover
      color colorSecondary
      &::after
        transform scaleX(1)
        transform-origin left
</style>
