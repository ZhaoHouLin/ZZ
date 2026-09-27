<script setup>
// 漢堡選單：打開是一張黑色配電箱面板，四塊大標籤牌放對外連結（區塊跳轉交給 SideIndex）
const { gsap, ScrollTrigger } = useGsap()

const links = [
  { href: "https://github.com/ZhaoHouLin", label: "GitHub", idx: "01", external: true },
  { href: "https://codepen.io/rodes", label: "CodePen", idx: "02", external: true },
  { href: "https://www.facebook.com/ZhaoHouLin", label: "Facebook", idx: "03", external: true },
  { href: "mailto:rodes5292@gmail.com", label: "Mail", idx: "04", external: false },
]

const open = useState("menuOpen", () => false)
const overlay = ref(null)
const panel = ref(null) // 選單底板，開關時縮放的就是它
const items = ref([])
const meta = ref(null)
const onPaper = ref(false) // 在白紙 hero 上漢堡換黑線
let paperTrigger

const toggle = () => (open.value = !open.value)
const onKey = (e) => e.key === "Escape" && (open.value = false)

let tl
onMounted(() => {
  const hero = document.querySelector("#top")
  if (hero) {
    // 每次捲動都依位置直接判斷；只靠進出事件的話，從頁首直接跳到下方區塊時狀態會卡住
    const check = () => (onPaper.value = window.scrollY < hero.offsetHeight - 40)
    paperTrigger = ScrollTrigger.create({ start: 0, end: "max", onUpdate: check, onRefresh: check })
    check()
  }

  // 底板從中間一條線往上下展開：動 transform 的 scaleY，交給 GPU 合成、不重畫。
  // 原本用 clip-path，每幀都要在主執行緒重畫整個全螢幕面板，展到一半面積最大時會頓
  tl = gsap.timeline({ paused: true })
  tl.set(overlay.value, { visibility: "visible", pointerEvents: "auto" })
    .fromTo(panel.value, { scaleY: 0 }, { scaleY: 1, duration: 0.55, ease: "expo.out" })
    .from(items.value, { xPercent: -12, opacity: 0, duration: 0.5, stagger: 0.06, ease: "expo.out" }, 0.18)
    .from(meta.value, { opacity: 0, y: 10, duration: 0.35, ease: "power2.out" }, 0.35)
  window.addEventListener("keydown", onKey)
})

onUnmounted(() => {
  paperTrigger?.kill()
  window.removeEventListener("keydown", onKey)
  document.body.style.overflow = ""
})

watch(open, (v) => {
  if (!tl) return
  document.body.style.overflow = v ? "hidden" : ""
  v ? tl.timeScale(1).play() : tl.timeScale(1.4).reverse()
})
</script>

<template lang="pug">
button.hamburger(type="button" :class="{ 'is-open': open, 'on-paper': onPaper && !open }" @click="toggle" aria-label="選單" :aria-expanded="open")
  span.bar
  span.bar
  span.bar

nav.menu(ref="overlay" :aria-hidden="!open")
  .menu-panel(ref="panel" aria-hidden="true")
  ul.menu-list
    li(v-for="l in links" :key="l.href")
      a.menu-item(ref="items" :href="l.href" :target="l.external ? '_blank' : null" :rel="l.external ? 'noopener' : null" @click="open = false")
        span.menu-item-idx {{ l.idx }}
        span.menu-item-label {{ l.label }}
  .menu-meta(ref="meta")
    span ZhaoHou Lin
    span AI Application / Cloud Native / Web
</template>

<style lang="stylus" scoped>
// 底板和目前的底色相同，漢堡蓋在內容上時線條不會和文字混在一起
.hamburger
  position fixed
  top calc(1.4rem - .6rem)
  right calc(1.4rem - .6rem)
  z-index 9100
  size(3.4rem, 2.6rem)
  --bar colorSecondary
  --plate colorPrimary
  background-color var(--plate)
  transition background-color .3s ease
  &.on-paper
    --bar colorPrimary
    --plate colorSecondary
  &.is-open
    --plate transparent
  .bar
    position absolute
    left .6rem
    size(2.2rem, 3px)
    background-color var(--bar)
    transition transform .5s cubic-bezier(.76, 0, .24, 1), opacity .3s ease, background-color .3s ease
    &:nth-child(1)
      top .6rem
    &:nth-child(2)
      top 50%
      transform translateY(-50%)
    &:nth-child(3)
      bottom .6rem
  &.is-open .bar
    &:nth-child(1)
      transform translateY(.6rem) rotate(45deg)
    &:nth-child(2)
      opacity 0
      transform translateY(-50%) scaleX(0)
    &:nth-child(3)
      transform translateY(-.6rem) rotate(-45deg)

// 配電箱面板：黑底、四角螺絲、白色大標籤牌。關閉時整個 nav 隱藏，打開時底板 .menu-panel 從中間縱向展開
.menu
  position fixed
  inset 0
  z-index 9050
  visibility hidden
  pointer-events none
  flex(space-between, flex-start, column)
  padding 8rem outlineSpace outlineSpace

.menu-panel
  position absolute
  inset 0
  z-index -1
  background-color colorPrimary
  border 1px solid colorLine
  transform scaleY(0)
  will-change transform
  &::before, &::after
    content ''
    position absolute
    size(.7rem)
    border-radius 50%
    border 2px solid colorMuted
  &::before
    top 1.6rem
    left 1.6rem
  &::after
    bottom 1.6rem
    right 1.6rem

.menu-list
  list-style none
  display grid
  gap 1rem

.menu-item
  display inline-flex
  align-items center
  gap 1.2rem
  .menu-item-idx
    font-family fontMono
    font-size .9rem
    color colorMuted
    min-width 2ch
  .menu-item-label
    labelPlate(clamp(2.6rem, 8vw, 5.5rem))
    transition background-color .25s ease, color .25s ease, outline-color .25s ease
    outline 2px solid transparent
  &:hover, &:focus-visible
    .menu-item-label
      background-color colorPrimary
      color colorSecondary
      outline-color colorSecondary
      &::before
        background-color colorSecondary

.menu-meta
  flex(flex-start, center)
  gap 2rem
  font-family fontMono
  font-size .8rem
  letter-spacing .14em
  text-transform uppercase
  color colorMuted

@media (max-width: breakMobile)
  .menu
    padding 6rem 1rem 1.5rem
  .menu-meta
    flex-direction column
    align-items flex-start
    gap .6rem
</style>
