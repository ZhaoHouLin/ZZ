<script setup>
const props = defineProps({
  title: String,
})
</script>

<template lang="pug">
.page.page-3
  h1 {{props.title}} 
</template>
<style lang="stylus" scoped>
.page-3
  flex()
  background-color blue
  transform translateX(200%)
</style>
