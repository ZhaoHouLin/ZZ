<script setup>
// Hero（docs/LOGO-REDESIGN.md K3 裁 A）：白紙、巨大 ZZ 左端出框、EXT 3030 標籤牌、ZERO ZONE、底部斜紋帶（全站唯一一次）
// Signature interaction：按住畫面為閃電充電。ZZ 先變淡，筆畫從頭慢慢描下去、越接近底部抖得越厲害；
// 描到底才劈下並讓整個 hero 反白一下。中途放開就洩掉，筆畫恢復原狀、不閃
const CHARGE = 1.6 // 充滿所需秒數
const { gsap, SplitText } = useGsap()

const root = ref(null)
const mark = ref(null)
const ext = ref(0) // 0 → 3030：以前工作的分機號碼
const charge = ref(-1) // -1 = 沒在按；0～100 = 充電百分比
const struck = ref(false) // 剛劈下，提示文字換一句
let ctx
let len = 0
let strike
let off = () => {}
let flow // 斜紋帶的無限流動（平常慢，按住時跟著充電加速）
let spark // 電光點：每隔幾秒沿著 ZZ 的筆畫跑一趟
let io
const BASE_SPEED = 1 // 滑鼠停在斜紋帶上時的速度（timeScale，1 = 每秒移動一個條紋週期）；平常靜止
let bandHover = false
const idleSpeed = () => (bandHover ? BASE_SPEED : 0)

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

// 描線：從頭到尾加速劈下，最後一格觸發閃光
const draw = (duration = 0.75) => {
  const p = mark.value.path
  strike?.kill()
  strike = gsap
    .timeline()
    .set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
    .to(p, { strokeDashoffset: 0, duration, ease: "power4.in" })
    .to(root.value, { "--flash": 1, duration: 0.04 })
    .to(root.value, { "--flash": 0, duration: 0.35, ease: "power2.out" })
}
// 按住：筆畫從頭充到底，抖動隨進度加大；充滿就劈下
const hold = () => {
  const p = mark.value.path
  const svg = mark.value.$el
  strike?.kill()
  struck.value = false
  spark?.pause(0)
  gsap.set(".zz-beams", { opacity: 0 })
  const st = { v: 0 }
  const fromSpeed = flow ? flow.timeScale() : 0 // 從按下當下的流速往上加，不從頭開始
  strike = gsap
    .timeline()
    .set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
    .to(st, {
      v: 1,
      duration: CHARGE,
      ease: "power1.in",
      onUpdate: () => {
        charge.value = Math.round(st.v * 100)
        flow?.timeScale(fromSpeed + st.v * 6) // 電越充越滿，條紋流得越快
        gsap.set(p, { strokeDashoffset: len * (1 - st.v) })
        const j = st.v * st.v * 7 // 越接近充滿抖得越厲害
        gsap.set(svg, { x: gsap.utils.random(-j, j), y: gsap.utils.random(-j, j) })
      },
      onComplete: () => {
        charge.value = -1
        struck.value = true
        gsap.timeline()
          .to(root.value, { "--flash": 1, duration: 0.04 })
          .to(root.value, { "--flash": 0, duration: 0.45, ease: "power2.out" })
        gsap.fromTo(svg, { x: 14, y: -8 }, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" })
        // 劈下：條紋猛衝一下再慢慢回到平常速度，電光點稍後恢復
        if (flow) gsap.fromTo(flow, { timeScale: 14 }, { timeScale: idleSpeed(), duration: 1.6, ease: "power3.out" })
        gsap.delayedCall(2, () => spark?.restart(true))
      },
    })
}
// 放開：還沒充滿就洩掉，筆畫往回收，再完整淡回來；已經劈下就不動
const release = () => {
  if (charge.value < 0) return
  const p = mark.value.path
  strike?.kill()
  charge.value = -1
  gsap.to(mark.value.$el, { x: 0, y: 0, duration: 0.2 })
  if (flow) gsap.to(flow, { timeScale: idleSpeed(), duration: 0.8, ease: "power2.out" }) // 洩掉：條紋慢慢回到平常狀態
  gsap.delayedCall(1.2, () => spark?.restart(true))
  strike = gsap
    .timeline()
    .to(p, { strokeDashoffset: len, duration: 0.3, ease: "power2.in" })
    .set(p, { strokeDasharray: "none", opacity: 0 })
    .to(p, { opacity: 1, duration: 0.35 })
}

onMounted(() => {
  const p = mark.value.path
  len = p.getTotalLength()

  ctx = gsap.context(() => {
    const motto = SplitText.create(root.value.querySelector(".hero-motto"), { type: "chars", mask: "chars" })

    // 進場：閃電先劈下，其他元素隨後落定
    if (!reduced()) draw(1.1)
    gsap
      .timeline({ defaults: { ease: "expo.out", duration: 1 }, delay: 0.9 })
      .from(".hero-ext", { yPercent: -120, opacity: 0, duration: 0.6 })
      .from(motto.chars, { yPercent: 110, stagger: 0.05 }, "-=0.3")
      .from(".hero-name, .hero-sub", { opacity: 0, y: 16, stagger: 0.08 }, "-=0.7")
      .from(".hero-band", { scaleX: 0, transformOrigin: "left", duration: 0.9 }, "-=0.9")
      .from(".hero-hint", { opacity: 0 }, "-=0.4")

    gsap.to({ v: 0 }, { v: 3030, duration: 2.2, delay: 1.1, ease: "power2.inOut", onUpdate() { ext.value = Math.round(this.targets()[0].v) } })

    // 捲動：主標語逐字飄散（動遮罩外框，不和進場的 chars 搶屬性），閃電往上退
    gsap
      .timeline({ scrollTrigger: { trigger: root.value, start: "top top", end: "bottom top", scrub: true } })
      .to(motto.masks, { x: () => gsap.utils.random(-80, 80), y: () => gsap.utils.random(60, 160), rotation: () => gsap.utils.random(-30, 30), opacity: 0, ease: "power1.in" }, 0)
      .to(".hero-mark-wrap", { yPercent: -18, ease: "none" }, 0)
      .to(".hero-meta", { y: 60, opacity: 0 }, 0)

    if (!reduced()) {
      // 斜紋帶：比畫面寬一個週期的條紋層往右平移一個週期再接回，無縫循環；只動 transform
      const period = () => parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.677 // 和 CSS 的 --stripe-period 一致
      flow = gsap.fromTo(".hero-band-flow", { x: 0 }, { x: period, duration: 1, ease: "none", repeat: -1 })
      flow.timeScale(0) // 平常靜止，滑鼠移到條紋上才流
      const band = root.value.querySelector(".hero-band")
      const setHover = (v) => () => {
        bandHover = v
        if (charge.value < 0) gsap.to(flow, { timeScale: idleSpeed(), duration: v ? 0.6 : 0.9, ease: "power2.out" })
      }
      band.addEventListener("mouseenter", setHover(true))
      band.addEventListener("mouseleave", setHover(false))
      // 電流光束：直接畫在 ZZ 的筆畫路徑上，只亮移動中的一小段，所以會完全貼著筆畫、在轉角跟著彎過去。
      // 各層前端對齊在同一點，由長到短、由淡到亮；越跑越快、光束也越拉越長。
      // 做法是 stroke-dasharray 只留一段、stroke-dashoffset 決定這段落在路徑的哪裡
      const n = mark.value.beams.length - 1
      const layers = mark.value.beams.map((el, i) => ({ el, base: 1.5 + (n - i) * 0.55, grow: 2 + (n - i) * 1.6 }))
      const pos = { p: 0 }
      const paint = () => {
        const head = pos.p * len
        for (const { el, base, grow } of layers) {
          const L = base + grow * pos.p
          el.style.strokeDasharray = `${L} ${len + L}`
          el.style.strokeDashoffset = `${L - head}`
        }
      }
      spark = gsap
        .timeline({ repeat: -1, repeatDelay: 3.2, delay: 3 })
        .set(".zz-beams", { opacity: 1 })
        .fromTo(pos, { p: 0 }, { p: 1, duration: 1.1, ease: "power2.in", onUpdate: paint, immediateRender: false }, 0)
        .to(".zz-beams", { opacity: 0, duration: 0.18 }, 1.1)
      // hero 不在畫面上就暫停這兩個循環
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { flow.resume(); if (charge.value < 0) spark.resume() }
        else { flow.pause(); spark.pause() }
      })
      io.observe(root.value)
    }

    // 預渲染的 HTML 先用 CSS 藏住，等 from() 寫好起始狀態再顯示，避免靜態畫面閃一下又重播進場
    gsap.set(root.value, { visibility: "visible" })
  }, root.value)

  // 按住：連結與按鈕上不觸發
  const onDown = (e) => {
    if (e.button > 0 || e.target.closest("a, button")) return
    if (reduced()) return
    hold()
  }
  const noMenu = (e) => charge.value >= 0 && e.preventDefault() // 手機長按不要跳出選單
  root.value.addEventListener("pointerdown", onDown)
  root.value.addEventListener("contextmenu", noMenu)
  window.addEventListener("pointerup", release)
  window.addEventListener("pointercancel", release) // 手指一滑變成捲動時也算放開
  off = () => {
    root.value?.removeEventListener("pointerdown", onDown)
    root.value?.removeEventListener("contextmenu", noMenu)
    window.removeEventListener("pointerup", release)
    window.removeEventListener("pointercancel", release)
  }
})

onUnmounted(() => {
  io?.disconnect()
  off()
  strike?.kill()
  ctx?.revert()
})
</script>

<template lang="pug">
section.hero#top(ref="root" data-cursor="hold" data-paper)
  .hero-mark-wrap
    ZzMark.hero-mark(ref="mark" ghost beam)
  .hero-ext
    span.hero-ext-label ext
    span.hero-ext-num {{ String(ext).padStart(4, "0") }}
  .hero-meta
    h1.hero-motto ZERO ZONE
    p.hero-name
      ScrambleText(:words="['ZhaoHou Lin', 'Raiden', '林炤后']")
    p.hero-sub AI Application / Cloud Native / Web
  p.hero-hint(aria-live="polite")
    template(v-if="charge >= 0") 充電中 {{ String(charge).padStart(3, "0") }}%
    template(v-else-if="struck") 劈下了。再按住一次
    template(v-else) 按住畫面，為閃電充電
  .hero-band(aria-hidden="true")
    .hero-band-flow
</template>

<style lang="stylus" scoped>
// 版面依構圖稿（1600×900）換算：ZZ 的 100 單位方框是 1.22 倍視窗高，筆畫左緣出框約 13% 視窗高，上緣約在 6.6%
heroH = unquote("max(100vh, 640px)")

.hero
  --flash 0
  position relative
  height heroH
  overflow hidden
  background-color colorSecondary
  color colorPrimary
  visibility hidden // onMounted 建好進場動畫後才顯示
  user-select none
  // 閃電描完的一瞬間整個 hero 反白
  &::after
    content ''
    position absolute
    inset 0
    z-index 5
    background-color colorPrimary
    opacity calc(var(--flash) * .9)
    pointer-events none

.hero-mark-wrap
  position absolute
  left -40.8vh
  top -20.8vh
  size(122vh)
  will-change transform
  pointer-events none
.hero-mark
  size()
  color colorPrimary

.hero-ext
  labelPlate(1.6rem) // mixin 會設 position relative，定位要寫在它後面
  position absolute
  top outlineSpace
  right calc(1.4rem + 4rem) // 讓開漢堡
  background-color colorPrimary
  color colorSecondary
  &::before
    background-color colorSecondary
  .hero-ext-label
    font-family fontMono
    font-size .6em
    font-weight 400
    letter-spacing .2em
  .hero-ext-num
    min-width 4ch

.hero-meta
  position absolute
  right calc(1.4rem + 4rem)
  bottom calc(4.5rem + 12vh)
  text-align right
  display grid
  gap .6rem
  justify-items end

.hero-motto
  font-family fontDisplay
  font-weight 900
  font-size clamp(3.2rem, 11vh, 6rem)
  line-height .9
  letter-spacing .04em
  white-space nowrap

.hero-name
  font-size clamp(1.2rem, 3vh, 1.8rem)
  font-weight 900
  letter-spacing .04em
  min-height 1.2em

.hero-sub
  font-family fontDisplay
  font-weight 800
  font-size 1.15rem
  letter-spacing .12em
  text-transform uppercase
  color colorMutedOnPaper

.hero-hint
  position absolute
  left outlineSpace
  bottom calc(4.5rem + 1.2rem)
  font-family fontMono
  font-size .75rem
  letter-spacing .16em
  color colorMutedOnPaper

// 斜紋帶：全站唯一一次。條紋層比畫面寬一個水平週期（45 度條紋的垂直週期 2.6rem × √2），往右平移一個週期剛好接回原位
.hero
  --stripe-period 3.677rem
.hero-band
  position absolute
  left 0
  right 0
  bottom 0
  height 4.5rem
  overflow hidden
.hero-band-flow
  position absolute
  top 0
  bottom 0
  left calc(var(--stripe-period) * -1)
  right 0
  background-image repeating-linear-gradient(-45deg, colorPrimary 0 1.3rem, colorSecondary 1.3rem 2.6rem)
  will-change transform

@media (max-width: breakMobile)
  .hero-mark-wrap
    left -38.5vw
    top 7vh
    size(133vw)
  .hero-ext
    font-size 1.2rem
    left outlineSpace
    right auto
    background-color colorPrimary
    color colorSecondary
    &::before
      background-color colorSecondary
  .hero-meta
    left outlineSpace
    right outlineSpace
    bottom calc(3.2rem + 5.5rem)
    text-align left
    justify-items start
  .hero-motto
    font-size clamp(2.8rem, 14vw, 4rem)
  .hero-sub
    font-size .66rem
  .hero-hint
    bottom calc(3.2rem + .8rem)
    font-size .66rem
  .hero-band
    height 3.2rem
</style>
