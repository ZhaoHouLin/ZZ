<script setup>
import { ref, onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
const props = defineProps({
  title: String,
})

const numberOfLines = ref(20)
const lineCounter = numberOfLines.value / 2

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page-2",
      start: "top bottom",
      end: "top top",
      // markers: true,
      scrub: 3,
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
  tl.to(".page-2 h1", { duration: 5, opacity: 1, xPercent: "200" }, "-=5")
  tl.to(".page-2 h1", { duration: 3, xPercent: "200" })
})
</script>

<template lang="pug">
.page.page-2
  h1 {{props.title}} 
  .lines
    - for(let i=1;i<=20;i++)
      .line
        div(class=`line-up-${i}`)
        div(class=`line-down-${i}`)
      
</template>

<style lang="stylus" scoped>

numberOfLines = 20
lineCounter = numberOfLines / 2

.page-2
  size(,100vh)
  flex()
  background-color #fff
  // transform translateY(100%)
  h1
    transform translateX(-200%)
    opacity 0
.lines
  position absolute
  size()
  flex()
  .line
    size()
    flex(,,column)
    [class^='line-up-'],[class^='line-down-']
      size(,50%)

    for n in 1..numberOfLines
      rangeMapcolor = 1 - (n - 1)*1/numberOfLines
      .line-up-{n}
        background-color rgba(68,68,68,rangeMapcolor )
      .line-down-{n}
        background-color rgba(68,68,68,rangeMapcolor)
</style>
