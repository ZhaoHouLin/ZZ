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




</template>

<style lang="stylus" scoped>
.card-content
  opacity 0
  background-color rgba(0,0,0,0.5)
  position absolute
  top 0
  padding 1rem
  size(auto,100%)
  flex()
  .wrapper
    // height 90%
    flex(,,column)
    border-radius 1rem
    box-shadow 2px 2px 4px rgba(255,255,255,0.5)
    background-color rgba(255,255,255,255.4)
    transform scale(0.8)
  .wrapper .title
    size(400px,2rem)
    position relative
    flex(space-between)
    margin 1rem 0
    padding 0 1rem
    // border 1px solid #000
    h1
      color colorPrimary
      font-size 1rem
      margin-left 8px
    a
      color colorPrimary
      z-index 2
      margin-right 8px
      .svg-icon
        size(2rem)
  .wrapper .window
    border-radius 8px
    size(402px,400px)
    overflow hidden
    transition 0.4s ease-out 0s

  .wrapper .window iframe
    transform translate(0px,-51px)
    size(402px,482px)
    // display none
  .wrapper .info
    size(400px,100px)
    border-radius 4px
    background-color colorPrimary
    margin 1rem
</style>
