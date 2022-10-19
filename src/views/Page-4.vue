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
  flex()
  background-color gold
  transform translateY(100%)
</style>
