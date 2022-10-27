<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
onMounted(() => {
  gsap.to("#ring", {
    duration: 10,
    rotate: "-360deg",
    repeat: -1,
    ease: "none",
  })
})
</script>

<template lang="pug">
.ring
  //- h1 ZZ
  svg#ring(viewBox="0 0 500 500")
    path(id="textCircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" fill="none" )
    text
      textPath(href="#textCircle" textLength='180%') Hello! Wellcome to my website. I'm ZZ. 
</template>

<style lang="stylus" scoped>
.ring
  h1
    pos()
    transform translate(-50%,-50%)
    font-size 8rem
#ring
  size(30rem)
  text
    font-size 2rem
    fill #222
    filter drop-shadow(4px 4px 4px rgb(0 0 0 / 0.3))

@media screen and (max-width: 768px)
  #ring
    size(20rem)
</style>
