<script setup>
const { gsap, ScrollTrigger } = useGsap()

const root = ref(null)
const clock = ref("--:--:--")
const num = ref(0) // 0 → 3030：以前工作的分機號碼，不是 100 Days CSS；位置待整體設計重看
let ctx
let timer

const tick = () => {
  const d = new Date()
  clock.value = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":")
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)

  ctx = gsap.context(() => {
    // 進場：動內層元素
    gsap
      .timeline({ defaults: { ease: "expo.out", duration: 1.2 } })
      .from(".hero-logo-box", { clipPath: "inset(0 100% 0 0)", duration: 1 })
      .from(".hero-clock", { opacity: 0, y: 10 }, "-=0.6")
      .from(".hero-count", { opacity: 0, y: -10 }, "-=0.6")
      .from(".ring", { opacity: 0, scale: 0.85 }, "-=0.9")
      .from(".hero-info > *", { opacity: 0, y: 24, stagger: 0.08 }, "-=0.8")
      .from(".line", { scaleX: 0, scaleY: 0, duration: 1 }, "-=1")
      .from(".hero-scroll", { opacity: 0 }, "-=0.5")

    // 預渲染的 HTML 先用 CSS 藏住，等 from() 寫好起始狀態再顯示，避免靜態畫面閃一下又重播進場
    gsap.set(root.value, { visibility: "visible" })

    const o = { v: 0 }
    gsap.to(o, { v: 3030, duration: 2.4, delay: 0.8, ease: "power2.inOut", onUpdate: () => (num.value = Math.round(o.v)) })

    // 捲動視差：動外層容器，避免和進場動畫搶同一個屬性
    gsap
      .timeline({
        scrollTrigger: { trigger: root.value, start: "top top", end: "bottom top", scrub: true },
      })
      .to(".hero-logo", { yPercent: -120, opacity: 0 }, 0)
      .to(".hero-ring-wrap", { scale: 1.6, opacity: 0 }, 0)
      .to(".hero-info", { yPercent: 40, opacity: 0 }, 0)
      .to(".hero-bg", { scale: 0.8, opacity: 0 }, 0) // 3D 物件往後退並淡出
  }, root.value)
})

onUnmounted(() => {
  clearInterval(timer)
  ctx?.revert()
})
</script>

<template lang="pug">
section.hero(ref="root")
  .hero-bg
    ClientOnly
      VoxelZZ
  .hero-fade
  .hero-logo
    .hero-logo-box ZZ
    .hero-clock {{ clock }}
  .hero-count
    .hero-count-num
      span.hero-count-hash #
      | {{ String(num).padStart(4, "0") }}
  .hero-ring-wrap
    HeroRing
  .hero-info
    .hero-name
      ScrambleText(:words="['ZhaoHou Lin', 'Raiden', '林炤后']")
    a.hero-phone(href="tel:+886906822708") +886 906-822-708
    a.hero-mail(href="mailto:rodes5292@gmail.com") rodes5292@gmail.com
  .line.line-top
  .line.line-left
  .line.line-slash
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

.hero-logo
  position absolute
  top outlineSpace
  left outlineSpace
  z-index 2
  .hero-logo-box
    flex()
    padding 0 .6rem
    border 2px solid colorSecondary
    font-family fontPixel
    font-size 7rem
    line-height 1
  .hero-clock
    margin-top .5rem
    font-family fontDigital
    font-size 1.4rem
    letter-spacing .2em
    color colorMuted

.hero-ring-wrap
  position absolute
  inset 0
  z-index 1
  pointer-events none // 蓋滿整個 hero，不能擋住底下 3D 物件的拖曳
  will-change transform // 捲動時 scale 到 1.6，沒有這行 Chrome 會每幀依新比例重繪圓環文字

.hero-count
  position absolute
  top outlineSpace + 3.2rem
  right outlineSpace
  z-index 2
  text-align right
  .hero-count-num
    font-family fontPixel
    font-size 3.6rem
    line-height 1
    letter-spacing .2rem
    .hero-count-hash
      color colorAccent

.hero-info
  z-index 2
  .hero-name, .hero-phone, .hero-mail
    position absolute
  .hero-name
    right outlineSpace
    bottom outlineSpace
    font-size 1.4rem
    font-weight 700
    letter-spacing .05em
    width 12rem
    text-align right
  .hero-phone
    left outlineSpace
    bottom outlineSpace
    writing-mode vertical-lr
    font-family fontPixel
    font-size 2.4rem
    color colorMuted
    transition color .3s
    &:hover
      color colorSecondary
  .hero-mail
    right outlineSpace
    bottom outlineSpace + 6rem
    writing-mode vertical-lr
    transform rotate(180deg)
    font-family fontPixel
    font-size 2.4rem
    color colorMuted
    transition color .3s
    &:hover
      color colorSecondary

.line
  position absolute
  z-index 2
  background-color colorSecondary
  opacity .6
  &.line-top
    top outlineSpace + .5rem
    left outlineSpace + 12rem
    size(15rem,1px)
    transform-origin left
  &.line-left
    top outlineSpace + 10rem
    left outlineSpace
    size(1px,12rem)
    transform-origin top
  &.line-slash
    bottom outlineSpace
    left outlineSpace + 3rem
    size(1px,12rem)
    transform-origin bottom
    transform rotate(45deg)
    opacity .3
  &.line-right
    bottom outlineSpace
    right outlineSpace + 14rem
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
  .hero-logo .hero-logo-box
    font-size 4.5rem
  .hero-count .hero-count-num
    font-size 2.6rem
  .hero-info .hero-name
    width 8rem
    font-size 1.1rem
  .hero-info .hero-phone, .hero-info .hero-mail
    font-size 1.6rem
  .line.line-top, .line.line-right
    display none
  .hero-scroll
    display none
</style>
