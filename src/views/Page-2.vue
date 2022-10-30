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
      trigger: ".pages",
      start: "top top",
      // end: "100% 50%",
      // markers: true,
      scrub: 3,
    },
  })

  for (let i = 1; i <= numberOfLines.value; i++) {
    // tl.to(`.line-${2 * i - 1}`, { yPercent: "100" })
    tl.to(`.line-up-${i}`, {
      transformOrigin: "50% 0%",
      transform: "scaleY(0)",
      border: "none",
      // backgroundColor: `rgba(68,68,68,${lineCounter / 5 / i})`,
      // background: `linear-gradient(90deg,#444 0%, #666 ${i * 10}%)`,
      // opacity: `${lineCounter / 5 / i}`,
    })
    tl.to(
      `.line-down-${i}`,
      {
        transformOrigin: "50% 100%",
        transform: "scaleY(0)",
        // backgroundColor: `rgba(68,68,68,${lineCounter / 5 / i})`,
        // opacity: `${lineCounter / 5 / i}`,
      },
      "<"
    )
    // tl.to(`.line-${2 * i}`, { yPercent: "-100" }, "<")
    // tl.to(`.line-up-${i}`, { yPercent: "100" })
    // tl.to(`.line-down-${i}`, { yPercent: "-100" })
  }
  tl.to(".page-2 h1", { duration: 5, opacity: 1, xPercent: "200" }, "-=5")
  tl.to(".page-2 h1", { duration: 3, yPercent: "200" })
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
  position relative
  flex()
  background-color #fff
  transform translateY(100%)
  h1
    transform translateX(-200%)
    opacity 0
.lines
  position absolute
  // border 1px solid #000
  size()
  flex()
  .line
    // position relative
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
