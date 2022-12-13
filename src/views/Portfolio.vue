<script setup>
import { onMounted, onUnmounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LineAnimation from "../components/LineAnimation.vue"
import InfoCrawl from "../components/InfoCrawl.vue"
import css100Data from "../data/css100.json"
const route = useRoute()

const props = defineProps({
  title: String,
})

const formatZero = (val) => {
  let dTimes = "000" + val
  return `${dTimes.substring(dTimes.length - 3)}`
}
</script>

<template lang="pug">
.portfolio
  .cards
    .card(v-for='(item,idx) in css100Data')
      h2 {{formatZero(idx+1)}}
  //- .frame
    .overlay
      iframe(scrolling="no" title="Begin ( Days CSS 001 )" src="https://codepen.io/rodes/embed/wvmQMjB?default-tab=result" frameborder="no" loading="lazy" allowtransparency="false" allowfullscreen="true")
    .overlay
      iframe(scrolling="no" title="Begin ( Days CSS 001 )" src="https://codepen.io/rodes/embed/bGvQQXz?default-tab=result" frameborder="no" loading="lazy" allowtransparency="false" allowfullscreen="true")
 
  

</template>
<style lang="stylus" scoped>
.portfolio
  z-index 1
  position fixed
  flex()
  size(100%,100vh)
  background-color #fff
  padding 1rem 0
  .cards
    size()
    flex()
    flex-wrap wrap
    overflow-y auto
    padding 1rem
    // border 1px solid #000
    .card
      size(80px,100px)
      flex()
      border-radius 2px
      margin 0.4rem
      cursor pointer
      transition 0.3s ease-out 0s
      border 1px solid rgba(0,0,0,0.2)
      user-select none
      &:hover
        box-shadow 2px 2px 4px rgba(0,0,0,0.3)
        transform translate(-2px,-2px)

  .frame
    size()
    flex()
    .overlay
      border-radius 2px
      size(400px)
      overflow hidden
      margin 1rem
      transition 0.4s ease-out 0s
      &:hover
        box-shadow 4px 4px 4px rgba(0,0,0,0.5)
    iframe
      cursor pointer
      transform translate(-1px,-53px)
      size(402px,486px)

@media screen and (max-width: 768px)
  .portfolio .frame
    flex(,,column)
</style>
