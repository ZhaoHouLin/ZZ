<script setup>
// import { RouterLink, RouterView } from "vue-router";
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import { useRoute, useRouter } from "vue-router"

import Menu from "./components/Menu.vue"
import About from "./views/About.vue"

const route = useRoute()
const title = ["one", "two", "three", "four"]
</script>

<template lang="pug">
Menu
RouterView(v-slot="{ Component  }")
  Transition(name="slide" mode="out-in" )
  keep-alive
    component( :is="Component" :key="$route.name" v-if="route.meta.keepAlive") 
  component( :is="Component" :key="$route.name" v-if="!route.meta.keepAlive" )
</template>

<style lang="stylus">
colors = red green blue

body::-webkit-scrollbar
  display none
</style>
