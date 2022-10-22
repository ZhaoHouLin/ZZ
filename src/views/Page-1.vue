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
  color #fff
  background-color #222
  // transform translateX(0%)
</style>
