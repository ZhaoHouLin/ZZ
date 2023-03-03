<script setup>
import { onMounted } from "vue"
import { gsap } from "gsap"

onMounted(() => {
  gsap.defaults({ ease: "none" })

  const count = 100
  const particleClass = "particle"
  const particleColors = ["#b4b4b4", "#7f7f7f", "#7a7a7a", "#3d3d3d"]
  const container = document.querySelector("#bg-snow")
  const w = container.offsetWidth
  const h = container.offsetHeight
  let elem

  const particleAnime = (element) => {
    gsap.to(element, gsap.utils.random(5, 10), {
      y: h,
      repeat: -1,
      delay: -10,
    })
    gsap.to(element, gsap.utils.random(1, 6), {
      x: "+=50",
      ease: "power1,inOut",
      repeat: -1,
      yoyo: true,
    })
    gsap.to(element, gsap.utils.random(1, 2), {
      opacity: 0,
      ease: "power1,inOut",
      repeat: -1,
      yoyo: true,
    })
  }

  for (let i = 0; i < count; i++) {
    elem = document.createElement("div")
    elem.className = particleClass
    container.appendChild(elem)

    gsap.set(elem, {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      x: gsap.utils.random(0, w),
      y: gsap.utils.random(0, h) - h * 1.5,
      scale: gsap.utils.random(0.5, 1),
      backgroundColor: gsap.utils.random(particleColors),
    })

    particleAnime(elem)
  }
})
</script>

<template lang="pug">
#bg-snow
</template>

<style lang="stylus" scoped>
#bg-snow
  position absolute
  size()
  // z-index -1
</style>
