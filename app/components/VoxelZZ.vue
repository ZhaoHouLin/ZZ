<script setup>
// hero 的體素 ZZ（docs/ONEPAGE-3D.md Q7～Q11）
// 護欄：Three.js 動態載入；1/PIXEL 解析度像素化渲染；離開視窗停止渲染；沒有 WebGL 或 reduced-motion 就不建場景；手機方塊減半
const { gsap } = useGsap()
const canvas = ref(null)
let dispose = () => {}

// 像素字 Z：8 寬 10 高，筆畫 2 格厚
const Z = [
  "11111111",
  "11111111",
  "00000011",
  "00000110",
  "00001100",
  "00011000",
  "00110000",
  "01100000",
  "11111111",
  "11111111",
]
const GAP = 1 // 兩個 Z 之間空一格
const PIXEL = 3 // 一個渲染像素 = 3 個 CSS px，由 CSS image-rendering: pixelated 放大

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
  // 靜態解構而不是整包命名空間，Rollup 才能 tree-shake 掉沒用到的 Three.js 模組
  const { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, Vector3, BoxGeometry, MeshLambertMaterial, InstancedMesh, Group, Object3D, MathUtils } = await import("three")
  if (!canvas.value) return // 載入期間已卸載
  init({ WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, Vector3, BoxGeometry, MeshLambertMaterial, InstancedMesh, Group, Object3D, MathUtils })
})

onUnmounted(() => dispose())

function init(THREE) {
  const el = canvas.value
  const wrap = el.parentElement
  const mobile = window.matchMedia("(max-width: 768px)").matches
  const fine = window.matchMedia("(pointer: fine)").matches
  const depth = mobile ? 1 : 2

  const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: false, alpha: true, powerPreference: "low-power" })
  renderer.setPixelRatio(1 / PIXEL)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200)

  scene.add(new THREE.AmbientLight(0xffffff, 0.35))
  const key = new THREE.DirectionalLight(0xffffff, 1.6) // 白光，方塊維持黑白
  key.position.set(4, 6, 8)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.5)
  fill.position.set(-6, -2, 4)
  scene.add(fill)

  // 目標座標：兩個 Z 並排、置中
  const cols = Z[0].length * 2 + GAP
  const rows = Z.length
  const targets = []
  Z.forEach((row, y) => {
    for (let z = 0; z < depth; z++) {
      for (let x = 0; x < row.length; x++) {
        if (row[x] !== "1") continue
        for (const offset of [0, Z[0].length + GAP]) {
          targets.push(new THREE.Vector3(x + offset - (cols - 1) / 2, (rows - 1) / 2 - y, z - (depth - 1) / 2))
        }
      }
    }
  })
  const count = targets.length
  const geo = new THREE.BoxGeometry(0.92, 0.92, 0.92)
  const mat = new THREE.MeshLambertMaterial({ color: 0xf2f2f2 })
  const mesh = new THREE.InstancedMesh(geo, mat, count)
  const group = new THREE.Group()
  group.add(mesh)
  scene.add(group)

  // 進場：方塊從散開的位置與角度聚合成 ZZ，順序隨機 stagger
  const starts = targets.map(() => new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40 - 20))
  const startRot = targets.map(() => [Math.random() * 6, Math.random() * 6, Math.random() * 6])
  const order = gsap.utils.shuffle(targets.map((_, i) => i))
  const dummy = new THREE.Object3D()
  const tmp = new THREE.Vector3()
  const SPREAD = 0.6 // stagger 佔整段進場的比例
  const place = (t) => {
    for (let i = 0; i < count; i++) {
      const k = gsap.utils.clamp(0, 1, (t - (order[i] / count) * SPREAD) / (1 - SPREAD))
      const e = 1 - (1 - k) ** 3 // cubic out
      tmp.lerpVectors(starts[i], targets[i], e)
      dummy.position.copy(tmp)
      dummy.rotation.set(startRot[i][0] * (1 - e), startRot[i][1] * (1 - e), startRot[i][2] * (1 - e))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }
  place(0)
  const entry = { t: 0 }
  const entryTween = gsap.to(entry, { t: 1, duration: 2.2, delay: 0.4, ease: "none", onUpdate: () => place(entry.t) })

  // 相機距離：ZZ 佔畫面高的 40% 或寬的 55%，取較遠者
  const resize = () => {
    const w = wrap.clientWidth
    const h = wrap.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
    const dH = rows / 0.4 / 2 / tan
    const dW = cols / 0.55 / 2 / tan / camera.aspect
    camera.position.z = Math.max(dH, dW)
    camera.updateProjectionMatrix()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(wrap)

  // 互動：滑鼠位置傾斜（只有精準指標）、拖曳旋轉（滑鼠與手指都可）、閒置自轉
  const tilt = { x: 0, y: 0 }
  const cur = { x: 0, y: 0 }
  let spin = 0
  let vel = 0
  let dragging = false
  let lastX = 0
  const onMove = (e) => {
    if (dragging) {
      vel = (e.clientX - lastX) * 0.008
      spin += vel
      lastX = e.clientX
      return
    }
    if (!fine) return
    tilt.y = (e.clientX / window.innerWidth - 0.5) * 0.6
    tilt.x = (e.clientY / window.innerHeight - 0.5) * 0.4
  }
  const onDown = (e) => {
    dragging = true
    lastX = e.clientX
    vel = 0
  }
  const onUp = () => (dragging = false)
  window.addEventListener("pointermove", onMove, { passive: true })
  el.addEventListener("pointerdown", onDown)
  window.addEventListener("pointerup", onUp)
  window.addEventListener("pointercancel", onUp)

  const render = (time) => {
    if (!dragging) {
      spin += vel
      vel *= 0.95 // 放開後慣性衰減
    }
    cur.x += (tilt.x - cur.x) * 0.06
    cur.y += (tilt.y - cur.y) * 0.06
    group.rotation.y = time * 0.25 + spin + cur.y
    group.rotation.x = Math.sin(time * 0.6) * 0.08 + cur.x
    renderer.render(scene, camera)
  }

  // 只有 hero 在視窗內才渲染
  const io = new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? gsap.ticker.add(render) : gsap.ticker.remove(render)
  })
  io.observe(wrap)

  dispose = () => {
    io.disconnect()
    ro.disconnect()
    gsap.ticker.remove(render)
    entryTween.kill()
    window.removeEventListener("pointermove", onMove)
    el.removeEventListener("pointerdown", onDown)
    window.removeEventListener("pointerup", onUp)
    window.removeEventListener("pointercancel", onUp)
    geo.dispose()
    mat.dispose()
    renderer.dispose()
  }
}
</script>

<template lang="pug">
canvas.voxel(ref="canvas" aria-hidden="true")
</template>

<style lang="stylus" scoped>
.voxel
  position absolute
  inset 0
  size()
  display block
  image-rendering pixelated // 低解析度渲染靠這行做最近鄰放大
  touch-action pan-y // 手指橫拖轉物件，直拖仍可捲頁
</style>
