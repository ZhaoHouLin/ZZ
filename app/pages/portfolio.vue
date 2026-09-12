<script setup>
import github from "~/data/github.json"
import pens from "~/data/css100.json"

useSeoMeta({ title: "Portfolio — ZZ" })

const { gsap } = useGsap()
const active = ref(-1)
const root = ref(null)
const pad = (n) => String(n).padStart(3, "0")
const shortTitle = (t) => t.replace(/\s*\(.*\)\s*$/, "")
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".pf-title, .pf-sub", { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "expo.out" })
    gsap.from(".gh-card", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: ".gh-grid", start: "top 85%" },
    })
    gsap.from(".pen-tile", {
      opacity: 0,
      scale: 0.7,
      duration: 0.5,
      ease: "back.out(1.6)",
      stagger: { each: 0.012, from: "start" },
      scrollTrigger: { trigger: ".pen-grid", start: "top 85%" },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
.page-portfolio(ref="root")
  header.pf-header
    h1.pf-title Portfolio
    p.pf-sub GitHub 專案與 100 Days CSS 挑戰

  section.pf-section
    .pf-head
      span.pf-idx 01
      h2 GitHub
      span.pf-count {{ pad(github.length) }}
    .gh-grid
      a.gh-card(v-for="(g, i) in github" :key="g.href" :href="g.href" target="_blank" rel="noopener")
        span.gh-idx {{ pad(i + 1) }}
        span.gh-title {{ g.title }}
        span.gh-arrow ↗

  section.pf-section
    .pf-head
      span.pf-idx 02
      h2 100 Days CSS
      span.pf-count {{ pad(pens.length) }}
    .pen-grid
      button.pen-tile(v-for="(p, i) in pens" :key="p.src" type="button" :class="{ 'is-active': active === i }" @click="active = i" :title="p.title")
        span.pen-tile-num {{ pad(i + 1) }}
        span.pen-tile-name {{ shortTitle(p.title) }}

  PenModal(:pens="pens" v-model:index="active")
</template>

<style lang="stylus" scoped>
.page-portfolio
  max-width 80rem
  margin 0 auto
  padding 8rem outlineSpace 6rem

.pf-header
  margin-bottom 5rem
  .pf-title
    font-family fontPixel
    font-size clamp(4rem, 12vw, 9rem)
    line-height 1
    font-weight 400
    text-transform uppercase
  .pf-sub
    margin-top 1rem
    font-size 1.1rem
    letter-spacing .15em
    color colorMuted

.pf-section
  margin-bottom 6rem

.pf-head
  flex(flex-start,baseline)
  gap 1rem
  margin-bottom 2rem
  padding-bottom 1rem
  border-bottom 1px solid colorLine
  .pf-idx, .pf-count
    font-family fontDigital
    font-size 1.2rem
  .pf-idx
    color colorAccent
  .pf-count
    margin-left auto
    color colorMuted
  h2
    font-family fontPixel
    font-size 2.6rem
    line-height 1
    font-weight 400
    text-transform uppercase

.gh-grid
  display grid
  grid-template-columns repeat(auto-fill, minmax(16rem, 1fr))
  gap 1px
  background-color colorLine
  border 1px solid colorLine

.gh-card
  position relative
  flex(space-between,flex-start,column)
  min-height 11rem
  padding 1.4rem
  background-color colorPrimary
  overflow hidden
  transition color .4s ease
  &::before
    content ''
    position absolute
    inset 0
    background-color colorSecondary
    transform translateY(101%)
    transition transform .5s cubic-bezier(.76,0,.24,1)
  > *
    position relative
  .gh-idx
    font-family fontDigital
    font-size 1.1rem
    color colorMuted
  .gh-title
    font-size 1.4rem
    font-weight 700
    letter-spacing .03em
  .gh-arrow
    position absolute
    right 1.4rem
    bottom 1.2rem
    font-size 1.6rem
    transition transform .4s cubic-bezier(.76,0,.24,1)
  &:hover
    color colorPrimary
    &::before
      transform translateY(0)
    .gh-idx
      color colorAccent
    .gh-arrow
      transform translate(4px,-4px)

.pen-grid
  display grid
  grid-template-columns repeat(auto-fill, minmax(5.5rem, 1fr))
  gap .5rem

.pen-tile
  position relative
  aspect-ratio 4 / 5
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
    font-size 1.8rem
    line-height 1
  .pen-tile-name
    font-size .62rem
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
  .page-portfolio
    padding-top 6rem
  .pen-grid
    grid-template-columns repeat(auto-fill, minmax(4.4rem, 1fr))
  .pen-tile .pen-tile-num
    font-size 1.4rem
</style>
