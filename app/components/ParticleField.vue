<script setup>
// 取代舊站的 BackgroundLikeNeon / Snow：canvas 星座線，粒子會被滑鼠推開
import { gsap } from "gsap"

const props = defineProps({
  count: { type: Number, default: 90 },
  linkDist: { type: Number, default: 130 },
})

const canvas = ref(null)
let stop = () => {}

onMounted(() => {
  const el = canvas.value
  const ctx = el.getContext("2d")
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  let w = 0
  let h = 0
  let particles = []
  const mouse = { x: -9999, y: -9999 }

  const resize = () => {
    const rect = el.parentElement.getBoundingClientRect()
    w = rect.width
    h = rect.height
    el.width = w * dpr
    el.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const n = w < 768 ? Math.round(props.count / 2) : props.count
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }))
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    const ld = props.linkDist
    for (const p of particles) {
      if (!reduced) {
        // 滑鼠附近的粒子被推開
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 160 * 160) {
          const d = Math.sqrt(d2) || 1
          p.vx += (dx / d) * 0.12
          p.vy += (dy / d) * 0.12
        }
        p.vx *= 0.985
        p.vy *= 0.985
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255,255,255,.7)"
      ctx.fill()
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < ld) {
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / ld) * 0.25})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }
  }

  const onMove = (e) => {
    const rect = el.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }
  const onLeave = () => {
    mouse.x = -9999
    mouse.y = -9999
  }

  resize()
  window.addEventListener("resize", resize)
  window.addEventListener("mousemove", onMove, { passive: true })
  window.addEventListener("mouseleave", onLeave)

  if (reduced) {
    draw()
  } else {
    gsap.ticker.add(draw)
  }

  stop = () => {
    gsap.ticker.remove(draw)
    window.removeEventListener("resize", resize)
    window.removeEventListener("mousemove", onMove)
    window.removeEventListener("mouseleave", onLeave)
  }
})

onUnmounted(() => stop())
</script>

<template lang="pug">
canvas.particle-field(ref="canvas" aria-hidden="true")
</template>

<style lang="stylus" scoped>
.particle-field
  position absolute
  inset 0
  size()
  pointer-events none
</style>
