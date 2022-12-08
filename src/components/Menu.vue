<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { useCounterStore } from "../stores/counter"
import { gsap } from "gsap"

import Hamburger from "./Hamburger.vue"

const { handleMenuOpen } = useCounterStore()

const list = ref()

const pageOne = () => {
  console.dir(document.body)
  console.log(document.body.offsetHeight)
  gsap.to(window, { duration: 2, scrollTo: "#section1" })
}

const pageTwo = () => {
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: document.body.offsetHeight / 4 },
  })
}

const pageThree = () => {
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: document.body.offsetHeight / 2 },
  })
}

onMounted(() => {
  gsap.defaults({ duration: 0.5 })

  const items = list.value.childNodes
  items.forEach((item) => {
    const tl = gsap
      .timeline({ paused: true })
      .to(item, { color: "#f00", scale: 1.2 })

    item.addEventListener("mouseenter", () => tl.play())
    item.addEventListener("mouseleave", () => tl.reverse())
    item.addEventListener("click", () => handleMenuOpen())
  })
})
</script>

<template lang="pug">
Hamburger
.menu
  .list(ref='list')
    a(@click='pageOne')
      h1 about
    a(@click='pageTwo')
      h1 portfolio
    a(@click='pageThree')
      h1 test
    a
      h1 favorite

  

</template>

<style lang="stylus" scoped>
.menu
  z-index 2
  position fixed
  right 0
  top 0
  // flex()
  size(0,100%)
  background-color rgba(0,0,0,0.4)
  opacity 0
  display none
  .list
    position absolute
    right 0
    flex(,,column)
    size(40%,100%)
    padding 0 1rem
    background-color rgba(0,0,0,0.3)
    color #fff
    a
      text-decoration none
      color #fff
      margin-bottom 1rem
      h1
        cursor pointer
        text-transform capitalize
</style>
