<script setup>
// 跟著游標、慢半拍的琥珀光暈：一個固定定位的漸層圓，只動 transform；觸控裝置不顯示
import { gsap } from "gsap"

const el = ref(null)
let off = () => {}

onMounted(() => {
  if (!window.matchMedia("(pointer: fine)").matches) return
  const x = gsap.quickTo(el.value, "x", { duration: 0.9, ease: "power3" })
  const y = gsap.quickTo(el.value, "y", { duration: 0.9, ease: "power3" })
  let shown = false
  const onMove = (e) => {
    x(e.clientX)
    y(e.clientY)
    if (!shown) {
      shown = true
      el.value.classList.add("is-on")
    }
  }
  window.addEventListener("pointermove", onMove, { passive: true })
  off = () => window.removeEventListener("pointermove", onMove)
})

onUnmounted(() => off())
</script>

<template lang="pug">
.glow(ref="el" aria-hidden="true")
</template>

<style lang="stylus" scoped>
.glow
  position fixed
  top 0
  left 0
  z-index 8990 // 在內容之上、顆粒層之下；很淡，蓋在文字上只是微微偏暖
  size(44rem)
  margin -22rem 0 0 -22rem
  border-radius 50%
  background radial-gradient(circle, rgba(245,166,35,.09), rgba(245,166,35,0) 60%)
  pointer-events none
  opacity 0
  transition opacity .8s ease
  will-change transform
  &.is-on
    opacity 1
</style>
