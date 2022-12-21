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
  if (e.pageX < document.body.clientWidth / 2) {
    cardPosition.value = `right`
  } else {
    cardPosition.value = `left`
  }
}

const onBeforeEnter = (el) => {
  if (cardPosition.value == `right`) {
    el.style.right = 0
    el.style.transform = `translateX(100%)`
  } else {
    el.style.left = 0
    el.style.transform = `translateX(-100%)`
  }
}
const onEnter = (el, done) => {
  gsap.to(el, {
    duration: 1,
    x: 0,
    opacity: 1,
    ease: "ease",
    onComplete: done,
  })
}

const onLeave = (el, done) => {
  if (cardPosition.value == `right`) {
    gsap.to(el, {
      duration: 1,
      opacity: 0,
      xPercent: 100,
      ease: "ease",
      onComplete: done,
    })
  } else {
    gsap.to(el, {
      duration: 1,
      opacity: 0,
      xPercent: -100,
      // ease: "bounce.out",
      ease: "ease",
      onComplete: done,
    })
  }
}
</script>

<template lang="pug">
.portfolio
  .cards( @click='detectCard')
    .item(v-for='(item,idx) in cardContentData' :key='item.title'  )
      .card(:data-num='idx') {{formatZero(idx+1)}}
      Transition(name="in" 
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
      )
        CardContent(:key='item.title' :title='item.title' :src='item.src'  :open='cardContentData[idx].open' )


</template>
<style lang="stylus" scoped>
.portfolio
  z-index 1
  position fixed
  flex()
  size(100%,100vh)
  background-color #fff
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


.left
  left 0
.right
  right 0

@media screen and (max-width: 768px)
  .card-content
    size()
    padding 0
</style>
