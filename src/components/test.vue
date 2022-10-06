<script setup>
import { onMounted, ref } from "@vue/runtime-core";
const counter = ref(0);
const emit = defineEmits(["turn"]);
const count = () => {
  counter.value++;
  if (counter.value > 2) counter.value = 0;
  emit("turn", counter.value);
};
</script>

<template lang="pug">
.test
  h1 test
  button(@click='count') +
</template>

<style lang="stylus" scoped>
.test
  pos()
  transform translate(-50%,-50%)
  position fixed
  flex()
  bottom 0
  size(200px)
  border 1px solid #000
</style>
