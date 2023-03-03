<script setup>
import { useRoute } from "vue-router"
import Menu from "./components/Menu.vue"
import Cursor from "./components/Cursor.vue"
const route = useRoute()
</script>

<template lang="pug">
Cursor  
Menu
RouterView(v-slot="{ Component }")
  Transition(name="fade" mode="out-in" )
    keep-alive
      component( :is="Component" :key="$route.name" v-if="route.meta.keepAlive") 
</template>

<style lang="stylus">

body::-webkit-scrollbar
  display none

body
  background-color colorPrimary

.fade-enter-from
  opacity 0
.fade-enter-active
  transition opacity 3s ease
.fade-leave-to
  opacity 0
.fade-leave-active
  transition opacity 3s ease
</style>
