<script setup>
import { gsap } from "gsap"
import { ref, onMounted } from "vue"
import { useMousePosition } from "../api/index"

const cursor = ref()

const { mouseX, mouseY } = useMousePosition()

onMounted(() => {
  gsap.defaults({ ease: "none" })
  gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: () => {
      gsap.set(cursor.value, {
        css: {
          left: mouseX.value,
          top: mouseY.value,
        },
      })
    },
  })
})
</script>

<template lang="pug">
.cursor(ref='cursor')  
//- // - for(let i=1;i<=5;i++)
  .particle  
</template>

<style lang="stylus" scoped>
.cursor
  position fixed
  size(28px)
  left 50%
  top 50%
  transform translate(-50%,-50%)
  border-radius 50%
  border 2px solid colorSecondary
  transition transform 0.3s ease
  transform-origin center center
  pointer-events none
  z-index 1000

  // position absolute
.particle
  z-index 2
  position fixed
  transform translate(-50%,-50%)
  size(28px)
  border-radius 50%
  border 1px solid #fff
  // background-color #fff
  transform-origin 50% 50%
  pointer-events none
</style>
