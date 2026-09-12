<script setup>
import { gsap } from "gsap"

const ring = ref(null)
const dot = ref(null)
const hover = ref(false)
const down = ref(false)
const label = ref("") // 碰到 [data-cursor] 時圈裡顯示的字（drag / open / hold / view）

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
    label.value = e.target.closest("[data-cursor]")?.dataset.cursor || ""
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
  .cursor-ring(ref="ring" :class="{ 'is-hover': hover, 'is-down': down, 'is-label': !!label }")
    span.cursor-label {{ label }}
  .cursor-dot(ref="dot" :class="{ 'is-hidden': !!label }")
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

.cursor-ring
  size(32px)
  flex()
  border 1px solid colorSecondary
  transition width .3s ease, height .3s ease, background-color .3s ease, border-color .3s ease
  .cursor-label
    font-family fontDigital
    font-size .85rem
    font-weight 700
    letter-spacing .2em
    text-transform uppercase
    color colorPrimary
    opacity 0
    transition opacity .2s ease
  &.is-label
    size(72px)
    background-color rgba(242,242,242,.92)
    border-color transparent
    .cursor-label
      opacity 1
  &.is-hover
    size(64px)
    background-color rgba(255,255,255,.12)
    border-color colorAccent
  &.is-down
    size(20px)

.cursor-dot
  size(4px)
  background-color colorSecondary
  transition opacity .2s ease
  &.is-hidden
    opacity 0 // 有標籤時白點會壓在字上
</style>
