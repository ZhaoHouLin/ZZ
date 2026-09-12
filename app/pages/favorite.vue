<script setup>
import album from "~/data/album.json"

useSeoMeta({ title: "Favorite — ZZ" })

const { gsap } = useGsap()
const root = ref(null)
const broken = ref({}) // 找不到圖片時顯示占位
const interests = ["3C 產品", "網頁程式新知", "線上遊戲", "爬山"]
let ctx

onMounted(() => {
  // SSR 頁面上圖片可能在 hydration 前就 404，@error 不會觸發，這裡補查一次
  root.value.querySelectorAll(".album-item img").forEach((img, i) => {
    if (img.complete && img.naturalWidth === 0) broken.value[i] = true
  })

  ctx = gsap.context(() => {
    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(".couplet h2", { yPercent: 30, opacity: 0, duration: 1.4, stagger: 0.2 })
      .from(".fav-kicker", { opacity: 0, x: -20, duration: 0.8 }, "-=0.8")
    gsap.from(".interest", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: ".interests", start: "top 85%" },
    })
    gsap.from(".album-item", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: { trigger: ".album", start: "top 80%" },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
.page-favorite(ref="root")
  section.fav-hero
    ClientOnly
      RidgeLines
    .fav-kicker
      span.fav-idx 01
      span 山 / Mountain
    .couplet
      h2 走路要找難路走
      h2 挑擔要揀重擔挑

  section.fav-section.interests
    .fav-head
      span.fav-idx 02
      h2 Interests
    ul.interest-list
      li.interest(v-for="(t, i) in interests" :key="t" data-hover)
        span.interest-num {{ String(i + 1).padStart(2, "0") }}
        span {{ t }}

  section.fav-section.album
    .fav-head
      span.fav-idx 03
      h2 Album
    .album-grid
      figure.album-item(v-for="(a, i) in album" :key="a.src" :class="{ 'is-broken': broken[i] }" data-hover)
        img(:src="a.src" :alt="a.title" loading="lazy" @error="broken[i] = true")
        .album-placeholder(v-if="broken[i]") {{ String(i + 1).padStart(2, "0") }}
        figcaption {{ a.title }}
</template>

<style lang="stylus" scoped>
.page-favorite
  padding-bottom 6rem

.fav-hero
  position relative
  size(100%,100vh)
  min-height 600px
  overflow hidden
  flex()

.fav-kicker
  position absolute
  top 8rem
  left outlineSpace
  flex(flex-start,baseline)
  gap 1rem
  font-family fontDigital
  font-size 1.2rem
  letter-spacing .2em
  color colorMuted

.fav-idx
  font-family fontDigital
  font-size 1.2rem
  color colorAccent

.couplet
  position relative
  flex(center,flex-start,row-reverse)
  gap 3rem
  h2
    writing-mode vertical-lr
    font-size clamp(1.8rem, 5vh, 3.4rem)
    font-weight 900
    letter-spacing .45em
    line-height 1
    background-image linear-gradient(180deg, colorSecondary 0%, colorSecondary 55%, colorAccent 100%)
    -webkit-background-clip text
    background-clip text
    -webkit-text-fill-color transparent
    &:nth-child(1)
      margin-top -4rem
    &:nth-child(2)
      margin-top 4rem

.fav-section
  max-width 70rem
  margin 6rem auto 0
  padding 0 outlineSpace

.fav-head
  flex(flex-start,baseline)
  gap 1rem
  margin-bottom 2rem
  padding-bottom 1rem
  border-bottom 1px solid colorLine
  h2
    font-family fontPixel
    font-size 2.6rem
    line-height 1
    font-weight 400
    text-transform uppercase

.interest-list
  list-style none
  display grid
  grid-template-columns repeat(auto-fill, minmax(14rem, 1fr))
  gap 1px
  background-color colorLine
  border 1px solid colorLine
  .interest
    flex(flex-start,baseline)
    gap 1rem
    padding 1.6rem 1.4rem
    background-color colorPrimary
    font-size 1.3rem
    font-weight 700
    letter-spacing .1em
    transition background-color .4s ease
    .interest-num
      font-family fontDigital
      font-size 1.1rem
      color colorMuted
      transition color .3s
    &:hover
      background-color rgba(255,255,255,.05)
      .interest-num
        color colorAccent

.album-grid
  display grid
  grid-template-columns repeat(auto-fill, minmax(18rem, 1fr))
  gap 1.5rem

.album-item
  position relative
  aspect-ratio 4 / 3
  overflow hidden
  border 1px solid colorLine
  background-color #0d0d0d
  img
    size()
    object-fit cover
    display block
    filter grayscale(1) contrast(1.1)
    transform scale(1.02)
    transition filter .6s ease, transform .8s cubic-bezier(.76,0,.24,1)
  &.is-broken img
    display none
  .album-placeholder
    pos()
    transform translate(-50%,-50%)
    font-family fontPixel
    font-size 4rem
    color rgba(255,255,255,.12)
  figcaption
    position absolute
    left 0
    right 0
    bottom 0
    padding .8rem 1rem
    background linear-gradient(transparent, rgba(0,0,0,.8))
    font-size .95rem
    letter-spacing .1em
    transform translateY(100%)
    transition transform .5s cubic-bezier(.76,0,.24,1)
  &:hover
    img
      filter grayscale(0) contrast(1)
      transform scale(1.08)
    figcaption
      transform translateY(0)

@media (max-width: breakMobile)
  .couplet
    gap 1.5rem
    h2
      &:nth-child(1)
        margin-top -3rem
      &:nth-child(2)
        margin-top 3rem
  .fav-kicker
    top 6rem
  .fav-section
    margin-top 4rem
</style>
