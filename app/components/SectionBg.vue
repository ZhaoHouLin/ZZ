<script setup>
// 區塊背景：會動的底紋 + 描邊巨大編號（視差）。碎片方塊改由 FragmentField（WebGL）統一畫，不在這裡
// variant：dots 點陣漂移 / lines 掃描線下流 / grid 格線漂移 + 掃描光條 / hatch 斜紋側流 / glow 琥珀微光呼吸
const props = defineProps({
  idx: { type: String, required: true },
  variant: { type: String, default: "dots" },
})
const { gsap } = useGsap()
const root = ref(null)
const num = ref(null)
const scan = ref(null)
let ctx

onMounted(() => {
  const section = root.value.parentElement
  ctx = gsap.context(() => {
    const scrub = { trigger: section, start: "top bottom", end: "bottom top", scrub: true }
    gsap.fromTo(num.value, { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: scrub })
    if (scan.value) {
      gsap.fromTo(
        scan.value,
        { y: 0 },
        { y: () => section.offsetHeight, ease: "none", scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%", scrub: true, invalidateOnRefresh: true } }
      )
    }
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
.sec-bg(ref="root" :class="`is-${variant}`" aria-hidden="true")
  .sec-bg-pattern
  .sec-bg-scan(v-if="variant === 'grid'" ref="scan")
  .sec-bg-num(ref="num") {{ idx }}
</template>

<style lang="stylus" scoped>
// 履歷、Lab 等區塊本身有 max-width 置中，背景要滿版：以區塊中線為準往兩側撐到 100vw
// 沒有底色：FragmentField 的畫布在整頁最底層，區塊要透明碎片才看得到
.sec-bg
  position absolute
  top 0
  bottom 0
  left 50%
  width 100vw
  margin-left -50vw
  z-index -1 // 區塊有 isolation isolate（global.styl），-1 會留在區塊內、頁面底色之上
  overflow hidden
  pointer-events none

.sec-bg-pattern
  position absolute
  inset -10%
  opacity .5
  will-change transform

// 點陣：慢速斜向漂移
.is-dots .sec-bg-pattern
  background-image radial-gradient(rgba(255,255,255,.22) 1px, transparent 1px)
  background-size 1.6rem 1.6rem
  animation drift 40s linear infinite

@keyframes drift
  to
    transform translate(1.6rem, 1.6rem)

// 掃描線：往下流（位移一個週期 6px 就無縫）
.is-lines .sec-bg-pattern
  background-image repeating-linear-gradient(180deg, rgba(255,255,255,.06) 0 1px, transparent 1px 6px)
  animation flowY 1.2s linear infinite

@keyframes flowY
  to
    transform translateY(6px)

// 格線漂移 + 掃描光條
.is-grid .sec-bg-pattern
  background-image linear-gradient(colorLine 1px, transparent 1px), linear-gradient(90deg, colorLine 1px, transparent 1px)
  background-size 4rem 4rem
  background-position center
  opacity .35
  animation drift 30s linear infinite reverse

.sec-bg-scan
  position absolute
  left 0
  top 0
  size(100%,1px)
  background linear-gradient(90deg, transparent, colorAccent 40%, colorAccent 60%, transparent)
  opacity .6
  box-shadow 0 0 24px rgba(245,166,35,.35)
  will-change transform

// 斜紋：往側邊流（45 度、週期 14px，水平位移 14 / sin45 ≈ 19.8px 無縫）
.is-hatch .sec-bg-pattern
  background-image repeating-linear-gradient(-45deg, rgba(255,255,255,.06) 0 1px, transparent 1px 14px)
  animation flowX 3s linear infinite

@keyframes flowX
  to
    transform translateX(-19.8px)

// 琥珀微光：呼吸
.is-glow .sec-bg-pattern
  background radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,166,35,.14), transparent 70%)
  opacity 1
  will-change opacity
  animation breathe 4s ease-in-out infinite alternate

@keyframes breathe
  from
    opacity .5
  to
    opacity 1

// 描邊巨大編號，靠右，捲動視差
.sec-bg-num
  position absolute
  right -.05em
  top 50%
  margin-top -.5em
  font-family fontDigital
  font-size clamp(14rem, 34vw, 30rem)
  line-height 1
  color transparent
  -webkit-text-stroke 1px rgba(255,255,255,.08)
  will-change transform

@media (max-width: breakMobile)
  .sec-bg-num
    font-size 10rem
</style>
