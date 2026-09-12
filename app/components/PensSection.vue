<script setup>
import pens from "~/data/css100.json"

const { gsap } = useGsap()
const active = ref(-1)
const root = ref(null)
const pad = (n) => String(n).padStart(3, "0")
const shortTitle = (t) => t.replace(/\s*\(.*\)\s*$/, "")
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
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
section.pens#css(ref="root")
  .sec-head
    span.sec-idx 04
    h2 100 Days CSS
    span.sec-count {{ pad(pens.length) }}
  .pen-grid
    button.pen-tile(v-for="(p, i) in pens" :key="p.src" type="button" :class="{ 'is-active': active === i }" @click="active = i" :title="p.title")
      span.pen-tile-num {{ pad(i + 1) }}
      span.pen-tile-name {{ shortTitle(p.title) }}

  PenModal(:pens="pens" v-model:index="active")
</template>

<style lang="stylus" scoped>
.pens
  max-width 80rem
  margin 0 auto
  padding 0 outlineSpace 8rem

.sec-head
  sectionHead()

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
  .pen-grid
    grid-template-columns repeat(auto-fill, minmax(4.4rem, 1fr))
  .pen-tile .pen-tile-num
    font-size 1.4rem
</style>
