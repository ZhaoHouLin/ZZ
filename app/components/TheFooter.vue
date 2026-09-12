<script setup>
const year = new Date().getFullYear()
</script>

<template lang="pug">
footer.footer
  .footer-line
  .footer-row
    .footer-brand
      span.footer-logo ZZ
      span.footer-sub ZhaoHou Lin · AI Application · Cloud Native · Web
    nav.footer-links
      a(href="https://github.com/ZhaoHouLin" target="_blank" rel="noopener") GitHub
      a(href="https://codepen.io/rodes" target="_blank" rel="noopener") CodePen
      a(href="mailto:rodes5292@gmail.com") Mail
    .footer-copy © {{ year }} · Nuxt 4 + GSAP
</template>

<style lang="stylus" scoped>
.footer
  position relative
  padding 3rem outlineSpace 2rem
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
