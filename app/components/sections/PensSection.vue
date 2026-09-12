<script setup>
// 100 格橫向拖曳瀏覽（docs/ONEPAGE-3D.md Q3 改版）：原生橫向捲動容器，觸控與觸控板直接可用；
// 滑鼠用 Draggable 的 scrollLeft 模式拖曳，放開有慣性
import pens from "~/data/css100.json"
import { Draggable } from "gsap/Draggable"
import { InertiaPlugin } from "gsap/InertiaPlugin"

const { gsap } = useGsap()
gsap.registerPlugin(Draggable, InertiaPlugin)

const active = ref(-1)
const root = ref(null)
const viewport = ref(null)
const progress = ref(0)
const pad = (n) => String(n).padStart(3, "0")
const shortTitle = (t) => t.replace(/\s*\(.*\)\s*$/, "")
let ctx
let drag
let onScroll = () => {}
let stopTilt = () => {}

onMounted(() => {
  const el = viewport.value
  onScroll = () => (progress.value = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1))
  el.addEventListener("scroll", onScroll, { passive: true })

  // 只有滑鼠裝置才用 Draggable；觸控走原生橫向捲動。Draggable 會攔截 touchstart，瀏覽器就不合成 click，格子會點不開
  if (window.matchMedia("(pointer: fine)").matches) {
    ;[drag] = Draggable.create(el, {
      type: "scrollLeft",
      inertia: true,
      edgeResistance: 0.85,
      dragClickables: true, // 從格子上也能開始拖，沒拖動時 click 照常觸發
      allowEventDefault: true, // 觸控筆電用手指滑時不擋原生事件
    })
  }

  // hover 傾斜保留 CSS 原本的 -2px 位移；拖曳中不傾斜
  stopTilt = useTilt(el, ".pen-tile", { max: 10, extra: "translate(-2px,-2px)", enabled: () => !drag?.isDragging })

  ctx = gsap.context(() => {
    gsap.from(".pen-tile", {
      opacity: 0,
      scale: 0.7,
      duration: 0.5,
      ease: "back.out(1.6)",
      stagger: { each: 0.012, from: "start" },
      scrollTrigger: { trigger: el, start: "top 85%" },
    })
  }, root.value)
})

onUnmounted(() => {
  stopTilt()
  viewport.value?.removeEventListener("scroll", onScroll)
  drag?.kill()
  ctx?.revert()
})
</script>

<template lang="pug">
section.pens#css(ref="root" data-glyph="css")
  SectionBg(idx="05" variant="glow")
  .sec-head
    span.sec-idx 05
    h2 100 Days CSS
    span.sec-count {{ pad(pens.length) }}
  .pen-viewport(ref="viewport" data-cursor="drag")
    .pen-track
      button.pen-tile(v-for="(p, i) in pens" :key="p.src" type="button" :class="{ 'is-active': active === i }" @click="active = i" :title="p.title" data-cursor="open")
        span.pen-tile-num {{ pad(i + 1) }}
        span.pen-tile-name {{ shortTitle(p.title) }}
  .pen-foot(aria-hidden="true")
    span.pen-hint drag / scroll →
    .pen-progress
      .pen-progress-bar(:style="{ transform: `scaleX(${progress})` }")

  PenModal(:pens="pens" v-model:index="active")
</template>

<style lang="stylus" scoped>
.pens
  max-width 80rem
  margin 0 auto
  padding 0 outlineSpace 8rem

.sec-head
  sectionHead()

.pen-viewport
  overflow-x auto
  overflow-y hidden
  overscroll-behavior-x contain // 觸控板滑到底不要觸發瀏覽器的上一頁
  scrollbar-width none
  &::-webkit-scrollbar
    display none

.pen-track
  display grid
  user-select none // 滑鼠拖曳時不要選到文字
  width max-content
  grid-template-rows repeat(2, 11rem)
  grid-auto-flow column
  grid-auto-columns 8.8rem
  gap .5rem
  padding 4px 4px 4px 0 // 留給 hover 位移與硬陰影

.pen-foot
  flex(flex-start,center)
  gap 1.5rem
  margin-top 1rem
  font-family fontDigital
  font-size 1rem
  letter-spacing .15em
  color colorMuted
  .pen-hint
    white-space nowrap

.pen-progress
  flex-grow 1 // 不能寫 flex 1，會被 style.styl 的 flex() mixin 吃掉
  flex-basis 0
  height 1px
  background-color colorLine
  .pen-progress-bar
    size()
    background-color colorAccent
    transform-origin left
    transform scaleX(0)

.pen-tile
  position relative
  flex(center,center,column)
  gap .3rem
  padding .4rem
  border 1px solid rgba(255,255,255,.35)
  border-radius 2px
  color colorSecondary
  overflow hidden
  transition transform .3s ease, background-color .3s ease, color .3s ease, box-shadow .3s ease, border-color .3s ease
  .pen-tile-num
    font-family fontPixel
    font-size 2.4rem
    line-height 1
  .pen-tile-name
    font-size .75rem
    line-height 1.2
    letter-spacing .02em
    text-align center
    color colorMuted
    transition color .3s
    display -webkit-box
    -webkit-line-clamp 2
    -webkit-box-orient vertical
    overflow hidden
  &:hover, &.is-active
    background-color colorSecondary
    color colorPrimary
    border-color colorSecondary
    transform translate(-2px,-2px)
    box-shadow 4px 4px 0 colorAccent
    .pen-tile-name
      color colorPrimary

@media (max-width: breakMobile)
  .pen-track
    grid-template-rows repeat(2, 8rem)
    grid-auto-columns 6.4rem
  .pen-tile .pen-tile-num
    font-size 1.8rem
  .pen-tile .pen-tile-name
    display none
</style>
