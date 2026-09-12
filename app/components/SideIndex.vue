<script setup>
// 右側區塊索引：捲到哪一區就亮哪一格；手機只剩一條進度線
const { gsap, ScrollTrigger } = useGsap()

const sections = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "github", label: "GitHub" },
  { id: "css", label: "CSS" },
  { id: "mountain", label: "Mountain" },
  { id: "album", label: "Album" },
]

const active = ref("")
const progress = ref(0)
let triggers = []

onMounted(() => {
  // 只看各區塊的頂端過中線：往下進入就亮該區，往上退出就亮前一區（hero 沒有索引所以是空字串）。
  // 不用 end，釘住的區塊（100 Days CSS）元素高度不含釘住距離，用 bottom 會提早熄掉
  triggers = sections.map((s, i) =>
    ScrollTrigger.create({
      trigger: `#${s.id}`,
      start: "top center",
      onEnter: () => (active.value = s.id),
      onLeaveBack: () => (active.value = sections[i - 1]?.id ?? ""),
    })
  )
  triggers.push(ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => (progress.value = self.progress) }))
})

onUnmounted(() => triggers.forEach((t) => t.kill()))

// 只在點索引時改 hash，捲動不改，避免歷史紀錄被塞滿
const go = (id) => {
  history.replaceState(null, "", `#${id}`)
  gsap.to(window, { scrollTo: { y: `#${id}`, autoKill: false }, duration: 1, ease: "power3.inOut" })
}
</script>

<template lang="pug">
nav.side-index(aria-label="sections" :class="{ 'is-idle': !active }")
  ul.side-list
    li(v-for="(s, i) in sections" :key="s.id")
      button.side-item(type="button" :class="{ 'is-active': active === s.id }" @click="go(s.id)")
        span.side-num
          span.side-digit(v-for="d in String(i + 1).padStart(2, '0')" :key="d") {{ d }}
        span.side-label {{ s.label }}
  .side-progress(aria-hidden="true")
    .side-progress-bar(:style="{ transform: `scaleY(${progress})` }")
</template>

<style lang="stylus" scoped>
.side-index
  position fixed
  right outlineSpace
  top 50%
  transform translateY(-50%)
  z-index 9040
  transition opacity .4s ease
  // 在 hero 沒有任何一區是作用中，索引沒有意義，也會和 hero 右側的直書聯絡資訊打架
  &.is-idle
    opacity 0
    pointer-events none

.side-list
  list-style none
  flex(center,flex-end,column)
  gap .6rem

.side-item
  position relative
  display block
  font-family fontDigital
  font-size 1rem
  letter-spacing .15em
  color colorMuted
  transition color .3s
  // 標籤脫離文流，透明時不佔寬度，編號才會對齊
  .side-label
    position absolute
    right 100%
    top 0
    margin-right .6rem
    white-space nowrap
    text-transform uppercase
    opacity 0
    transform translateX(.4rem)
    transition opacity .3s, transform .3s
  &:hover, &.is-active
    color colorSecondary
    .side-label
      opacity 1
      transform none
  &.is-active
    color colorAccent
  // Digital-7 的「1」比其他數字窄，靠右對齊會讓 01 的 0 偏左；每個數字固定一格寬
  .side-digit
    display inline-block
    width 1ch
    text-align center

.side-progress
  display none

@media (max-width: breakMobile)
  .side-index
    top 0
    right 0
    bottom 0
    transform none
  .side-list
    display none
  .side-progress
    display block
    size(2px,100%)
    background-color colorLine
  .side-progress-bar
    size()
    background-color colorAccent
    transform-origin top
    transform scaleY(0)
</style>
