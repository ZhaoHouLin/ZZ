<script setup>
import { onMounted } from "@vue/runtime-core"
import SvgIcon from "../components/SvgIcon.vue"
const props = defineProps({
  title: String,
  src: String,
  open: Boolean,
})

onMounted(() => {
  let script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "https://cpwebassets.codepen.io/assets/embed/ei.js"
  document.body.appendChild(script)
})
</script>

<template lang="pug">
    
.card-content(v-if='props.open')
  .wrapper
    .title
      h1 {{props.title}}
      a(:href="props.src" target="_blank") 
        SvgIcon(name="codepen")
    .window
      iframe(scrolling="no"  :title="props.title" :src="props.src" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true")
    .info  
  //- p.codepen(data-height='300' data-default-tab='html,result' data-slug-hash='PoeYYdJ' data-user='rodes' style='height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;')
    span
      | See the Pen 
      a(href='https://codepen.io/rodes/pen/PoeYYdJ')
        | Motivational Modal ( Days CSS 026 )
      |  by ZhaoHouLin (
      a(href='https://codepen.io/rodes') @rodes
      | )
      |   on 
      a(href='https://codepen.io') CodePen
      | .



</template>

<style lang="stylus" scoped>
.card-content
  background-color rgba(0,0,0,0.3)
  position absolute
  top 0
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
      font-size 1rem
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
</style>
