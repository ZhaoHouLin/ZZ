<script setup>
import { onMounted } from "@vue/runtime-core";
const props = defineProps({
  title: String,
});

onMounted(() => {});
</script>

<template lang="pug">
.page-2
  h1 {{props.title}} 
</template>

<style lang="stylus" scoped>
.page-2
  size(,100vh)
  background-color green
</style>
