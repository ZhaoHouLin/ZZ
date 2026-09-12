<script setup>
// 100 Days CSS 的 CodePen 彈窗：只有打開時才載入 iframe
import { gsap } from "gsap"

const props = defineProps({
  pens: { type: Array, required: true },
  index: { type: Number, default: -1 }, // -1 = 關閉
})
const emit = defineEmits(["update:index"])

const box = ref(null)
const overlay = ref(null)
const shown = ref(false) // 控制 DOM 存在，關閉動畫跑完才移除

const pen = computed(() => props.pens[props.index])
const penUrl = computed(() => pen.value?.src.replace("/embed/", "/pen/").split("?")[0])
const pad = (n) => String(n).padStart(3, "0")

const close = () => emit("update:index", -1)
const step = (d) => emit("update:index", (props.index + d + props.pens.length) % props.pens.length)

const onKey = (e) => {
  if (props.index < 0) return
  if (e.key === "Escape") close()
  if (e.key === "ArrowRight") step(1)
  if (e.key === "ArrowLeft") step(-1)
}

watch(
  () => props.index,
  async (i, prev) => {
    if (i >= 0 && prev < 0) {
      shown.value = true
      document.body.style.overflow = "hidden"
      await nextTick()
      gsap
        .timeline({ defaults: { ease: "expo.out", duration: 0.6 } })
        .fromTo(overlay.value, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(box.value, { y: 40, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1 }, "-=0.15")
    } else if (i < 0 && prev >= 0) {
      document.body.style.overflow = ""
      gsap
        .timeline({ defaults: { ease: "expo.in", duration: 0.35 }, onComplete: () => (shown.value = false) })
        .to(box.value, { y: 30, scale: 0.96, opacity: 0 })
        .to(overlay.value, { opacity: 0, duration: 0.25 }, "-=0.2")
    } else if (i >= 0 && prev >= 0 && box.value) {
      gsap.fromTo(box.value, { x: i > prev ? 30 : -30, opacity: 0.4 }, { x: 0, opacity: 1, duration: 0.4, ease: "expo.out" })
    }
  }
)

onMounted(() => window.addEventListener("keydown", onKey))
onUnmounted(() => {
  window.removeEventListener("keydown", onKey)
  document.body.style.overflow = ""
})
</script>

<template lang="pug">
Teleport(to="body")
  .pen-modal(v-if="shown" ref="overlay" @click.self="close")
    .pen-box(ref="box" role="dialog" aria-modal="true" :aria-label="pen?.title")
      header.pen-head
        span.pen-idx {{ pad(index + 1) }}
        h3.pen-title {{ pen?.title }}
        a.pen-link(:href="penUrl" target="_blank" rel="noopener" title="Open on CodePen")
          svg(viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round")
            path(d="M12 2 22 8.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5M22 8.5l-10 7-10-7M2 15.5l10-7 10 7M12 2v6.5")
        button.pen-close(type="button" @click="close" aria-label="close") ×
      .pen-frame
        iframe(v-if="pen" :key="pen.src" :src="pen.src" :title="pen.title" loading="lazy" allowfullscreen allowtransparency="true" frameborder="0")
      footer.pen-foot
        button.pen-nav(type="button" @click="step(-1)") ← prev
        span.pen-count {{ pad(index + 1) }} / {{ pad(pens.length) }}
        button.pen-nav(type="button" @click="step(1)") next →
</template>

<style lang="stylus" scoped>
.pen-modal
  position fixed
  inset 0
  z-index 9200
  flex()
  padding 1rem
  // 不用 backdrop-filter：它得每幀重新模糊整個視窗，背後的顆粒層又一直在動，開窗會超頓
  background-color rgba(5,5,5,.92)

.pen-box
  width min(64rem, 100%)
  background-color colorPrimary
  border 1px solid colorLine
  box-shadow 0 30px 80px rgba(0,0,0,.6)

.pen-head
  flex(flex-start,center)
  gap 1rem
  padding 1rem 1.2rem
  border-bottom 1px solid colorLine
  .pen-idx
    font-family fontDigital
    font-size 1.3rem
    color colorAccent
  .pen-title
    flex 1
    font-size 1.05rem
    font-weight 700
    letter-spacing .04em
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .pen-link
    color colorMuted
    transition color .3s
    line-height 0
    &:hover
      color colorSecondary
  .pen-close
    font-size 2rem
    line-height 1
    color colorMuted
    transition color .3s, transform .3s
    &:hover
      color colorAccent
      transform rotate(90deg)

.pen-frame
  size(100%,min(70vh, 32rem))
  background-color #111
  iframe
    size()
    display block

.pen-foot
  flex(space-between,center)
  padding .8rem 1.2rem
  border-top 1px solid colorLine
  font-family fontDigital
  font-size 1.1rem
  letter-spacing .1em
  color colorMuted
  .pen-nav
    transition color .3s
    &:hover
      color colorSecondary
</style>
