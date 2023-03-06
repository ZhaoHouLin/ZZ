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

  const moveParticle = (target, e) => {
    let newPos = {
      // x: gsap.utils.random(-window.innerWidth, window.innerWidth),
      // y: gsap.utils.random(-window.innerHeight, window.innerHeight),
      x: e.clientX,
      y: e.clientY,
    }

    let curPos = {
      x: gsap.getProperty(target, "x"),
      y: gsap.getProperty(target, "y"),
    }

    let deltaX = curPos.x - newPos.x
    let deltaY = curPos.y - newPos.y
    let distance = Math.hypot(deltaX, deltaY)
    let angleDeg =
      (Math.atan2(newPos.y - curPos.y, newPos.x - curPos.x) * 180) / Math.PI
    console.log(newPos, curPos, distance)
    gsap.to(target, { rotation: angleDeg + "_short", duration: 0.2 })
    gsap.to(target, {
      x: gsap.utils.random(-deltaX, deltaX),
      y: gsap.utils.random(-deltaY, deltaY),
      duration: 3,
      ease: "none",
      onComplete: moveParticle,
      onCompleteParams: [target],
    })
  }

  window.addEventListener("mousemove", (e) => {
    const particlesTl = gsap.timeline({ defaults: { duration: 0.5 } })
    particlesTl.to(".particle", {
      duration: 0.1,
      overwrite: "auto",
      width: "28px",
      height: "28px",
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
      stagger: 0.15,
      ease: "none",
    })
    // .to(".bg .particle", {
    //   duration: 0.5,
    //   // overwrite: "auto",
    //   width: "72px",
    //   height: "72px",
    //   opacity: 0,
    // })
  })
})
</script>

<template lang="pug">
.cursor(ref='cursor')  
- for(let i=1;i<=10;i++)
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
