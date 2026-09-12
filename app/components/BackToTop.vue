<script setup>
// 回到最上面：捲過第一屏才出現，用 ScrollToPlugin 平滑捲回
const { gsap, ScrollTrigger } = useGsap()
const show = ref(false)
let trigger

onMounted(() => {
  trigger = ScrollTrigger.create({
    start: () => window.innerHeight * 0.8,
    end: "max",
    onToggle: (self) => (show.value = self.isActive),
  })
})

onUnmounted(() => trigger?.kill())

const toTop = () => {
  history.replaceState(null, "", location.pathname)
  gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 1, ease: "power3.inOut" })
}
</script>

<template lang="pug">
button.to-top(type="button" :class="{ 'is-show': show }" @click="toTop" aria-label="回到最上面" :tabindex="show ? 0 : -1")
  span.to-top-arrow ↑
  span.to-top-label top
</template>

<style lang="stylus" scoped>
.to-top
  position fixed
  right outlineSpace
  bottom outlineSpace
  z-index 9040
  flex(center,center,column)
  gap .2rem
  size(3rem)
  border 1px solid colorLine
  font-family fontDigital
  letter-spacing .1em
  text-transform uppercase
  color colorMuted
  background-color colorPrimary
  opacity 0
  transform translateY(1rem)
  pointer-events none
  transition opacity .4s ease, transform .4s ease, color .3s, border-color .3s, background-color .3s
  &.is-show
    opacity 1
    transform none
    pointer-events auto
  &:hover
    color colorPrimary
    border-color colorSecondary
    background-color colorSecondary
  .to-top-arrow
    font-family fontPixel
    font-size 1.4rem
    line-height 1
  .to-top-label
    font-size .7rem
    line-height 1

@media (max-width: breakMobile)
  .to-top
    right outlineSpace + .5rem // 讓開右緣的捲動進度線
</style>
