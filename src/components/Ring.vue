<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
const counter = ref(0)

onMounted(() => {
  gsap.registerPlugin(TextPlugin)
  const tl = gsap.timeline()
  gsap.to("#ring", {
    duration: 10,
    rotate: "-360deg",
    repeat: -1,
    ease: "none",
  })

  // gsap.to(counter, {
  //   value: 3030,
  //   onUpdate: () => {
  //     counter.value = Math.round(counter.value)
  //     console.log(counter.value)
  //   },
  //   duration: 3,
  // })

  gsap.to(".ring h1", {
    innerText: 3030,
    ease: "power1.in",
    duration: 3,
    snap: {
      innerText: 10,
    },
  })
})
</script>

<template lang="pug">
.ring
  .title
    span #
    h1 0
  svg#ring(viewBox="0 0 500 500")
    path(id="textCircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" fill="none" )
    text
      textPath(href="#textCircle" textLength='180%') Hello! Wellcome to my website. I'm ZZ. 
</template>

<style lang="stylus" scoped>
@font-face
  font-family 'Advanced_Pixel-7'
  src url('@/assets/fonts/Advanced_Pixel-7.woff') format("woff")
.ring
  pos()
  transform translate(-50%,-50%)
  .title
    flex()
    pos()
    transform translate(-50%,-50%)
    span,h1
      font-size 6rem
      font-family 'Advanced_Pixel-7'
      text-shadow 4px 4px 4px rgba(0,0,0,0.3)
      letter-spacing 0.5rem

#ring
  size(30rem)
  text
    fill colorSecondary
    filter drop-shadow(4px 4px 4px rgb(255 255 255 / 0.3))
    textPath
      font-family 'Advanced_Pixel-7'
      font-size 4rem

@media screen and (max-width: 768px)
  #ring
    size(20rem)
  .ring .title
    span,h1
      font-size 4rem
</style>
