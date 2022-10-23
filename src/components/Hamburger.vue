<script setup>
import { ref } from "@vue/reactivity"
import { gsap } from "gsap"

const emit = defineEmits(["open"])

const openVal = ref(false)

const handleOpen = () => {
  openVal.value = !openVal.value
  emit("open", openVal.value)
  // gsap.to("")
}
</script>

<template lang="pug">
input#cb(type="checkbox")
label.hamburger(@click='handleOpen' for="cb") 
  .bar
  .bar
  .bar 
</template>

<style lang="stylus" scoped>
#cb
  display none
.hamburger
  z-index 3
  position fixed
  top 1rem
  right 1rem
  // flex()
  size(2rem,1.2rem)
  cursor pointer
  // border 1px solid #000
  .bar
    size(,0.2rem)
    border-radius 4px
    position absolute
    background-color #000
    &:nth-child(1)
      top 0
      animation bar1-rev .7s forwards
    &:nth-child(2)
      top 50%
      transform translate(0%,-50%)
      animation bar2-rev .7s forwards
    &:nth-child(3)
      bottom 0
      animation bar3-rev .7s forwards

input:checked ~ .hamburger
  .bar:nth-child(1)
    animation bar1 .7s forwards
    background-color #fff
  .bar:nth-child(2)
    animation bar2 .7s forwards
    background-color #fff
  .bar:nth-child(3)
    animation bar3 .7s forwards
    background-color #fff

@keyframes bar1
  0%
    transform rotate(0deg)
  50%
    top 50%
    transform translateY(-50%)
  100%
    top 50%
    transform translateY(-50%) rotate(45deg)
@keyframes bar1-rev
  0%
    top 50%
    transform translateY(-50%) rotate(45deg)
  50%
    top 50%
    transform translateY(-50%)
  100%
    transform rotate(0deg)

@keyframes bar2
  0%
    transform translate(0%,-50%) scale(1)
    opacity 1
  100%
    transform translate(0%,-50%) scale(0)
    opacity 0
@keyframes bar2-rev
  0%
    transform translate(0%,-50%) scale(0)
    opacity 0
  100%
    transform translate(0%,-50%) scale(1)
    opacity 1

@keyframes bar3
  0%
    transform rotate(0deg)
  50%
    bottom 50%
    transform translateY(50%)
  100%
    bottom 50%
    transform translateY(50%) rotate(135deg)
@keyframes bar3-rev
  0%
    bottom 50%
    transform translateY(50%) rotate(135deg)
  50%
    bottom 50%
    transform translateY(50%)
  100%
    transform rotate(0deg)
</style>
