<script setup>
const props = defineProps({
  title: String,
});
</script>

<template lang="pug">
.page-3
  h1 {{props.title}} 
</template>
<style lang="stylus" scoped>
.page-3
  z-index -1
  position absolute
  transform translateX(200vw)
  size(100vw,100vh)
  background-color blue
</style>
