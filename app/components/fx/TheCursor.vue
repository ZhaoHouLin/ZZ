<script setup>
import { gsap } from "gsap"

const ring = ref(null)
const dot = ref(null)
const pulse = ref(null) // 點擊時擴散的漣漪
const hover = ref(false)
const down = ref(false)
const label = ref("") // 碰到 [data-cursor] 時圈裡顯示的字（drag / open / hold / view）
const onPaper = ref(false) // 游標在白紙區塊（[data-paper]）上時換黑色

let off = () => {}

onMounted(() => {
  // 觸控裝置沒有滑鼠，直接不顯示
  if (!window.matchMedia("(pointer: fine)").matches) return

  gsap.set([ring.value, dot.value], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

  // 圓圈每幀朝滑鼠靠近固定比例（依幀間隔換算，不受更新率影響），速度連續。
  // 原本每個 mousemove 都重起一段先快後慢的 tween，事件一秒 60～120 次又不平均，速度一直被重設，看起來一頓一頓
  const setRingX = gsap.quickSetter(ring.value, "x", "px")
  const setRingY = gsap.quickSetter(ring.value, "y", "px")
  const setDotX = gsap.quickSetter(dot.value, "x", "px")
  const setDotY = gsap.quickSetter(dot.value, "y", "px")
  const mouse = { x: -100, y: -100 }
  const pos = { x: -100, y: -100 }
  const FOLLOW = 0.2 // 每 1/60 秒靠近剩餘距離的比例；越大越跟手
  const follow = (time, dt) => {
    const k = 1 - Math.pow(1 - FOLLOW, dt / (1000 / 60))
    pos.x += (mouse.x - pos.x) * k
    pos.y += (mouse.y - pos.y) * k
    setRingX(pos.x)
    setRingY(pos.y)
  }
  gsap.ticker.add(follow)

  const onMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    setDotX(e.clientX) // 中心點直接貼著滑鼠，不延遲
    setDotY(e.clientY)
  }
  const onOver = (e) => {
    hover.value = !!e.target.closest("a, button, [data-hover]")
    label.value = e.target.closest("[data-cursor]")?.dataset.cursor || ""
    onPaper.value = !!e.target.closest("[data-paper]")
  }
  const onDown = (e) => {
    down.value = true
    gsap.fromTo(pulse.value, { x: e.clientX, y: e.clientY, scale: 0.4, opacity: 0.7 }, { scale: 2.4, opacity: 0, duration: 0.5, ease: "power2.out", overwrite: true })
  }
  const onUp = () => (down.value = false)

  window.addEventListener("mousemove", onMove, { passive: true })
  window.addEventListener("mouseover", onOver, { passive: true })
  window.addEventListener("mousedown", onDown)
  window.addEventListener("mouseup", onUp)

  off = () => {
    gsap.ticker.remove(follow)
    window.removeEventListener("mousemove", onMove)
    window.removeEventListener("mouseover", onOver)
    window.removeEventListener("mousedown", onDown)
    window.removeEventListener("mouseup", onUp)
  }
})

onUnmounted(() => off())
</script>

<template lang="pug">
.cursor(aria-hidden="true" :class="{ 'on-paper': onPaper }")
  .cursor-ring(ref="ring" :class="{ 'is-hover': hover, 'is-down': down, 'is-label': !!label }")
    span.cursor-label {{ label }}
  .cursor-dot(ref="dot" :class="{ 'is-hidden': !!label }")
  .cursor-pulse(ref="pulse")
</template>

<style lang="stylus" scoped>
// 黑底區塊用白色游標；白紙區塊（[data-paper]）換黑色
.cursor
  --fg colorSecondary
  --bg colorPrimary
  display none
  @media (pointer: fine)
    display block
  &.on-paper
    --fg colorPrimary
    --bg colorSecondary

.cursor-ring, .cursor-dot, .cursor-pulse
  position fixed
  top 0
  left 0
  pointer-events none
  z-index 9999
  border-radius 50%

.cursor-ring
  size(32px)
  flex()
  border 1.5px solid var(--fg)
  transition width .3s ease, height .3s ease, background-color .3s ease, border-color .3s ease
  .cursor-label
    font-family fontDisplay
    font-size 1rem
    font-weight 900
    letter-spacing .14em
    text-transform uppercase
    color var(--bg)
    opacity 0
    transition opacity .2s ease
  &.is-label
    size(72px)
    background-color var(--fg)
    border-color transparent
    .cursor-label
      opacity 1
  &.is-hover
    size(64px)
  &.is-down
    size(20px)
  // 有字的時候（例如按住 hero 的 HOLD）按下只稍微縮，不然字會擠在一起
  &.is-label.is-down
    size(60px)

.cursor-pulse
  size(32px)
  margin -16px 0 0 -16px // 以中心為原點
  border 1.5px solid var(--fg)
  opacity 0

.cursor-dot
  size(8px)
  background-color var(--fg)
  transition opacity .2s ease
  &.is-hidden
    opacity 0 // 有標籤時點會壓在字上
</style>
