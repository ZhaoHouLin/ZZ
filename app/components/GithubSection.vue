<script setup>
import github from "~/data/github.json"

const { gsap } = useGsap()
const root = ref(null)
const pad = (n) => String(n).padStart(3, "0")
let ctx
let stopTilt = () => {}

onMounted(() => {
  stopTilt = useTilt(root.value, ".gh-card", { max: 6 })
  ctx = gsap.context(() => {
    gsap.from(".gh-card", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: ".gh-grid", start: "top 85%" },
    })
  }, root.value)
})

onUnmounted(() => {
  stopTilt()
  ctx?.revert()
})
</script>

<template lang="pug">
section.github#github(ref="root")
  .sec-head
    span.sec-idx 04
    h2 GitHub
    span.sec-count {{ pad(github.length) }}
  .gh-grid
    a.gh-card(v-for="(g, i) in github" :key="g.href" :href="g.href" target="_blank" rel="noopener")
      span.gh-idx {{ pad(i + 1) }}
      span.gh-title {{ g.title }}
      span.gh-arrow ↗
</template>

<style lang="stylus" scoped>
.github
  max-width 70rem
  margin 0 auto
  padding 0 outlineSpace 8rem

.sec-head
  sectionHead()

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
  transition color .4s ease, transform .2s ease
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
</style>
