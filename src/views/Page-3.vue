<script setup>
const props = defineProps({
  title: String,
})
</script>

<template lang="pug">
.page-3
  h1 {{props.title}} 
</template>
<style lang="stylus" scoped>
.page-3
  position absolute
  size()
  flex()
  background-color blue
  transform translate(100%,100%)
</style>
