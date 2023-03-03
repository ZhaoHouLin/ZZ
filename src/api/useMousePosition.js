import { ref, onMounted, onUnmounted } from "@vue/runtime-core"

export function MousePosition() {
  const mouseX = ref(0)
  const mouseY = ref(0)

  const posUpdate = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
    // console.log(mouseX.value, mouseY.value)
  }

  onMounted(() => {
    window.addEventListener('mousemove', posUpdate)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', posUpdate)
  })

  return { mouseX, mouseY }
}