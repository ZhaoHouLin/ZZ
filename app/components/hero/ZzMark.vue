<script setup>
// ZZ logo（docs/LOGO-REDESIGN.md H1）：兩個 Z 上下相疊、共用中橫，一筆到底，斜筆連成閃電
// 筆畫在 100×100 的 viewBox 裡只佔 22.5～77.5（含筆寬），外面要依這個範圍擺位
defineProps({
  stroke: { type: Number, default: 9 },
  ghost: { type: Boolean, default: false }, // 在主筆畫底下多畫一條很淡的完整筆畫，描線時看得到還沒充到的部分
  beam: { type: Boolean, default: false }, // 在筆畫上疊電流光束，由 hero 控制亮哪一段
})
// 光束層：20 層同寬的細線，越後面越短越亮，疊起來就是從尾巴淡到前端亮的漸層。
// 平頭讓層與層之間的接縫平整；只有最亮的最後一層用圓頭，當光束的前端
const BEAM_LAYERS = Array.from({ length: 20 }, (_, i) => ({ w: 1.8, o: 0.05 + 0.95 * ((i + 1) / 20) ** 2, cap: i === 19 ? "round" : "butt" }))
const D = "M27 27 H73 L32 50 H68 L27 73 H73"
const path = ref(null)
const beams = ref([])
defineExpose({ path, beams })
</script>

<template lang="pug">
svg.zz-mark(viewBox="0 0 100 100" aria-hidden="true" focusable="false")
  path.zz-ghost(v-if="ghost" d="M27 27 H73 L32 50 H68 L27 73 H73" :stroke-width="stroke" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter")
  path(ref="path" :d="D" :stroke-width="stroke" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter")
  g.zz-beams(v-if="beam")
    path.zz-beam(v-for="(l, i) in BEAM_LAYERS" :key="i" ref="beams" :d="D" :stroke-width="l.w" :stroke-opacity="l.o" fill="none" :stroke-linecap="l.cap" stroke-linejoin="round" stroke-dasharray="0 1000")
</template>

<style lang="stylus" scoped>
.zz-mark
  display block
  overflow visible
.zz-ghost
  opacity .1
// 電流光束：白色三層，外層淡、內層亮；平常隱藏
.zz-beams
  opacity 0
.zz-beam
  stroke colorSecondary
</style>
