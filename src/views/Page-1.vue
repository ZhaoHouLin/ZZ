<script setup>
const props = defineProps({
  title: String,
})
</script>

<template lang="pug">
.page.page-1
  h1 {{props.title}}
</template>
<style lang="stylus" scoped>
.page-1
  z-index 1
  flex()
  color #000
  // background linear-gradient(90deg,#222 0%, #444 50%)
  background-color #fff
  // transform translateX(0%)
</style>
