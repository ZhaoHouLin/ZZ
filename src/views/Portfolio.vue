<script setup>
import { onMounted, onUnmounted, ref } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LineAnimation from "../components/LineAnimation.vue"
import InfoCrawl from "../components/InfoCrawl.vue"
import SvgIcon from "../components/SvgIcon.vue"
import css100Data from "../data/css100.json"

const route = useRoute()

const props = defineProps({
  title: String,
})

const cards = ref()

const dom = (e) => {
  // console.log(cards)
  console.log(document.body.clientWidth)
  console.log(e.clientX, e.clientY)
}

const formatZero = (val) => {
  let dTimes = "000" + val
  return `${dTimes.substring(dTimes.length - 3)}`
}
</script>

<template lang="pug">
.portfolio
  .cards(ref='cards')
    .card(v-for='(item,idx) in css100Data' :key='item.title' @click='dom')
      h2 {{formatZero(idx+1)}}
  .card-content
    .wrapper
      .title
        h1 Title
        a(href="https://codepen.io/rodes/embed/wvmQMjB?default-tab=result" target="_blank") 
          SvgIcon(name="codepen")
      .window
        iframe(scrolling="no" title="Begin ( Days CSS 001 )" src="https://codepen.io/rodes/embed/wvmQMjB?default-tab=result" frameborder="no" loading="lazy" allowtransparency="false" allowfullscreen="true")
      .info


</template>
<style lang="stylus" scoped>
.portfolio
  z-index 1
  position fixed
  flex()
  size(100%,100vh)
  background-color #fff
  // padding 1rem 0
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

  .card-content
    background-color rgba(0,0,0,0.3)
    position absolute
    padding 1rem
    size(auto,100%)
    // flex()
    .wrapper
      height 90%
      flex(,,column)
      border-radius 1rem
      box-shadow 2px 2px 4px rgba(0,0,0,0.5)
      background-color rgba(0,0,0,0.4)
      transform scale(0.8)
    .wrapper .title
      size(400px,2rem)
      position relative
      flex(space-between)
      margin 1rem 0
      padding 0 1rem
      // border 1px solid #000
      h1
        color #fff
        font-size 2rem
        margin-left 8px
      a
        color #fff
        z-index 2
        margin-right 8px
        .svg-icon
          size(2rem)
    .wrapper .window
      border-radius 8px
      size(402px,404)
      overflow hidden
      transition 0.4s ease-out 0s

    .wrapper .window iframe
      transform translate(-4px,-54px)
      size(402px,486px)
      // display none
    .wrapper .info
      size(400px,20%)
      border-radius 4px
      background-color #eee
      margin 1rem



@media screen and (max-width: 768px)
  .portfolio .card-content
    flex(,,column)
</style>
