<script setup>
// 右側索引：七塊小標籤牌 00～06，目前所在區反白；在白紙 hero 上換成黑框版本。手機只剩一條進度線
const { gsap, ScrollTrigger } = useGsap()

const sections = [
  { id: "top", no: "00", label: "Top" },
  { id: "about", no: "01", label: "About" },
  { id: "resume", no: "02", label: "Resume" },
  { id: "lab", no: "03", label: "Lab" },
  { id: "works", no: "04", label: "Early Works" },
  { id: "mountain", no: "05", label: "Mountain" },
  { id: "contact", no: "06", label: "Contact" },
]

const active = ref("top")
const progress = ref(0)
let triggers = []

onMounted(() => {
  // 只看各區塊的頂端過中線：往下進入就亮該區，往上退出就亮前一區
  triggers = sections.slice(1).map((s, i) =>
    ScrollTrigger.create({
      trigger: `#${s.id}`,
      start: "top center",
      onEnter: () => (active.value = s.id),
      onLeaveBack: () => (active.value = sections[i].id),
    })
  )
  triggers.push(ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => (progress.value = self.progress) }))
})

onUnmounted(() => triggers.forEach((t) => t.kill()))

// 只在點索引時改 hash，捲動不改，避免歷史紀錄被塞滿
const go = (id) => {
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`)
  gsap.to(window, { scrollTo: { y: id === "top" ? 0 : `#${id}`, autoKill: false }, duration: 1, ease: "power3.inOut" })
}
</script>

<template lang="pug">
nav.side-index(aria-label="區塊索引" :class="{ 'on-paper': active === 'top' }")
  ul.side-list
    li(v-for="s in sections" :key="s.id")
      button.side-item(type="button" :class="{ 'is-active': active === s.id }" :aria-current="active === s.id ? 'true' : null" @click="go(s.id)")
        span.side-label {{ s.label }}
        span.side-num {{ s.no }}
  .side-progress(aria-hidden="true")
    .side-progress-bar(:style="{ transform: `scaleY(${progress})` }")
</template>

<style lang="stylus" scoped>
.side-index
  --fg colorSecondary
  --bg colorPrimary
  position fixed
  right outlineSpace
  top 50%
  transform translateY(-50%)
  z-index 9040
  &.on-paper
    --fg colorPrimary
    --bg colorSecondary

.side-list
  list-style none
  flex(center, flex-end, column)
  gap .45rem

.side-item
  position relative
  display block
  padding .3rem 0 .3rem .6rem // 放大點擊範圍
  .side-num
    display block
    min-width 2.8rem
    padding .3rem .4rem .25rem
    border 1.5px solid var(--fg)
    font-family fontMono
    font-size .8rem
    font-weight 500
    line-height 1
    text-align center
    color var(--fg)
    background-color transparent
    font-variant-numeric tabular-nums
    transition background-color .25s ease, color .25s ease, border-color .25s ease
  // 標籤脫離文流，平常不佔寬度
  .side-label
    position absolute
    right 100%
    top 50%
    margin-right .2rem
    padding .2rem .5rem
    white-space nowrap
    transform translate(.4rem, -50%)
    font-family fontDisplay
    font-weight 900
    font-size 1rem
    letter-spacing .06em
    text-transform uppercase
    color var(--fg)
    opacity 0
    transition opacity .25s, transform .25s
    pointer-events none
  &:hover .side-label, &:focus-visible .side-label
    opacity 1
    transform translate(0, -50%)
  &.is-active .side-num
    background-color var(--fg)
    color var(--bg)

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
    size(2px, 100%)
    background-color colorLine
  .side-progress-bar
    size()
    background-color colorSecondary
    transform-origin top
    transform scaleY(0)
</style>
