<script setup>
// hero 的體素閃電（docs/ONEPAGE-3D.md 第三輪）：閃電的鋸齒正面讀起來是上下疊的 ZZ，它就是 logo
// 護欄：Three.js 動態載入；1/PIXEL 解析度像素化渲染；離開視窗停止渲染；沒有 WebGL 或 reduced-motion 就不建場景；手機方塊減半
const { gsap } = useGsap()
const props = defineProps({
  motion: { type: Object, default: null }, // useGyroTilt() 的物件；沒有就只用滑鼠
})
const canvas = ref(null)
let dispose = () => {}

// `#` 白色方塊、`@` 琥珀色方塊、`.` 空格；中段的鋸齒（兩段斜線 + 中橫）上色，上下兩橫維持白色
const BOLT = [
  "..#########....",
  "..#########....",
  ".......@@@.....",
  "......@@@......",
  ".....@@@.......",
  "....@@@........",
  "...@@@@@@@@@...",
  "...@@@@@@@@@...",
  "........@@@....",
  ".......@@@.....",
  "......@@@......",
  ".....@@@.......",
  "....#########..",
  "....#########..",
]
const PIXEL = 3 // 一個渲染像素 = 3 個 CSS px，由 CSS image-rendering: pixelated 放大
const HOLD_MS = 250 // 按住超過這個時間就炸開；先動了就是拖曳

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

onMounted(async () => {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !hasWebGL()
  )
    return
  // 靜態解構而不是整包命名空間，Rollup 才能 tree-shake 掉沒用到的 Three.js 模組
  const {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    Vector3,
    BoxGeometry,
    MeshLambertMaterial,
    InstancedMesh,
    Group,
    Object3D,
    MathUtils,
    Points,
    PointsMaterial,
    BufferGeometry,
    BufferAttribute,
    LineSegments,
    LineBasicMaterial,
    Color,
  } = await import("three")
  if (!canvas.value) return // 載入期間已卸載
  init({
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    Vector3,
    BoxGeometry,
    MeshLambertMaterial,
    InstancedMesh,
    Group,
    Object3D,
    MathUtils,
    Points,
    PointsMaterial,
    BufferGeometry,
    BufferAttribute,
    LineSegments,
    LineBasicMaterial,
    Color,
  })
})

onUnmounted(() => dispose())

function init(THREE) {
  const el = canvas.value
  const wrap = el.parentElement
  const mobile = window.matchMedia("(max-width: 768px)").matches
  const fine = window.matchMedia("(pointer: fine)").matches
  const depth = mobile ? 1 : 2

  const renderer = new THREE.WebGLRenderer({
    canvas: el,
    antialias: false,
    alpha: true,
    powerPreference: "low-power",
  })
  renderer.setPixelRatio(1 / PIXEL)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200)

  scene.add(new THREE.AmbientLight(0xffffff, 0.35))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(4, 6, 8)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffffff, 0.5)
  fill.position.set(-6, -2, 4)
  scene.add(fill)

  // 星點 + 星座線：取代舊的 canvas 2D 粒子背景，併進同一個渲染迴圈；游標靠近會把星點撥開，之後彈回原位
  const STAR_N = mobile ? 70 : 140
  const LINK = 5 // 世界單位，兩星距離小於這個就連線
  const stars = Array.from({ length: STAR_N }, () => ({
    nx: Math.random() * 2 - 1, // 視錐內的正規化座標，resize 時換算成世界座標
    ny: Math.random() * 2 - 1,
    z: -8 - Math.random() * 18, // 都在閃電後面
    hx: 0, hy: 0, x: 0, y: 0, vx: 0, vy: 0,
  }))
  const starPos = new Float32Array(STAR_N * 3)
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3)) // BufferAttribute 直接用同一個陣列，不複製
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1, sizeAttenuation: false, transparent: true, opacity: 0.8 })
  scene.add(new THREE.Points(starGeo, starMat))
  const MAX_LINKS = STAR_N * 6
  const linePos = new Float32Array(MAX_LINKS * 6)
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3))
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 })
  scene.add(new THREE.LineSegments(lineGeo, lineMat))
  const halfH = (z) => (camera.position.z - z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))
  const layoutStars = () => {
    for (const s of stars) {
      const hh = halfH(s.z) * 1.1
      s.hx = s.x = s.nx * hh * camera.aspect
      s.hy = s.y = s.ny * hh
    }
  }
  const mouse = { nx: 0, ny: 0, on: false }
  const updateStars = () => {
    for (const s of stars) {
      if (mouse.on) {
        const hh = halfH(s.z)
        const dx = s.x - mouse.nx * hh * camera.aspect
        const dy = s.y - mouse.ny * hh
        const d2 = dx * dx + dy * dy
        const r = hh * 0.25
        if (d2 < r * r) {
          const d = Math.sqrt(d2) || 1
          s.vx += (dx / d) * 0.05
          s.vy += (dy / d) * 0.05
        }
      }
      s.vx += (s.hx - s.x) * 0.004 // 回原位的彈簧
      s.vy += (s.hy - s.y) * 0.004
      s.vx *= 0.94
      s.vy *= 0.94
      s.x += s.vx
      s.y += s.vy
    }
    stars.forEach((s, i) => {
      starPos[i * 3] = s.x
      starPos[i * 3 + 1] = s.y
      starPos[i * 3 + 2] = s.z
    })
    starGeo.attributes.position.needsUpdate = true
    let n = 0
    for (let i = 0; i < STAR_N && n < MAX_LINKS; i++) {
      for (let j = i + 1; j < STAR_N && n < MAX_LINKS; j++) {
        const a = stars[i]
        const b = stars[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dz = a.z - b.z
        if (dx * dx + dy * dy + dz * dz < LINK * LINK) {
          const o = n * 6
          linePos[o] = a.x
          linePos[o + 1] = a.y
          linePos[o + 2] = a.z
          linePos[o + 3] = b.x
          linePos[o + 4] = b.y
          linePos[o + 5] = b.z
          n++
        }
      }
    }
    lineGeo.setDrawRange(0, n * 2)
    lineGeo.attributes.position.needsUpdate = true
  }
  let offX = 0
  let offY = 0
  let wrapW = 1
  let wrapH = 1

  // 目標座標：閃電置中
  const cols = BOLT[0].length
  const rows = BOLT.length
  const targets = []
  const accent = [] // 每個方塊是否上色（點陣裡的 @）
  BOLT.forEach((row, y) => {
    for (let z = 0; z < depth; z++) {
      for (let x = 0; x < cols; x++) {
        if (row[x] === ".") continue
        targets.push(new THREE.Vector3(x - (cols - 1) / 2, (rows - 1) / 2 - y, z - (depth - 1) / 2))
        accent.push(row[x] === "@")
      }
    }
  })
  const count = targets.length
  const geo = new THREE.BoxGeometry(0.92, 0.92, 0.92)
  const mat = new THREE.MeshLambertMaterial({ color: 0xf2f2f2 })
  const mesh = new THREE.InstancedMesh(geo, mat, count)
  const white = new THREE.Color(0xf2f2f2)
  const amber = new THREE.Color(0xf5a623)
  accent.forEach((a, i) => mesh.setColorAt(i, a ? amber : white))
  mesh.instanceColor.needsUpdate = true
  const group = new THREE.Group()
  group.add(mesh)
  scene.add(group)

  // 散開位置：進場用整個畫面的隨機位置；炸開用沿目標方向往外噴
  const starts = targets.map(() => new THREE.Vector3())
  const startRot = targets.map(() => [
    Math.random() * 6,
    Math.random() * 6,
    Math.random() * 6,
  ])
  const scatterWide = () =>
    starts.forEach((s) =>
      s.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40 - 20,
      ),
    )
  const scatterBlast = () =>
    starts.forEach((s, i) => {
      const k = 8 + Math.random() * 6 // 沿自己的方向往外噴 8～14 倍
      s.set(
        targets[i].x * k + (Math.random() - 0.5) * 24,
        targets[i].y * k + (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 60,
      )
    })
  const order = gsap.utils.shuffle(targets.map((_, i) => i))
  const dummy = new THREE.Object3D()
  const tmp = new THREE.Vector3()
  const SPREAD = 0.6 // stagger 佔整段的比例
  const state = { t: 0 } // 0 = 全散開，1 = 聚合成閃電
  const place = () => {
    for (let i = 0; i < count; i++) {
      const k = gsap.utils.clamp(
        0,
        1,
        (state.t - (order[i] / count) * SPREAD) / (1 - SPREAD),
      )
      const e = 1 - (1 - k) ** 3 // cubic out
      tmp.lerpVectors(starts[i], targets[i], e)
      dummy.position.copy(tmp)
      dummy.rotation.set(
        startRot[i][0] * (1 - e),
        startRot[i][1] * (1 - e),
        startRot[i][2] * (1 - e),
      )
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }
  scatterWide()
  place()
  let tween = gsap.to(state, {
    t: 1,
    duration: 2.2,
    delay: 0.4,
    ease: "none",
    onUpdate: place,
  })

  // hold to blast：按住炸開，放開聚合
  const blast = () => {
    tween.kill()
    scatterBlast()
    tween = gsap.to(state, {
      t: 0,
      duration: 0.5,
      ease: "power3.out",
      onUpdate: place,
    })
  }
  const assemble = () => {
    tween.kill()
    tween = gsap.to(state, {
      t: 1,
      duration: 1.6,
      ease: "none",
      onUpdate: place,
    })
  }

  // 相機距離：閃電佔畫面高的 40% 或寬的 55%，取較遠者
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
    const r = wrap.getBoundingClientRect()
    offX = r.left + window.scrollX
    offY = r.top + window.scrollY
    wrapW = w
    wrapH = h
    layoutStars()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(wrap)

  // 互動：滑鼠位置傾斜（只有精準指標）、拖曳旋轉（滑鼠與手指都可）、按住炸開、閒置自轉
  const tilt = { x: 0, y: 0 }
  const cur = { x: 0, y: 0 }
  let spin = 0 // 拖曳累積的 Y 軸角度（左右拖）
  let vel = 0
  let spinX = 0 // 拖曳累積的 X 軸角度（上下拖，滑鼠才有；手機垂直手勢留給頁面捲動）
  let velX = 0
  let dragging = false
  let blasted = false
  let holdTimer = 0
  let downX = 0
  let downY = 0
  let lastX = 0
  let lastY = 0
  const onMove = (e) => {
    // 星點用 pageX 減 resize 時算好的位移，不在 mousemove 裡強制排版
    mouse.nx = ((e.pageX - offX) / wrapW) * 2 - 1
    mouse.ny = -(((e.pageY - offY) / wrapH) * 2 - 1)
    mouse.on = true
    if (dragging) {
      if (holdTimer && Math.hypot(e.clientX - downX, e.clientY - downY) > 4) {
        clearTimeout(holdTimer)
        holdTimer = 0
      }
      vel = (e.clientX - lastX) * 0.008
      velX = (e.clientY - lastY) * 0.008
      spin += vel
      spinX += velX
      lastX = e.clientX
      lastY = e.clientY
      return
    }
    if (!fine) return
    tilt.y = (e.clientX / window.innerWidth - 0.5) * 0.6
    tilt.x = (e.clientY / window.innerHeight - 0.5) * 0.4
  }
  const onDown = (e) => {
    dragging = true
    downX = lastX = e.clientX
    downY = lastY = e.clientY
    vel = 0
    holdTimer = setTimeout(() => {
      holdTimer = 0
      blasted = true
      blast()
    }, HOLD_MS)
  }
  const onUp = () => {
    dragging = false
    clearTimeout(holdTimer)
    holdTimer = 0
    if (blasted) {
      blasted = false
      assemble()
    }
  }
  window.addEventListener("pointermove", onMove, { passive: true })
  el.addEventListener("pointerdown", onDown)
  window.addEventListener("pointerup", onUp)
  window.addEventListener("pointercancel", onUp)

  const render = (time) => {
    if (!dragging) {
      spin += vel
      spinX += velX
      vel *= 0.95 // 放開後慣性衰減
      velX *= 0.95
    }
    if (props.motion?.active) {
      tilt.x = props.motion.tilt.x
      tilt.y = props.motion.tilt.y
    }
    cur.x += (tilt.x - cur.x) * 0.06
    cur.y += (tilt.y - cur.y) * 0.06
    group.rotation.y = time * 0.25 + spin + cur.y
    group.rotation.x = Math.sin(time * 0.6) * 0.08 + cur.x + spinX
    updateStars()
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
    tween.kill()
    clearTimeout(holdTimer)
    window.removeEventListener("pointermove", onMove)
    el.removeEventListener("pointerdown", onDown)
    window.removeEventListener("pointerup", onUp)
    window.removeEventListener("pointercancel", onUp)
    geo.dispose()
    starGeo.dispose()
    starMat.dispose()
    lineGeo.dispose()
    lineMat.dispose()
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
