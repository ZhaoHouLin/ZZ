<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import Test from "./components/test.vue";
import Page1Vue from "./views/Page-1.vue";
import Page2Vue from "./views/Page-2.vue";
import Page3Vue from "./views/Page-3.vue";

const title = ["one", "two", "three"];

const counter = ref(0);

const changePage = (num) => {
  counter.value = num;
  // console.log(num);
};

const pageStyle = computed(() => {
  return {
    transform: `translateX(${counter.value * -100}vw)`,
  };
});

// const openScroll = computed(() => {
//   if (counter.value == 1) return { overflowY: `visible` };
// });

const handleScroll = () => {
  console.log(window.scrollY, document.body.scrollHeight);
  // console.log(window.innerHeight);

  // this.active = window.scrollY > Tab以上的元素高度 ? true : false
  // window.scrollY + window.screen.height >= document.body.scrollHeight
  if (
    window.scrollY > (document.body.scrollHeight - window.innerHeight) / 3 &&
    window.scrollY < ((document.body.scrollHeight - window.innerHeight) * 2) / 3
  ) {
    counter.value = 1;
  } else if (
    window.scrollY >
    ((document.body.scrollHeight - window.innerHeight) * 2) / 3
  ) {
    counter.value = 2;
  } else {
    counter.value = 0;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template lang="pug">

.wrapper()
  .pages(:style='pageStyle')
    //- - const data = ['one','two','three']
    //- - for(let i=1;i<=3;i++)
    //-   .page(class=`page-${i}`)
    //-     h1=data[i-1]
    Page1Vue(:title='title[0]')
    Page2Vue(:title='title[1]')
    Page3Vue(:title='title[2]')

Test(@turn='changePage')

</template>

<style lang="stylus">
colors = red green blue

body::-webkit-scrollbar
  display none

.wrapper
  size(,100vw)
  overflow hidden
  // position fixed
  // position absolute
  .pages
    z-index 1
    position fixed
    size()
    flex()
    transition 0.5s all ease-in-out
    white-space nowrap
    // for n in 1..3
    //   .page-{n}
    //     position absolute
    //     size()
    //     left (n - 1)*100vw
    //     background-color colors[n - 1]
</style>
