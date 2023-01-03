<script setup>
import { onMounted } from "@vue/runtime-core"

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
  position absolute
  width auto
  background-color transparent
  white-space nowrap
  z-index 2
  transform translateX(200%)
  font-size 6rem
  font-weight bold
  // margin 2rem
</style>
