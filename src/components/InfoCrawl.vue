<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const props = defineProps({
  text: String,
})

onMounted(() => {})
</script>

<template lang="pug">
.info-crawl {{props.text}}
</template>

<style lang="stylus" scoped>
.info-crawl
  width auto
  background-color transparent
  white-space nowrap
  z-index 2
  transform translateX(100%)
  font-size 8rem
  font-weight bold
  margin 2rem
</style>
