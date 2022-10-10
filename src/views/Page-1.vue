<script setup>
const props = defineProps({
  title: String,
});
</script>

<template lang="pug">
.page-1
  h1 {{props.title}}
</template>
<style lang="stylus" scoped>
.page-1
  z-index -1
  position absolute
  flex()
  size(100vw,100vh)
  background-color red
</style>
