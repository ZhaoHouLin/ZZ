<script setup>
// 閃電碎片（docs/ONEPAGE-3D.md）：一張固定滿版的 WebGL 畫布，方塊和 hero 的閃電同一種
// - 捲到有 data-glyph 的區塊：碎片聚合成該區的像素圖示，放在內容欄外側的空白帶、隨區塊移動並黏在視窗內
// - 區塊之間：散開漂浮、會被游標撥開
// - hero 可見時不渲染（hero 有自己的迴圈；hero 捲走時它的迴圈停），同一時間只有一個迴圈
// - 1/PIXEL 解析度像素化渲染；沒有 WebGL 或 reduced-motion 就不建
import { glyphs } from "~/data/glyphs"

const { gsap, ScrollTrigger } = useGsap()
const canvas = ref(null)
let dispose = () => {}

const PIXEL = 3
const CUBE = 16 // 聚合時一格的大小（css px）
const GAP = 2
const MAX = 32 // 方塊總數，要 >= 最大圖示的格數

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

onMounted(async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !hasWebGL()) return
  const { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, BoxGeometry, MeshLambertMaterial, InstancedMesh, Object3D, MathUtils, Color } = await import("three")
  if (!canvas.value) return
  init({ WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, BoxGeometry, MeshLambertMaterial, InstancedMesh, Object3D, MathUtils, Color })
})

onUnmounted(() => dispose())

function init(THREE) {
  const el = canvas.value
  const r = gsap.utils.random
  const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: false, alpha: true, powerPreference: "low-power" })
  renderer.setPixelRatio(1 / PIXEL)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 1, 4000)
  scene.add(new THREE.AmbientLight(0xffffff, 0.35))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(4, 6, 8)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.5)
  fill.position.set(-6, -2, 4)
  scene.add(fill)

  const geo = new THREE.BoxGeometry(CUBE * 0.9, CUBE * 0.9, CUBE * 0.9)
  const mat = new THREE.MeshLambertMaterial({ color: 0xf2f2f2 })
  const mesh = new THREE.InstancedMesh(geo, mat, MAX)
  scene.add(mesh)
  const white = new THREE.Color(0xf2f2f2)
  const amber = new THREE.Color(0xf5a623)
  const dummy = new THREE.Object3D()

  // 每顆方塊：目前位置、目標、散開時的家、旋轉
  const cubes = Array.from({ length: MAX }, (_, i) => ({
    x: 0, y: 0, z: 0, tx: 0, ty: 0, tz: 0,
    hx: 0, hy: 0, hz: 0, // 散開時的家（螢幕座標）
    rx: r(0, 6), ry: r(0, 6), vx: r(0.2, 0.8), vy: r(0.2, 0.8), // 散開時的翻滾
    crx: null, cry: null, // 目前的旋轉（聚合時朝整組擺動收斂）
    s: 1, ts: 1, // 大小（聚合 1，多出來的方塊縮小）
    seed: i * 1.7,
  }))

  let W = 1
  let H = 1
  const toWorld = (sx, sy) => [sx - W / 2, H / 2 - sy] // 相機距離設成 1 世界單位 = 1 css px（z = 0 平面）
  const rehome = () =>
    cubes.forEach((c) => {
      c.hx = r(0, W)
      c.hy = r(0, H)
      c.hz = r(-260, 80)
    })

  // 區塊：位置用文件座標快取，每幀只讀 scrollY，不在迴圈裡量 DOM
  const sections = Array.from(document.querySelectorAll("section[data-glyph]")).map((s) => ({ el: s, glyph: glyphs[s.dataset.glyph], top: 0, height: 0 }))
  const measure = () =>
    sections.forEach((s) => {
      const b = s.el.getBoundingClientRect()
      s.top = b.top + window.scrollY
      s.height = b.height
    })
  let active = null
  let colored = null
  const triggers = sections.map((s) =>
    ScrollTrigger.create({
      trigger: s.el,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) active = s
        else if (active === s) active = null
      },
    })
  )
  ScrollTrigger.addEventListener("refresh", measure)

  const resize = () => {
    W = window.innerWidth
    H = window.innerHeight
    renderer.setSize(W, H, false)
    camera.aspect = W / H
    camera.position.z = H / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    camera.updateProjectionMatrix()
    measure()
    rehome()
  }
  resize()
  window.addEventListener("resize", resize)

  const mouse = { x: -9999, y: -9999 }
  const onMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }
  window.addEventListener("pointermove", onMove, { passive: true })

  const hero = document.querySelector(".hero")
  let cleared = false

  // 圖示錨點：隨機落在整個視窗（留邊），固定在視窗座標。
  // 游標靠近圖示邊緣時整組「躲開」：從幾個隨機候選點裡挑離游標最遠的，方塊自己滑過去
  let glyphAnchor = null
  let anchoredFor = null
  let lastDodge = -9
  const pickAnchor = (gw, gh, avoid) => {
    const zones = [[24, W - gw - 24]]
    let best = null
    let bestD = -1
    for (let k = 0; k < 6; k++) {
      const z = zones[Math.floor(r(0, zones.length))]
      const ax = r(z[0], z[1])
      const ay = r(96, Math.max(96, H - gh - 96))
      const d = avoid ? Math.hypot(ax + gw / 2 - avoid.x, ay + gh / 2 - avoid.y) : r(0, 1)
      if (d > bestD) {
        bestD = d
        best = { ax, ay }
      }
    }
    return best
  }
  // 躲開：往「離開游標」的方向（正負 60 度內隨機）移 180～320px，不跳到視窗另一頭；貼到邊就換個角度
  const dodge = (gw, gh) => {
    const cx = glyphAnchor.ax + gw / 2
    const cy = glyphAnchor.ay + gh / 2
    const base = Math.atan2(cy - mouse.y, cx - mouse.x)
    for (let k = 0; k < 5; k++) {
      const a = base + r(-Math.PI / 3, Math.PI / 3) + (k ? r(-Math.PI / 2, Math.PI / 2) : 0)
      const d = r(180, 320)
      const ax = gsap.utils.clamp(24, W - gw - 24, glyphAnchor.ax + Math.cos(a) * d)
      const ay = gsap.utils.clamp(96, Math.max(96, H - gh - 96), glyphAnchor.ay + Math.sin(a) * d)
      if (Math.hypot(ax - glyphAnchor.ax, ay - glyphAnchor.ay) > 120) return { ax, ay }
    }
    return pickAnchor(gw, gh, mouse)
  }
  const anchor = (s, gw, gh, time) => {
    if (anchoredFor !== s) {
      anchoredFor = s
      glyphAnchor = pickAnchor(gw, gh, mouse)
    }
    const m = 90 // 游標離圖示外框多近算「接近」
    const near = mouse.x > glyphAnchor.ax - m && mouse.x < glyphAnchor.ax + gw + m && mouse.y > glyphAnchor.ay - m && mouse.y < glyphAnchor.ay + gh + m
    if (near && time - lastDodge > 0.7) {
      lastDodge = time
      glyphAnchor = dodge(gw, gh)
    }
    return [glyphAnchor.ax, glyphAnchor.ay]
  }

  const render = (time) => {
    // hero 在畫面上：交給 hero 的迴圈，這裡清空後不畫
    if (hero && window.scrollY < hero.offsetHeight * 0.6) {
      if (!cleared) {
        renderer.clear()
        cleared = true
      }
      return
    }
    cleared = false

    // 目標
    const cells = []
    if (active) {
      const g = active.glyph
      g.forEach((row, y) => [...row].forEach((c, x) => c !== "." && cells.push({ x, y, amber: c === "@" })))
      const gw = g[0].length * (CUBE + GAP)
      const gh = g.length * (CUBE + GAP)
      const [ax, ay] = anchor(active, gw, gh, time)
      cells.forEach((cell, i) => {
        const c = cubes[i]
        const [wx, wy] = toWorld(ax + cell.x * (CUBE + GAP) + CUBE / 2, ay + cell.y * (CUBE + GAP) + CUBE / 2)
        c.tx = wx
        c.ty = wy
        c.tz = 0
        c.ts = 1
      })
      if (colored !== active) {
        colored = active
        cells.forEach((cell, i) => mesh.setColorAt(i, cell.amber ? amber : white))
        mesh.instanceColor.needsUpdate = true
      }
    } else if (colored) {
      colored = null
      cubes.forEach((_, i) => mesh.setColorAt(i, white))
      mesh.instanceColor.needsUpdate = true
    }
    const formed = cells.length
    for (let i = formed; i < MAX; i++) {
      const c = cubes[i]
      const [wx, wy] = toWorld(c.hx + Math.sin(time * 0.35 + c.seed) * 26, c.hy + Math.cos(time * 0.28 + c.seed) * 22)
      c.tx = wx
      c.ty = wy
      c.tz = c.hz
      c.ts = active ? 0.45 : 0.75 // 多出來的方塊：聚合時縮小退到背景
    }

    // 散開的方塊被游標撥開（用 z = 0 平面的世界座標近似）；聚合中的整組躲開，不個別撥
    const [mx, my] = toWorld(mouse.x, mouse.y)
    for (let i = 0; i < MAX; i++) {
      const c = cubes[i]
      const dx = c.x - mx
      const dy = c.y - my
      const d2 = dx * dx + dy * dy
      let px = c.tx
      let py = c.ty
      if (i >= formed && d2 < 130 * 130) {
        const d = Math.sqrt(d2) || 1
        const push = (130 - d) * 0.6
        px += (dx / d) * push
        py += (dy / d) * push
      }
      c.x += (px - c.x) * 0.1
      c.y += (py - c.y) * 0.1
      c.z += (c.tz - c.z) * 0.08
      c.s += (c.ts - c.s) * 0.1
      const isFormed = i < formed
      // 聚合：整組一起輕微擺動；散開：各自翻滾
      const trx = isFormed ? Math.sin(time * 0.8) * 0.18 : c.rx + time * c.vx
      const tryy = isFormed ? Math.sin(time * 0.6) * 0.25 : c.ry + time * c.vy
      c.crx = c.crx == null ? trx : c.crx + (trx - c.crx) * (isFormed ? 0.08 : 1)
      c.cry = c.cry == null ? tryy : c.cry + (tryy - c.cry) * (isFormed ? 0.08 : 1)
      dummy.position.set(c.x, c.y, c.z)
      dummy.rotation.set(c.crx, c.cry, 0)
      dummy.scale.setScalar(c.s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
    renderer.render(scene, camera)
  }
  gsap.ticker.add(render)

  dispose = () => {
    gsap.ticker.remove(render)
    triggers.forEach((t) => t.kill())
    ScrollTrigger.removeEventListener("refresh", measure)
    window.removeEventListener("resize", resize)
    window.removeEventListener("pointermove", onMove)
    geo.dispose()
    mat.dispose()
    renderer.dispose()
  }
}
</script>

<template lang="pug">
canvas.fragments(ref="canvas" aria-hidden="true")
</template>

<style lang="stylus" scoped>
.fragments
  position fixed
  inset 0
  size()
  z-index -1 // 在頁面底色之上、所有內容之下
  display block
  image-rendering pixelated
  pointer-events none
</style>
