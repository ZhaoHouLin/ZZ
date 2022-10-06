<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import Test from "./components/test.vue";

const counter = ref(0);

const changePage = (num) => {
  counter.value = num;
  console.log(num);
};

const pageStyle = computed(() => {
  return {
    left: `${counter.value * -100}%`,
  };
});
</script>

<template lang="pug">
.wrapper
  .pages(:style='pageStyle')
    - const data = ['one','two','three']
    - for(let i=1;i<=3;i++)
      .page(class=`page-${i}`)
        h1=data[i-1]
Test(@turn='changePage')

</template>

<style lang="stylus">
colors = red green blue

.wrapper
  size(,100vh)
  overflow hidden
  position relative
  .pages
    position relative
    size()
    flex()
    transition 0.5s all ease-in-out
    white-space nowrap
    for n in 1..3
      .page-{n}
        position absolute
        size()
        left (n - 1)*100vw
        background-color colors[n - 1]
</style>
