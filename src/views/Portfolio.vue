<script setup>
import { ref } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { gsap } from "gsap"
import css100Data from "../data/CSS100.json"
import githubPortfolio from "../data/GithubPortfolio.json"

import CardContent from "../components/CardContent.vue"

const route = useRoute()

const cardContentData = ref(css100Data) // Css 100 days 資料

let clientWidth = ref(0) //紀錄畫面寬度
let elOffsetLeft = ref(0) //紀錄點擊的元素距離左側多少

const formatZero = (val) => {
  let dTimes = "000" + val
  return `${dTimes.substring(dTimes.length - 3)}`
}

//偵測滑鼠位置來改變卡片開關
const detectCard = (e) => {
  if (e.target.className == "card") {
    cardContentData.value.forEach((item, idx) => {
      if (item.open == true) item.open = false
    })
    let id = e.target.dataset.num
    cardContentData.value[id].open = true
  } else {
    cardContentData.value.forEach((item, idx) => {
      if (item.open == true) item.open = false
    })
  }
}

//動畫進入前
const onBeforeEnter = (el) => {}

//動畫進入
const onEnter = (el, done) => {
  clientWidth.value = el.parentNode.parentElement.clientWidth
  elOffsetLeft.value = el.parentNode.offsetLeft

  if (elOffsetLeft.value < clientWidth.value / 2) {
    el.style.right = 0
    el.style.transform = `translateX(100%)`
  } else {
    el.style.left = 0
    el.style.transform = `translateX(-100%)`
  }
  gsap.to(el, {
    duration: 1,
    x: 0,
    opacity: 1,
    ease: "ease",
    onComplete: done,
  })
}

//動畫離開
const onLeave = (el, done) => {
  if (elOffsetLeft.value < clientWidth.value / 2) {
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
    a.card(v-for='item in githubPortfolio' :key='item.title' :href='item.href' target="_blank") {{ item.title }}
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
  background-color colorPrimary

  .cards
    size()
    flex()
    flex-wrap wrap
    box-sizing border-box
    padding 1rem 3rem
    overflow-y auto
    overflow-x hidden
    &::-webkit-scrollbar-track    //捲軸底色
      background-color colorPrimary
    &::-webkit-scrollbar-thumb    //捲軸本體顏色
      background-color colorSecondary
    &::-webkit-scrollbar          //捲軸寬度
      width 0.5rem

    .card
      size(80px,100px)
      flex()
      border-radius 2px
      margin 0.4rem
      cursor pointer
      transition 0.3s ease-out 0s
      border 1px solid rgba(255,255,255,0.5)
      // background-color colorSecondary
      color colorSecondary
      user-select none
      text-align center
      text-decoration none
      word-wrap break-word
      word-break keep-all
      box-sizing border-box
      padding 0 8px
      &:hover
        box-shadow 2px 2px 4px rgba(255,255,255,0.3)
        background-color colorSecondary
        color colorPrimary
        transform translate(-2px,-2px)

@media screen and (max-width: 768px)
  .portfolio .cards
    padding 1rem 0
  .card-content
    size()
    padding 0
</style>
