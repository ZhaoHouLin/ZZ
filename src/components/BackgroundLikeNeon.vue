<script setup>
import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const random = (min, max) => {
  return Math.floor(Math.random() * (1 + max - min) + min)
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: "none" })

  const tl1 = gsap.timeline({ repeat: -1 })
  const tl2 = gsap.timeline({ repeat: -1 })

  const count = 100
  let html = ""
  const container = document.querySelector("#bg-neon")
  const w = window.innerWidth
  const h = window.innerHeight

  for (let i = 0; i < count; i++) {
    html += `<div></div>`
  }

  container.innerHTML = html

  const particles = document.querySelectorAll("#bg-neon > div")

  for (let i = 0; i < particles.length; i++) {
    gsap.set(particles[i], {
      position: "absolute",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#aaa",
      boxShadow: "0 0 12px #aaa",
    })

    tl1.add(
      gsap.fromTo(
        particles[i],
        {
          x: random(-(w * 0.4), w * 0.4),
          y: random(-(h * 0.1), h * 0.1),
          z: random(-300, 0),
          opacity: random(3, 5) / 10,
        },
        {
          x: "+=" + random(-(w * 0.4), w * 0.4),
          y: "+=" + random(-(h * 0.4), h * 0.4),
          z: "+=" + random(-200, 200),
          opacity: random(4, 8) / 10,
          repeat: 1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 7,
        }
      ),
      0
    )
  }

  // tl2.fromTo(
  //   container,
  //   {
  //     perspective: 20,
  //   },
  //   {
  //     perspective: 700,
  //     repeat: 1,
  //     repeatDelay: 2,
  //     yoyo: true,
  //     ease: "sine.inOut",
  //     duration: 3,
  //   }
  // )
  const tl3 = gsap.timeline()
  gsap.set(container, { perspective: 20 })
  tl3.to(container, {
    duration: 7,
    perspective: 700,
    rotate: 360,
    ease: "sine.inOut",
  })
  // gsap.to(container, {
  //   scrollTrigger: {
  //     trigger: "#bg-neon",
  //     // pin: true,
  //     // pinSpacing: true,

  //     scrub: 3,
  //     anticipatePin: 1,
  //   },
  //   rotate: 360,
  //   duration: 7,
  //   perspective: 700,
  //   ease: "sine.inOut",
  // })
  ScrollTrigger.create({
    animation: tl3,
    trigger: container,
    pin: true,
    pinSpacing: true,
    scrub: 3,
    anticipatePin: 1,
  })
})
</script>

<template lang="pug">
#bg-neon
  //- .particle
</template>

<style lang="stylus" scoped>
#bg-neon
  position absolute
  size()
  flex()
  z-index -1
  // animation rotate 7s infinite
  // div
  //   size(20px)
  //   position absolute
  //   borderRadius 50%
  //   backgroundColor #EE9802
  //   boxShadow 0 0 12px #EE9802

@keyframes rotate
  0%
    transform rotate(0deg)
  100%
    0%
    transform rotate(360deg)
</style>
