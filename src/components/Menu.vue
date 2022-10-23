<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { gsap } from "gsap"

import Hamburger from "./Hamburger.vue"

const handleOpen = (val) => {
  val
    ? gsap.to(".menu", { width: "100%", height: "100%", opacity: 1 })
    : gsap.to(".menu", { width: "0%", height: "100%", opacity: 0 })
}

onMounted(() => {})
</script>

<template lang="pug">
Hamburger(@open='handleOpen')
.menu
  .list
    h1 about 
    h1 portfolio
    h1 favorite
    h1 contact

  

</template>

<style lang="stylus" scoped>
.menu
  z-index 2
  position fixed
  right 0
  top 0
  opacity 0
  flex()
  size(0,100%)
  background-color rgba(0,0,0,0.4)
  .list
    position absolute
    right 0
    flex(,,column)
    size(40%,100%)
    padding 0 1rem
    background-color rgba(0,0,0,0.3)
    color #fff
</style>
