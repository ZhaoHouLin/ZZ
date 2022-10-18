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
  size(,100vh)
  background-color blue
</style>
