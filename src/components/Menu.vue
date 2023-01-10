<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { useCounterStore } from "../stores/counter"
import { gsap } from "gsap"

import Hamburger from "./Hamburger.vue"

const { handleMenuOpen } = useCounterStore()

const list = ref()
const numberOfsection = ref(6)

const toSection = (num) => {
  let idx = num - 1
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: (idx * document.body.offsetHeight) / numberOfsection.value },
  })
}

onMounted(() => {
  gsap.defaults({ duration: 0.5 })

  const items = list.value.childNodes

  items.forEach((item) => {
    const tl = gsap.timeline({ paused: true }).to(item.children[0], {
      // color: "#f00",
      scale: 1.2,
      backgroundImage: "linear-gradient(90deg,red 0%,red 100%,white 0%)",
    })
    // tl.to(item.children[0], {
    //   backgroundImage: "linear-gradient(90deg,white 0%,white 100%,red 100%)",
    // })
    // console.log(item.children[0])
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
    RouterLink(to='/' @click='toSection(1)')
      h1 about
    RouterLink(to='/' @click='toSection(2)')
      h1 resume
    RouterLink(to='/portfolio' )
      h1 portfolio
    RouterLink(to='/' @click='toSection(3)')
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
        background-image linear-gradient(90deg,red 0%,red 0%,white 0%)
        -webkit-background-clip text
        background-clip text
        -webkit-text-fill-color transparent
        text-fill-color transparent
</style>
