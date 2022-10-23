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
  .bar-x 
</template>

<style lang="stylus" scoped>
#cb
  display none
.hamburger
  z-index 3
  position fixed
  top outlineSpace
  right outlineSpace
  size(2rem,1.4rem)
  cursor pointer
  [class^='bar']
    size(,0.2rem)
    border-radius 4px
    position absolute
    background-color #000
    &:nth-child(1)
      top 0
    &:nth-child(2)
      top 50%
      transform translateY(-50%)
      animation bar2-rev .7s forwards
    &:nth-child(3)
      bottom 0
  .bar-x
    top 50%
    transform translateY(-50%)
    animation bar-x-rev .7s forwards

input:checked ~ .hamburger
  [class^='bar']
    background-color #fff
  .bar:nth-child(2)
    animation bar2 .7s forwards
    z-index -1
  .bar-x
    animation bar-x .7s forwards
    background-color #ff5131

@keyframes bar2
  0%
    transform translate(0%,-50%) rotate(0deg)

  100%
    transform translate(0%,-50%) rotate(-34deg) scaleX(1.1)

@keyframes bar2-rev
  0%
    transform translate(0%,-50%) rotate(-34deg)
  100%
    transform translate(0%,-50%) rotate(0deg) scaleX(1)

@keyframes bar-x
  0%
    transform translate(0%,-50%) rotate(0deg)
  100%
    transform translate(0%,-50%) rotate(-140deg) scaleX(0.5)
@keyframes bar-x-rev
  0%
    transform translate(0%,-50%) rotate(-140deg)
  100%
    transform translate(0%,-50%) rotate(0)
    opacity 0
</style>
