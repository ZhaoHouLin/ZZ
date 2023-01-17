import { defineStore } from 'pinia'
import { ref } from 'vue'
import { gsap } from "gsap"

export const useCounterStore = defineStore('counter', () => {
  const menuOpenVal = ref(false)    //Menu開啟值

  const handleMenuOpen = () => {   //處理Menu開啟
    menuOpenVal.value = !menuOpenVal.value
    menuOpenVal.value
      ? gsap.to(".menu", { width: "100%", height: "100%", display: 'block', opacity: 1, duration: 0.5 })
      : gsap.to(".menu", { width: "0%", height: "100%", display: 'none', opacity: 0, duration: 0.5 })
  }

  return {
    menuOpenVal,  //Menu開啟值
    handleMenuOpen    //處理Menu開啟
  }
})
