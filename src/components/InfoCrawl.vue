<script setup>
const props = defineProps({
  text: String,
})
</script>

<template lang="pug">
.info-crawl
  .title
    h1 {{props.text}}
</template>

<style lang="stylus" scoped>
.info-crawl
  // position fixed
  position absolute
  transform translate(0%,0%)
  background-color transparent
  // border 1px solid red
  flex()
  size()
  z-index 1
  .title
    background-color transparent
    position absolute
    width 100vw
    // size()
    flex()
    transform translate(-200%,0%)
    // border 1px solid red
    h1
      font-size 2rem
      // transform translate(-300%,0%)
</style>
