<script setup>
// 回到最上面：捲過第一屏之後一直顯示，用 ScrollToPlugin 平滑捲回
// 每次捲動直接比較位置；用「區間進出」判斷的話，捲到最底碰到區間終點會被當成離開而消失
const { gsap, ScrollTrigger } = useGsap()
const show = ref(false)
let trigger

onMounted(() => {
  const check = () => (show.value = window.scrollY > window.innerHeight * 0.8)
  trigger = ScrollTrigger.create({ start: 0, end: "max", onUpdate: check, onRefresh: check })
  check()
})

onUnmounted(() => trigger?.kill())

const toTop = () => {
  history.replaceState(null, "", location.pathname)
  gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 1, ease: "power3.inOut" })
}
</script>

<template lang="pug">
button.to-top(type="button" :class="{ 'is-show': show }" @click="toTop" aria-label="回到最上面" :tabindex="show ? 0 : -1")
  svg.to-top-arrow(viewBox="0 0 16 16" aria-hidden="true")
    path(d="M8 13 V3 M3.5 7.5 L8 3 L12.5 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square")
  span.to-top-label Top
</template>

<style lang="stylus" scoped>
.to-top
  position fixed
  right outlineSpace
  bottom outlineSpace
  z-index 9040
  flex(center,center,column)
  gap .2rem
  size(3.2rem)
  border 1.5px solid colorSecondary
  font-family fontDisplay
  font-weight 900
  letter-spacing .08em
  text-transform uppercase
  color colorPrimary
  background-color colorSecondary
  opacity 0
  pointer-events none
  // 顯示隱藏只用 opacity：transform 留給磁吸用
  transition opacity .4s ease, color .3s, border-color .3s, background-color .3s
  &.is-show
    opacity 1
    pointer-events auto
  &:hover, &:focus-visible
    color colorSecondary
    background-color colorPrimary
  .to-top-arrow
    size(1rem)
  .to-top-label
    font-size .8rem
    line-height 1

@media (max-width: breakMobile)
  .to-top
    right outlineSpace + .5rem // 讓開右緣的捲動進度線
</style>
