<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import InfoText from "../components/InfoText.vue"
import Logo from "../components/Logo.vue"
import Ring from "../components/Ring.vue"

onMounted(() => {})
</script>

<template lang="pug">
.page.page-1
  Ring
  //- Logo
  //- InfoText


</template>
<style lang="stylus" scoped>
.page-1
  size(,100vh)
  flex()
  color #000
  // background-color transparent
  background-color #fff
</style>
