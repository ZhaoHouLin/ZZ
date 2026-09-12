<script setup>
// 隨機生成的層疊山脊線，滑鼠移動有視差；在 client 端生成，避免 SSR 隨機值不一致
import { gsap } from "gsap"

const layers = ref([])
const root = ref(null)
let off = () => {}

const makeRidge = (seed, base, amp, steps = 14) => {
  let d = `M0,${base}`
  for (let i = 1; i <= steps; i++) {
    const x = (1000 / steps) * i
    const y = base - Math.random() * amp - (i % 2 ? seed * 4 : 0)
    d += ` L${x.toFixed(0)},${y.toFixed(0)}`
  }
  return `${d} L1000,400 L0,400 Z`
}

onMounted(() => {
  layers.value = [
    { d: makeRidge(1, 250, 80), opacity: 0.08, depth: 6 },
    { d: makeRidge(2, 290, 90), opacity: 0.14, depth: 12 },
    { d: makeRidge(3, 330, 80), opacity: 0.22, depth: 20 },
    { d: makeRidge(4, 370, 60), opacity: 0.32, depth: 30 },
  ]

  nextTick(() => {
    const paths = root.value.querySelectorAll("path")
    gsap.from(paths, { yPercent: 30, opacity: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" })

    if (!window.matchMedia("(pointer: fine)").matches) return
    const movers = Array.from(paths).map((p, i) => ({
      x: gsap.quickTo(p, "x", { duration: 0.8, ease: "power3" }),
      depth: layers.value[i].depth,
    }))
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      movers.forEach((m) => m.x(-nx * m.depth))
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    off = () => window.removeEventListener("mousemove", onMove)
  })
})

onUnmounted(() => off())
</script>

<template lang="pug">
svg.ridge(ref="root" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true")
  path(v-for="(l, i) in layers" :key="i" :d="l.d" :fill-opacity="l.opacity")
</template>

<style lang="stylus" scoped>
.ridge
  position absolute
  left -5%
  bottom 0
  size(110%,60%)
  pointer-events none
  path
    fill colorSecondary
</style>
