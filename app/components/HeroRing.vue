<script setup>
// 舊站 Ring.vue 的升級版：環形跑馬文字 + 中央計數（0 → 100，呼應 100 Days CSS）
const { gsap } = useGsap()
const num = ref(0)

onMounted(() => {
  const o = { v: 0 }
  gsap.to(o, {
    v: 100,
    duration: 2.4,
    delay: 0.6,
    ease: "power2.inOut",
    onUpdate: () => (num.value = Math.round(o.v)),
  })
})
</script>

<template lang="pug">
.ring(aria-hidden="true")
  svg.ring-svg(viewBox="0 0 500 500")
    defs
      path#ring-path(d="M250,400 a150,150 0 0,1 0,-300 a150,150 0 0,1 0,300 Z" fill="none")
    text
      textPath(href="#ring-path" textLength="930" lengthAdjust="spacingAndGlyphs") Hello! Welcome to my website. I'm ZZ.
  .ring-center
    .ring-num
      span.ring-hash #
      | {{ String(num).padStart(3, "0") }}
    .ring-label days css
</template>

<style lang="stylus" scoped>
.ring
  pos()
  transform translate(-50%,-50%)
  size(30rem)
  flex()

.ring-svg
  size()
  animation spin 14s linear infinite
  text
    fill colorSecondary
    font-family fontPixel
    font-size 3.4rem
    filter drop-shadow(0 0 6px rgba(255,255,255,.25))

.ring-center
  pos()
  transform translate(-50%,-50%)
  flex(center,center,column)
  gap .2rem

.ring-num
  font-family fontPixel
  font-size 6rem
  line-height 1
  letter-spacing .4rem
  text-shadow 0 0 24px rgba(255,255,255,.25)
  .ring-hash
    color colorAccent

.ring-label
  font-family fontDigital
  font-size 1.1rem
  letter-spacing .4em
  text-transform uppercase
  color colorMuted

@keyframes spin
  to
    transform rotate(-360deg)

@media (max-width: breakMobile)
  .ring
    size(20rem)
  .ring-num
    font-size 4rem
</style>
