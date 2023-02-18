<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import FacebookAlbum from "../data/FacebookAlbum.json"

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: "none" })
})
</script>

<template lang="pug">
.section-favorite
  .sport
    .couplet
      h2 走路要找難路走
      h2 挑擔要揀重擔挑
    .pic
    //- .other-pic
      img(v-for="item in FacebookAlbum" :src="item.src", alt="")
  .Games
</template>

<style lang="stylus" scoped>
.section-favorite
  position fixed
  size()
  .sport .couplet
    size(auto,100%)
    position absolute
    left 10%
    flex(,,row-reverse)

  .sport .couplet h2
    // z-index 2
    -webkit-writing-mode vertical-lr
    writing-mode vertical-lr
    background-image linear-gradient(45deg,colorSecondary -200%,colorPrimary -100%,colorSecondary 0%)
    -webkit-background-clip text
    background-clip text
    -webkit-text-fill-color transparent
    text-fill-color transparent
    margin 0 1rem
    font-size 3rem
    letter-spacing 1rem
    &:nth-child(1)
      margin-top -8rem
    &:nth-child(2)
      margin-bottom -8rem
  .sport .pic
    size(,400px)
    position absolute
    bottom outlineSpace
    right outlineSpace
    // border 1px solid #000
    transform-origin 100% 100%
    background url('https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.6435-9/107600357_10214009046854001_7560704228675992564_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=0debeb&_nc_ohc=2Bj1brtHxzwAX8aFbTo&_nc_ht=scontent.ftpe8-1.fna&oh=00_AfBKoqHkt34nnsy_qXi9aCPSgygAKC_i_mnsfFD030kBjw&oe=63E0746B') no-repeat
    background-position right bottom
    background-size contain
    background-color transparent
  .other-pic
    flex()
    img
      height 50vh
@media screen and (max-width: 1200px)
  .section.section-favorite
    .sport .couplet
      display none
</style>
