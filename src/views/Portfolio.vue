<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import css100Data from "../data/css100.json"

import LineAnimation from "../components/LineAnimation.vue"
import InfoCrawl from "../components/InfoCrawl.vue"
import CardContent from "../components/CardContent.vue"
import "animate.css"

const route = useRoute()

const cardOpen = ref(false)
const cardPosition = ref("right:0")
const cardContentData = ref(css100Data)
const animatedClassName = ref("")

const formatZero = (val) => {
  let dTimes = "000" + val
  return `${dTimes.substring(dTimes.length - 3)}`
}

const detectCard = (e) => {
  // console.dir(e.target)
  if (e.target.className == "card") {
    cardContentData.value.forEach((item, idx) => {
      if (item.open == true) item.open = false
    })
    let id = e.target.dataset.num
    cardContentData.value[id].open = true
    handleCardPosition(e)
  } else {
    cardContentData.value.forEach((item, idx) => {
      if (item.open == true) item.open = false
    })
  }
}

const handleCardPosition = (e) => {
  // console.dir(e)
  // console.log(e.pageX, e.pageY)

  if (e.pageX < document.body.clientWidth / 2) {
    // cardPosition.value = `right:0`
    cardPosition.value = `right`
    // animatedClassName.value = `animate__animated animate__backInRight right`
  } else {
    // cardPosition.value = `left:0`
    cardPosition.value = `left`
    // animatedClassName.value = `animate__animated animate__backInLeft left`
  }
}

const beforeEnter = (el) => {
  if (cardPosition.value == `right`) {
    el.style.right = 0
  } else {
    el.style.left = 0
  }
}
const enter = (el) => {
  gsap.to(el, {
    duration: 1,
    x: 0,
    opacity: 1,
    ease: "bounce.out",
  })
  console.dir(el)
}
const afterEnter = (el) => {}

const beforeLeave = (el) => {}
const leave = (el) => {
  // gsap.to(el, {
  //   duration: 1,
  //   x: 0,
  //   opacity: 0,
  //   ease: "bounce.out",
  // })
}
const afterLeave = (el) => {
  el.style.opacity = 0
}
</script>

<template lang="pug">
.portfolio
  .cards( @click='detectCard')
    .item(v-for='(item,idx) in cardContentData' :key='item.title'  )
      .card(:data-num='idx') {{formatZero(idx+1)}}
      Transition(name="in" mode="out-in" )
        CardContent(:key='item.title' :title='item.title' :src='item.src' :class="[{'left': cardPosition =='left'},{'right': cardPosition =='right'}]" :open='cardContentData[idx].open' )


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

.in-enter-from
  opacity 0
.in-enter-active
  transition opacity  .5s ease
.in-leave-to
  // transform translateX(200px)
  opacity 0
.in-leave-active
  // transition opacity 1s ease
  transition 1.5s ease-in-out
.left
  left 0
.right
  right 0

@media screen and (max-width: 768px)
  .portfolio .card-content
    flex(,,column)
</style>
