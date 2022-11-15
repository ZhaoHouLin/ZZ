<script setup>
import { ref, onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const numberOfLines = ref(50)
const lineCounter = numberOfLines.value / 2

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page-3",
      start: "top bottom",
      end: "top",
      // markers: true,
      scrub: true,
    },
  })

  for (let i = 1; i <= numberOfLines.value; i++) {
    tl.to(`.line-up-${i}`, {
      transformOrigin: "50% 0%",
      transform: "scaleY(0)",
      border: "none",
    })
    tl.to(
      `.line-down-${i}`,
      {
        transformOrigin: "50% 100%",
        transform: "scaleY(0)",
      },
      "<"
    )
  }
})
</script>

<template lang="pug">
.line-animation
  .lines
    - for(let i=1;i<=50;i++)
      .line
        div(class=`line-up-${i}`)
        div(class=`line-down-${i}`)
      
</template>

<style lang="stylus" scoped>

numberOfLines = 50
lineCounter = numberOfLines / 2

.line-animation
  position fixed
  top 0
  flex()
  size()
  // background-color transparent
  // transform translateY(100%)
.lines
  position absolute
  size()
  flex()
  .line
    size()
    flex(,,column)
    [class^='line-up-'],[class^='line-down-']
      size(,50%)
    z-index 4
    for n in 1..numberOfLines
      rangeMapcolor = 1 - (n - 1)*1/numberOfLines
      .line-up-{n}
        background-color rgba(68,68,68,rangeMapcolor )
      .line-down-{n}
        background-color rgba(68,68,68,rangeMapcolor)
</style>
