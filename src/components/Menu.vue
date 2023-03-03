<script setup>
import { onMounted, ref } from "@vue/runtime-core"
import { useCounterStore } from "../stores/counter"
import { storeToRefs } from "pinia"
import { gsap } from "gsap"

import Hamburger from "./Hamburger.vue"

const counter = useCounterStore()
const { menuOpenVal } = storeToRefs(counter) //資料解構
const { handleMenuOpen } = useCounterStore()

const list = ref()
const numberOfsection = ref(4)

const toSection = (num) => {
  let idx = num - 1
  gsap.to(window, {
    duration: 0.5,
    scrollTo: { y: (idx * document.body.offsetHeight) / numberOfsection.value },
  })
}

onMounted(() => {
  gsap.defaults({ duration: 0.5 })

  const items = list.value.childNodes

  items.forEach((item) => {
    const tl = gsap.timeline({ paused: true }).to(item.children[0], {
      // color: "#f00",
      scale: 1.5,
      backgroundImage: "linear-gradient(90deg,red 0%,red 100%,white 0%)",
    })

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
    RouterLink(to='/resume' )
      h1 resume
    RouterLink(to='/portfolio' )
      h1 portfolio
    RouterLink(to='/favorite')
      h1 favorite

  

</template>

<style lang="stylus" scoped>
.menu
  z-index 2
  position fixed
  right 0
  top 0
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

@media screen and (max-width: 768px)
  .menu .list
    width 60%
</style>
