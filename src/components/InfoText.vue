<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

onMounted(() => {
  gsap.registerPlugin(TextPlugin)
  gsap.to(".name", {
    text: "Raiden",
    ease: "power1.in",
    duration: 2,
    repeat: 1,
    yoyo: true,
    repeatDelay: 1,
  })
  gsap.from(".phone-number", {
    text: "",
    ease: "power1.in",
    duration: 2,
    repeat: 2,
    yoyo: true,
    repeatDelay: 1,
  })
  gsap.from(".mail", {
    text: "",
    ease: "slow(0.7, 0.7, false)",
    duration: 2,
    repeat: 2,
    yoyo: true,
    repeatDelay: 1,
  })
})
</script>

<template lang="pug">
.info-text
  .name ZhaoHou Lin
  .phone-number +886 906-822-708 
  .mail rodes5292@gmail.com
  .line.left
  .line.top
  .line.left-bottom-slash
  //- .line.left-bottom
  .line.right-bottom
</template>

<style lang="stylus" scoped>
@font-face
  font-family 'Advanced_Pixel-7'
  src url('@/assets/fonts/Advanced_Pixel-7.woff') format("woff")


.info-text
  font-size 1.5rem
  position absolute
  size()

.name,.phone-number,.mail
  position absolute

.name
  width 160px
  top outlineSpace
  left outlineSpace
  font-weight bold
.phone-number
  bottom outlineSpace
  left outlineSpace
  -webkit-writing-mode vertical-lr
  writing-mode vertical-lr
  font-family 'Advanced_Pixel-7'
  font-size 2.5rem
.mail
  bottom outlineSpace + 10rem
  right outlineSpace
  -webkit-writing-mode vertical-lr
  writing-mode vertical-lr
  transform rotate(180deg)
  font-family 'Advanced_Pixel-7'
  font-size 2.5rem
.line
  position absolute
  size(1px,15rem)
  border-radius 1px
  background-color #222
.line.left
  top outlineSpace + 3rem
  left outlineSpace + 0.5rem
.line.top
  top outlineSpace + 1rem
  left outlineSpace + 10rem
  size(15rem,1px)
  transition opacity .5s ease-in-out
.line.left-bottom-slash
  bottom outlineSpace
  left outlineSpace + 2rem
  transform-origin 50% 100%
  transform rotate(45deg)
  opacity 0.3
.line.left-bottom
  bottom outlineSpace + 1rem
  left outlineSpace + 22rem
  size(15rem,1px)
.line.right-bottom
  bottom outlineSpace
  right outlineSpace + 14rem
  size(15rem,1px)

@media screen and (max-width: 768px)
  .line.top,.line.right-bottom
    opacity 0
    transition opacity .5s ease-in-out
  .left-bottom-slash
    size(1px,10rem)
</style>
