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
  window.addEventListener("click", (e) => {
    gsap.fromTo(
      cursor.value,
      {
        width: "28px",
        height: "28px",
        opacity: 1,
      },
      {
        width: "144px",
        height: "144px",
        opacity: 0,
        ease: "sine.out",
      }
    )
  })
})
</script>

<template lang="pug">
.cursor(ref='cursor')  
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
</style>
