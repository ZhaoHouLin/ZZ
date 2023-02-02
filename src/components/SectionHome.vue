<script setup>
import { onMounted } from "@vue/runtime-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Logo from "./Logo.vue"
import Ring from "./Ring.vue"
import InfoText from "./InfoText.vue"

onMounted(() => {})
</script>

<template lang="pug">
.section-home
  Logo
  Ring
  InfoText
</template>

<style lang="stylus" scoped>
.section-home
  // background-color yellow
  flex()
</style>
