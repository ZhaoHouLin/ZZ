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
  flex()
  background-color red
  transform translateX(0%)
</style>
