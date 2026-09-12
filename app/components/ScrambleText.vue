<script setup>
// 取代舊站 TextPlugin 打字機：字元亂碼解碼效果，輪播多個字串
const props = defineProps({
  words: { type: Array, required: true },
  interval: { type: Number, default: 2800 },
})

const CHARS = "!<>-_\\/[]{}=+*^?#_01"
const text = ref(props.words[0])
let plain = props.words[0] // 目前顯示的純文字（text 會含 <span>，不能拿來當 from）
let raf = 0
let timer = 0

const scrambleTo = (next) => {
  const from = plain
  plain = next
  const len = Math.max(from.length, next.length)
  const queue = Array.from({ length: len }, (_, i) => ({
    from: from[i] || "",
    to: next[i] || "",
    start: Math.floor(Math.random() * 20),
    end: Math.floor(Math.random() * 20) + 20,
    char: "",
  }))
  let frame = 0
  cancelAnimationFrame(raf)
  const step = () => {
    let out = ""
    let done = 0
    for (const q of queue) {
      if (frame >= q.end) {
        done++
        out += q.to
      } else if (frame >= q.start) {
        if (!q.char || Math.random() < 0.28) q.char = CHARS[Math.floor(Math.random() * CHARS.length)]
        out += `<span class="dud">${q.char}</span>`
      } else {
        out += q.from
      }
    }
    text.value = out
    frame++
    if (done < queue.length) raf = requestAnimationFrame(step)
  }
  step()
}

onMounted(() => {
  if (props.words.length < 2) return
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  let i = 0
  timer = setInterval(() => {
    i = (i + 1) % props.words.length
    scrambleTo(props.words[i])
  }, props.interval)
})

onUnmounted(() => {
  clearInterval(timer)
  cancelAnimationFrame(raf)
})
</script>

<template lang="pug">
span.scramble(v-html="text")
</template>

<style lang="stylus">
.scramble .dud
  color colorAccent
  opacity .8
</style>
