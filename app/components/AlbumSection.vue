<script setup>
import album from "~/data/album.json"

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
    gsap.from(".interest", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: ".interest-list", start: "top 85%" },
    })
    gsap.from(".album-item", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: { trigger: ".album-grid", start: "top 80%" },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.album#album(ref="root")
  .sec-head
    span.sec-idx 06
    h2 Album
    span.sec-count {{ String(album.length).padStart(3, "0") }}
  ul.interest-list
    li.interest(v-for="(t, i) in interests" :key="t" data-hover)
      span.interest-num {{ String(i + 1).padStart(2, "0") }}
      span {{ t }}
  .album-grid
    figure.album-item(v-for="(a, i) in album" :key="a.src" :class="{ 'is-broken': broken[i] }" data-hover)
      img(:src="a.src" :alt="a.title" loading="lazy" @error="broken[i] = true")
      .album-placeholder(v-if="broken[i]") {{ String(i + 1).padStart(2, "0") }}
      figcaption {{ a.title }}
</template>

<style lang="stylus" scoped>
.album
  max-width 70rem
  margin 0 auto
  padding 0 outlineSpace 8rem

.sec-head
  sectionHead()

.interest-list
  list-style none
  display grid
  grid-template-columns repeat(auto-fill, minmax(14rem, 1fr))
  gap 1px
  margin-bottom 1.5rem
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
</style>
