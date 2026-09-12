<script setup>
const { gsap, ScrollTrigger } = useGsap()

const root = ref(null)
const clock = ref("--:--:--")
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
      .from(".ring", { opacity: 0, scale: 0.85 }, "-=0.9")
      .from(".hero-info > *", { opacity: 0, y: 24, stagger: 0.08 }, "-=0.8")
      .from(".line", { scaleX: 0, scaleY: 0, duration: 1 }, "-=1")
      .from(".hero-scroll", { opacity: 0 }, "-=0.5")

    // 捲動視差：動外層容器，避免和進場動畫搶同一個屬性
    gsap
      .timeline({
        scrollTrigger: { trigger: root.value, start: "top top", end: "bottom top", scrub: true },
      })
      .to(".hero-logo", { yPercent: -120, opacity: 0 }, 0)
      .to(".hero-ring-wrap", { scale: 1.6, opacity: 0 }, 0)
      .to(".hero-info", { yPercent: 40, opacity: 0 }, 0)
      .to(".hero-bg", { opacity: 0 }, 0)
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
      ParticleField
  .hero-logo
    .hero-logo-box ZZ
    .hero-clock {{ clock }}
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

.hero-bg
  position absolute
  inset 0
  mask-image radial-gradient(ellipse at center, #000 40%, transparent 80%)

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
