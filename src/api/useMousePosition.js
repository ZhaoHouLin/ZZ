import { ref, onMounted, onUnmounted } from "@vue/runtime-core"

export function MousePosition() {
  const x = ref(0)
  const y = ref(0)

  const posUpdate = (e) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', posUpdate)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', posUpdate)
  })

  return { x, y }
}