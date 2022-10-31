<script setup>
const props = defineProps({
  title: String,
})
</script>

<template lang="pug">
.page.page-4
  h1 {{props.title}} 
</template>
<style lang="stylus" scoped>
.page-4
  size()
  flex()
  background-color gold
  transform translate(200%,100%)
</style>
