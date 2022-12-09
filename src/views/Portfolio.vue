<script setup>
import { onMounted, onUnmounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LineAnimation from "../components/LineAnimation.vue"
import InfoCrawl from "../components/InfoCrawl.vue"

const route = useRoute()

const props = defineProps({
  title: String,
})
</script>

<template lang="pug">
.portfolio
  h1 portfolio

</template>
<style lang="stylus" scoped>
.portfolio
  z-index 1
  position fixed
  flex()
  size(100%,100vh)
  background-color yellow
</style>
