<script setup>
const { gsap, ScrollTrigger } = useGsap()

const root = ref(null)
const clock = ref("--:--:--")
const ext = ref(0) // 0 → 3030：以前工作的分機號碼，放在左上的 LED 面板裡當聯絡資訊
const motion = useGyroTilt() // 陀螺儀開關，見 useGyroTilt.js
const motionBtn = ref(false) // iOS 要按鈕授權
let ctx
let timer

const tick = () => {
  const d = new Date()
  clock.value = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":")
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
  if (motion.available) motion.needsPermission ? (motionBtn.value = true) : motion.enable()

  ctx = gsap.context(() => {
    // 進場：動內層元素
    gsap
      .timeline({ defaults: { ease: "expo.out", duration: 1.2 } })
      .from(".hero-panel > *", { opacity: 0, x: -16, stagger: 0.1, duration: 0.8 })
      .from(".ring", { opacity: 0, scale: 0.85 }, "-=0.6")
      .from(".hero-motto", { opacity: 0, y: 30 }, "-=0.8")
      .from(".hero-sub", { opacity: 0, y: 16 }, "-=0.9")
      .from(".hero-info > *", { opacity: 0, y: 24, stagger: 0.08 }, "-=0.9")
      .from(".line", { scaleX: 0, scaleY: 0, duration: 1 }, "-=1")
      .from(".hero-hint, .hero-scroll", { opacity: 0 }, "-=0.5")

    const o = { v: 0 }
    gsap.to(o, { v: 3030, duration: 2.4, delay: 0.8, ease: "power2.inOut", onUpdate: () => (ext.value = Math.round(o.v)) })

    // 捲動視差：動外層容器，避免和進場動畫搶同一個屬性
    gsap
      .timeline({
        scrollTrigger: { trigger: root.value, start: "top top", end: "bottom top", scrub: true },
      })
      .to(".hero-panel", { yPercent: -120, opacity: 0 }, 0)
      .to(".hero-ring-wrap", { scale: 1.6, opacity: 0 }, 0)
      .to(".hero-statement", { yPercent: 40, opacity: 0 }, 0)
      .to(".hero-info", { y: 60, opacity: 0 }, 0)
      .to(".hero-bg", { scale: 0.8, opacity: 0 }, 0) // 閃電往後退並淡出

    // 預渲染的 HTML 先用 CSS 藏住，等 from() 寫好起始狀態再顯示，避免靜態畫面閃一下又重播進場
    gsap.set(root.value, { visibility: "visible" })
  }, root.value)
})

onUnmounted(() => {
  clearInterval(timer)
  motion.disable()
  ctx?.revert()
})
</script>

<template lang="pug">
section.hero(ref="root")
  .hero-bg
    ClientOnly
      VoxelZZ(:motion="motion")
  .hero-fade
  .hero-panel
    .hero-clock {{ clock }}
    .hero-ext
      span.hero-ext-label ext
      | {{ String(ext).padStart(4, "0") }}
    .hero-city taipei · tw
  .hero-ring-wrap
    HeroRing
  .hero-hint hold ⚡ to blast
  button.hero-motion(v-if="motionBtn" type="button" @click="motion.enable().then((ok) => (motionBtn = !ok))") ◎ motion
  .hero-statement
    h1.hero-motto 我命由我不由天
    p.hero-sub AI Application · Cloud Native · Web
  .hero-info
    .hero-name
      ScrambleText(:words="['ZhaoHou Lin', 'Raiden', '林炤后']")
    a.hero-mail(href="mailto:rodes5292@gmail.com") rodes5292@gmail.com
    a.hero-phone(href="tel:+886906822708") +886 906-822-708
  .line.line-top
  .line.line-left
  .line.line-right
  .hero-scroll
    span scroll
    .hero-scroll-bar
</template>

<style lang="stylus" scoped>
.hero
  position relative
  size(100%,100vh)
  min-height 640px
  overflow hidden
  visibility hidden // onMounted 建好進場動畫後才顯示

.hero-bg
  position absolute
  inset 0

// 用靜態漸層蓋在畫布上做邊緣淡出，取代 mask-image：mask 會讓每一幀都多一次全螢幕離屏合成
.hero-fade
  position absolute
  inset 0
  pointer-events none
  background radial-gradient(ellipse at center, transparent 40%, colorPrimary 80%)

// 左上 LED 面板：時鐘、分機、城市
.hero-panel
  position absolute
  top outlineSpace
  left outlineSpace
  z-index 2
  flex(flex-start,flex-start,column)
  gap .3rem
  font-family fontDigital
  letter-spacing .2em
  text-transform uppercase
  pointer-events none
  .hero-clock
    font-size 2.6rem
    line-height 1
  .hero-ext
    font-size 1.4rem
    color colorMuted
    .hero-ext-label
      margin-right .6rem
      color colorAccent
  .hero-city
    font-size .9rem
    color colorMuted

.hero-ring-wrap
  position absolute
  inset 0
  z-index 1
  pointer-events none // 蓋滿整個 hero，不能擋住底下閃電的拖曳與按住

// 放頂部中央：底部中央有 scroll 提示，圓環底下放不下
.hero-hint
  pos(50%, auto)
  top outlineSpace + .6rem
  transform translateX(-50%)
  z-index 2
  font-family fontDigital
  font-size .85rem
  letter-spacing .3em
  text-transform uppercase
  color colorMuted
  pointer-events none

// iOS 陀螺儀授權按鈕，授權後消失
.hero-motion
  position absolute
  top outlineSpace + 3rem
  right outlineSpace
  z-index 2
  padding .4rem .7rem
  border 1px solid colorLine
  font-family fontDigital
  font-size .85rem
  letter-spacing .2em
  text-transform uppercase
  color colorMuted

.hero-statement
  position absolute
  left outlineSpace
  bottom outlineSpace
  z-index 2
  pointer-events none
  .hero-motto
    font-size clamp(2.2rem, 5vw, 4.4rem)
    font-weight 900
    line-height 1.1
    letter-spacing .12em
  .hero-sub
    margin-top .6rem
    font-family fontDigital
    font-size 1rem
    letter-spacing .3em
    text-transform uppercase
    color colorMuted

// 要鋪滿 hero 並自帶定位：捲動時 GSAP 會給它 transform，有 transform 的元素會變成子元素的定位基準，
// 若它高度是 0，右下的名字與聯絡資訊會跑到頂端被切掉
.hero-info
  position absolute
  inset 0
  z-index 2
  pointer-events none
  .hero-name, .hero-phone, .hero-mail
    position absolute
    pointer-events auto
  .hero-name
    right outlineSpace
    bottom outlineSpace
    font-size 2rem
    font-weight 700
    letter-spacing .05em
    width 16rem
    text-align right
  .hero-mail, .hero-phone
    bottom outlineSpace + 4rem // 直書往上長，太高會碰到右側索引
    writing-mode vertical-lr
    transform rotate(180deg)
    font-family fontPixel
    font-size 2rem
    color colorMuted
    transition color .3s
    &:hover
      color colorSecondary
  .hero-mail
    right outlineSpace
  .hero-phone
    right outlineSpace + 2.8rem

.line
  position absolute
  z-index 2
  background-color colorSecondary
  opacity .6
  &.line-top
    top outlineSpace + .5rem
    left outlineSpace + 11rem
    size(15rem,1px)
    transform-origin left
  &.line-left
    top outlineSpace + 8rem
    left outlineSpace
    size(1px,12rem)
    transform-origin top
  &.line-right
    bottom outlineSpace + 20rem
    right outlineSpace
    size(15rem,1px)
    transform-origin right

.hero-scroll
  pos(50%, auto)
  bottom outlineSpace
  transform translateX(-50%)
  z-index 2
  flex(center,center,column)
  gap .5rem
  font-family fontDigital
  font-size .9rem
  letter-spacing .3em
  text-transform uppercase
  color colorMuted
  .hero-scroll-bar
    size(1px,3rem)
    background-color colorSecondary
    transform-origin top
    animation scrollHint 1.8s cubic-bezier(.76,0,.24,1) infinite

@keyframes scrollHint
  0%
    transform scaleY(0)
    transform-origin top
  50%
    transform scaleY(1)
    transform-origin top
  51%
    transform-origin bottom
  100%
    transform scaleY(0)
    transform-origin bottom

@media (max-width: breakMobile)
  .hero-panel .hero-clock
    font-size 1.8rem
  .hero-statement
    bottom outlineSpace + 4rem
    .hero-motto
      font-size 2rem
    .hero-sub
      font-size .8rem
  .hero-info
    .hero-name
      width 8rem
      font-size 1rem
    .hero-mail, .hero-phone
      font-size 1.5rem
      bottom outlineSpace + 12rem
  .line.line-top, .line.line-right
    display none
  .hero-scroll
    display none
</style>
