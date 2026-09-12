<script setup>
import { gsap } from "gsap"

const ring = ref(null)
const dot = ref(null)
const hover = ref(false)
const down = ref(false)

let off = () => {}

onMounted(() => {
  // 觸控裝置沒有滑鼠，直接不顯示
  if (!window.matchMedia("(pointer: fine)").matches) return

  gsap.set([ring.value, dot.value], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

  const ringX = gsap.quickTo(ring.value, "x", { duration: 0.35, ease: "power3" })
  const ringY = gsap.quickTo(ring.value, "y", { duration: 0.35, ease: "power3" })
  const dotX = gsap.quickTo(dot.value, "x", { duration: 0.08 })
  const dotY = gsap.quickTo(dot.value, "y", { duration: 0.08 })

  const onMove = (e) => {
    ringX(e.clientX)
    ringY(e.clientY)
    dotX(e.clientX)
    dotY(e.clientY)
  }
  const onOver = (e) => {
    hover.value = !!e.target.closest("a, button, [data-hover]")
  }
  const onDown = () => (down.value = true)
  const onUp = () => (down.value = false)

  window.addEventListener("mousemove", onMove, { passive: true })
  window.addEventListener("mouseover", onOver, { passive: true })
  window.addEventListener("mousedown", onDown)
  window.addEventListener("mouseup", onUp)

  off = () => {
    window.removeEventListener("mousemove", onMove)
    window.removeEventListener("mouseover", onOver)
    window.removeEventListener("mousedown", onDown)
    window.removeEventListener("mouseup", onUp)
  }
})

onUnmounted(() => off())
</script>

<template lang="pug">
.cursor(aria-hidden="true")
  .cursor-ring(ref="ring" :class="{ 'is-hover': hover, 'is-down': down }")
  .cursor-dot(ref="dot")
</template>

<style lang="stylus" scoped>
.cursor
  display none
  @media (pointer: fine)
    display block

.cursor-ring, .cursor-dot
  position fixed
  top 0
  left 0
  pointer-events none
  z-index 9999
  border-radius 50%
  mix-blend-mode difference

.cursor-ring
  size(32px)
  border 1px solid colorSecondary
  transition width .3s ease, height .3s ease, background-color .3s ease, border-color .3s ease
  &.is-hover
    size(64px)
    background-color rgba(255,255,255,.12)
    border-color colorAccent
  &.is-down
    size(20px)

.cursor-dot
  size(4px)
  background-color colorSecondary
</style>
