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
  // 背景特效不需要 Retina 解析度：DPR 2 的全螢幕畫布每幀要清掉、重畫、上傳 4 倍的像素
  const dpr = 1
  let w = 0
  let h = 0
  let offX = 0
  let offY = 0
  let particles = []
  const mouse = { x: -9999, y: -9999 }
  const BUCKETS = 6 // 連線透明度分 6 階，每階一次 stroke，取代每條線各 stroke 一次

  const resize = () => {
    const rect = el.parentElement.getBoundingClientRect()
    w = rect.width
    h = rect.height
    offX = rect.left + window.scrollX
    offY = rect.top + window.scrollY
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
    const segs = Array.from({ length: BUCKETS }, () => [])
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d2 = dx * dx + dy * dy
        if (d2 < ld * ld) {
          const k = Math.min(BUCKETS - 1, Math.floor((1 - Math.sqrt(d2) / ld) * BUCKETS))
          segs[k].push(a.x, a.y, b.x, b.y)
        }
      }
    }
    ctx.lineWidth = 1
    segs.forEach((s, k) => {
      if (!s.length) return
      ctx.strokeStyle = `rgba(255,255,255,${((k + 0.5) / BUCKETS) * 0.25})`
      ctx.beginPath()
      for (let n = 0; n < s.length; n += 4) {
        ctx.moveTo(s[n], s[n + 1])
        ctx.lineTo(s[n + 2], s[n + 3])
      }
      ctx.stroke()
    })
  }

  // 用 pageX 減去 resize 時算好的位移，不在 mousemove 裡呼叫 getBoundingClientRect 強制排版
  const onMove = (e) => {
    mouse.x = e.pageX - offX
    mouse.y = e.pageY - offY
  }
  const onLeave = () => {
    mouse.x = -9999
    mouse.y = -9999
  }

  resize()
  window.addEventListener("resize", resize)
  window.addEventListener("mousemove", onMove, { passive: true })
  window.addEventListener("mouseleave", onLeave)

  // 只有畫布在視窗內才跑迴圈：hero 捲出去後不必每幀畫 90 顆粒子 + 4000 對連線
  let io
  if (reduced) {
    draw()
  } else {
    io = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? gsap.ticker.add(draw) : gsap.ticker.remove(draw)
    })
    io.observe(el)
  }

  stop = () => {
    io?.disconnect()
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
