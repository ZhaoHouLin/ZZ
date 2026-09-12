<script setup>
import { gsap } from "gsap"

// 一頁式後區塊跳轉交給 SideIndex，選單只放對外連結（docs/ONEPAGE-3D.md Q4 / Q14）
const links = [
  { href: "https://github.com/ZhaoHouLin", label: "GitHub", idx: "01", external: true },
  { href: "https://codepen.io/rodes", label: "CodePen", idx: "02", external: true },
  { href: "https://www.facebook.com/ZhaoHouLin", label: "Facebook", idx: "03", external: true },
  { href: "mailto:rodes5292@gmail.com", label: "Mail", idx: "04", external: false },
]

const open = useState("menuOpen", () => false)
const overlay = ref(null)
const items = ref([])
const meta = ref(null)

const toggle = () => (open.value = !open.value)
const onKey = (e) => e.key === "Escape" && (open.value = false)

let tl
onMounted(() => {
  // 起始值先用 GSAP 寫成和目標相同的單位，避免 CSS 的 px 與 % 混用時插值跳動；
  // 緩動用 power3.inOut 而不是 expo.inOut，後者前 25% 幾乎不動，看起來像停住
  gsap.set(overlay.value, { clipPath: "inset(50% 0% 50% 0%)" })
  tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } })
  tl.set(overlay.value, { pointerEvents: "auto" })
    .to(overlay.value, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 })
    .from(items.value, { yPercent: 110, opacity: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" }, "-=0.45")
    .from(meta.value, { opacity: 0, y: 10, duration: 0.4 }, "-=0.3")
  window.addEventListener("keydown", onKey)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKey)
  document.body.style.overflow = ""
})

watch(open, (v) => {
  if (!tl) return
  document.body.style.overflow = v ? "hidden" : ""
  v ? tl.timeScale(1).play() : tl.timeScale(1.6).reverse()
})
</script>

<template lang="pug">
button.hamburger(type="button" :class="{ 'is-open': open }" @click="toggle" aria-label="menu" :aria-expanded="open")
  span.bar
  span.bar
  span.bar

nav.menu(ref="overlay" :aria-hidden="!open")
  .menu-list
    a.menu-item(v-for="l in links" :key="l.href" :href="l.href" :target="l.external ? '_blank' : null" :rel="l.external ? 'noopener' : null" @click="open = false")
      span.menu-item-idx {{ l.idx }}
      span.menu-item-label(ref="items") {{ l.label }}
  .menu-meta(ref="meta")
    span ZhaoHou Lin
    span AI Application · Cloud Native · Web
</template>

<style lang="stylus" scoped>
.hamburger
  position fixed
  top outlineSpace
  right outlineSpace
  z-index 9100
  size(2.2rem,1.4rem)
  .bar
    position absolute
    left 0
    size(100%,3px)
    background-color colorSecondary
    border-radius 3px
    transition transform .5s cubic-bezier(.76,0,.24,1), opacity .3s ease
    &:nth-child(1)
      top 0
    &:nth-child(2)
      top 50%
      transform translateY(-50%)
    &:nth-child(3)
      bottom 0
  &.is-open .bar
    &:nth-child(1)
      transform translateY(.6rem) rotate(45deg)
    &:nth-child(2)
      opacity 0
      transform translateY(-50%) scaleX(0)
    &:nth-child(3)
      transform translateY(-.6rem) rotate(-45deg)
      background-color colorAccent

.menu
  position fixed
  inset 0
  z-index 9050
  clip-path inset(50% 0 50% 0)
  pointer-events none
  background-color colorPrimary
  flex(space-between,flex-start,column)
  padding 8rem outlineSpace outlineSpace
  background-image linear-gradient(colorLine 1px, transparent 1px), linear-gradient(90deg, colorLine 1px, transparent 1px)
  background-size 4rem 4rem
  background-position center

.menu-list
  flex(center,flex-start,column)
  gap .5rem

.menu-item
  display flex
  align-items baseline
  gap 1rem
  overflow hidden
  font-family fontPixel
  font-size clamp(3.5rem, 12vw, 9rem)
  line-height 1
  text-transform uppercase
  color colorSecondary
  .menu-item-idx
    font-family fontDigital
    font-size 1rem
    color colorMuted
  .menu-item-label
    display inline-block
    background-image linear-gradient(90deg, colorAccent, colorAccent)
    background-repeat no-repeat
    background-size 0% 100%
    -webkit-background-clip text
    background-clip text
    transition background-size .5s cubic-bezier(.76,0,.24,1), color .3s ease
  &:hover .menu-item-label
    color transparent
    background-size 100% 100%
  &:hover .menu-item-idx
    color colorAccent

.menu-meta
  flex(flex-start,center)
  gap 2rem
  font-family fontDigital
  font-size 1.1rem
  letter-spacing .1em
  color colorMuted

@media (max-width: breakMobile)
  .menu
    padding 6rem 1rem 1.5rem
  .menu-meta
    flex-direction column
    align-items flex-start
    gap .6rem
</style>
