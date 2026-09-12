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
  triggers = sections.map((s) =>
    ScrollTrigger.create({
      trigger: `#${s.id}`,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => self.isActive && (active.value = s.id),
    })
  )
  // 回到 hero 時沒有任何一區在中線上，清掉高亮
  triggers.push(ScrollTrigger.create({ trigger: "#about", start: "top center", onLeaveBack: () => (active.value = "") }))
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
nav.side-index(aria-label="sections")
  ul.side-list
    li(v-for="(s, i) in sections" :key="s.id")
      button.side-item(type="button" :class="{ 'is-active': active === s.id }" @click="go(s.id)")
        span.side-num {{ String(i + 1).padStart(2, "0") }}
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
