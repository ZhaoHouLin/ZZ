<script setup>
// 04 早期作品（docs/LOGO-REDESIGN.md W2）：GitHub 六行大字清單 + 100 Days CSS 攤成 10×10 百日格
// 依 PRODUCT.md 標明時期；橫向拖曳已拿掉（選 W2 時的取捨），點格子仍開 CodePen 視窗
import github from "~/data/github.json"
import pens from "~/data/css100.json"

const { gsap } = useGsap()
const active = ref(-1)
const root = ref(null)
const pad = (n) => String(n).padStart(3, "0")
const shortTitle = (t) => t.replace(/\s*\(.*\)\s*$/, "")
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".gh-row", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.8,
      stagger: 0.07,
      ease: "expo.out",
      scrollTrigger: { trigger: ".gh-list", start: "top 85%" },
    })
    // 百日格：一百格依對角線順序點亮
    gsap.from(".day", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: { grid: [10, 10], from: "start", amount: 1 },
      scrollTrigger: { trigger: ".days", start: "top 85%" },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.works#works(ref="root")
  .sec-head
    span.sec-idx 04
    h2 Early Works
    span.works-archive Archive 2020–2022
  .works-grid
    div
      h3.works-sub GitHub
        span.works-count {{ pad(github.length) }}
      ol.gh-list
        li(v-for="(g, i) in github" :key="g.href")
          a.gh-row(:href="g.href" target="_blank" rel="noopener" data-cursor="open")
            span.gh-no {{ pad(i + 1) }}
            span.gh-title {{ g.title }}
            svg.gh-arrow(viewBox="0 0 16 16" aria-hidden="true")
              path(d="M4 12 L12 4 M5 4 H12 V11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square")
    div
      h3.works-sub 100 Days CSS
        span.works-count {{ pad(pens.length) }}
      ol.days
        li(v-for="(p, i) in pens" :key="p.src")
          button.day(type="button" :class="{ 'is-active': active === i }" :title="shortTitle(p.title)" :aria-label="`第 ${i + 1} 天：${shortTitle(p.title)}`" data-cursor="open" @click="active = i") {{ pad(i + 1) }}

  PenModal(:pens="pens" v-model:index="active")
</template>

<style lang="stylus" scoped>
.works
  max-width 78rem
  margin 0 auto
  padding 6rem outlineSpace 9rem

.sec-head
  sectionHead()

.works-archive
  labelPlate(1rem)
  margin-left auto
  background-color transparent
  color colorSecondary
  outline 1px solid colorSecondary
  &::before
    background-color colorSecondary

.works-grid
  display grid
  grid-template-columns minmax(0, 1fr) minmax(0, 1fr)
  gap 4rem
  align-items start

.works-sub
  display flex
  align-items baseline
  gap .8rem
  margin-bottom 1rem
  font-family fontDisplay
  font-weight 900
  font-size 1.6rem
  letter-spacing .04em
  text-transform uppercase
  .works-count
    font-family fontMono
    font-weight 500
    font-size .8rem
    color colorMuted
    font-variant-numeric tabular-nums

// GitHub 大字清單
.gh-list
  list-style none
  border-top 1px solid colorLine
.gh-row
  display grid
  grid-template-columns 3.2rem 1fr auto
  align-items center
  gap 1rem
  padding .9rem .6rem
  border-bottom 1px solid colorLine
  transition background-color .25s ease, color .25s ease
  &:hover, &:focus-visible
    background-color colorSecondary
    color colorPrimary
    .gh-no
      color colorMutedOnPaper
    .gh-arrow
      transform translate(3px, -3px)
.gh-no
  font-family fontMono
  font-size .75rem
  color colorMuted
.gh-title
  font-family fontDisplay
  font-weight 900
  font-size clamp(1.6rem, 2.6vw, 2.2rem)
  line-height 1.05
  letter-spacing .02em
.gh-arrow
  size(1.1rem)
  transition transform .3s ease

// 百日格
.days
  list-style none
  display grid
  grid-template-columns repeat(10, minmax(0, 1fr))
  gap .3rem
.day
  width 100%
  aspect-ratio 1
  display grid
  place-items center
  border 1px solid #3a3a3a
  font-family fontDisplay
  font-weight 900
  font-size clamp(.72rem, 1.1vw, 1rem)
  font-variant-numeric tabular-nums
  color #cfcfcf
  transition background-color .2s ease, color .2s ease, border-color .2s ease
  &:hover, &:focus-visible, &.is-active
    background-color colorSecondary
    border-color colorSecondary
    color colorPrimary

@media (max-width: 960px)
  .works-grid
    grid-template-columns 1fr
    gap 3rem

@media (max-width: breakMobile)
  .works
    padding-block 4rem 6rem
  .sec-head
    flex-wrap wrap
  .works-archive
    margin-left 0
  .days
    gap .2rem
  .day
    font-family fontMono
    font-weight 500
    font-size .56rem
</style>
