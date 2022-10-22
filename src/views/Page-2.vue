<script setup>
import { ref, onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
const props = defineProps({
  title: String,
})

const numberOfLines = ref(40)
const lineCounter = numberOfLines.value / 2

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".lines",
      start: "100% 90%",
      end: "100% 70%",
      // markers: true,
      scrub: 3,
    },
  })

  for (let i = 1; i <= numberOfLines.value; i++) {
    // tl.to(`.line-${2 * i - 1}`, { yPercent: "100" })
    tl.to(`.line-up-${i}`, { yPercent: "-100", border: "none" })
    tl.to(`.line-down-${i}`, { yPercent: "100" }, "<")
    // tl.to(`.line-${2 * i}`, { yPercent: "-100" }, "<")
    // tl.to(`.line-up-${i}`, { yPercent: "100" })
    // tl.to(`.line-down-${i}`, { yPercent: "-100" })
  }
})
</script>

<template lang="pug">
.page.page-2
  h1 {{props.title}} 
  .lines
    - for(let i=1;i<=40;i++)
      .line
        div(class=`line-up-${i}`)
        div(class=`line-down-${i}`)
      
</template>

<style lang="stylus" scoped>

numberOfLines = 40
lineCounter = numberOfLines / 2

.page-2
  position relative
  flex()
  background-color #eee
  transform translateX(100%)
.lines
  position absolute
  border 1px solid #000
  size()
  flex()
  .line
    // position relative
    size()
    flex(,,column)
    [class^='line-up-']
      size(,50%)
      // transform translateY(-100%)
      background-color #222
      border 1px solid #222
    [class^='line-down-']
      size(,50%)
      // transform translateY(100%)
      background-color #222
      border 1px solid #222
</style>
