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
  flex()
  size(,100vh)
  background-color red
</style>
