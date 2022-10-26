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
    ease: "power1.in",
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
  .line.bottom
</template>

<style lang="stylus" scoped>
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
.phone-number
  bottom outlineSpace
  left outlineSpace
  -webkit-writing-mode vertical-lr
  writing-mode vertical-lr
.mail
  bottom outlineSpace
  right outlineSpace

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
.line.bottom
  bottom outlineSpace
  left outlineSpace + 2rem
  transform-origin 50% 100%
  transform rotate(45deg)
  opacity 0.3

@media screen and (max-width: 768px)
  .line.top
    opacity 0
    transition opacity .5s ease-in-out
</style>
