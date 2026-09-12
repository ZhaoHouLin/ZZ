<script setup>
const { gsap } = useGsap()

const intro =
  "林炤后（ZhaoHou Lin），綽號 ZZ。2019 年起任職於藍新資訊，前七年駐點疾病管制署，負責系統維運與前端開發；2026 年 4 月轉入智能應用發展部，研究 AI 應用如何落地成企業可部署的系統。持有 CKA，自建 Kubernetes 與 GitLab CI/CD 環境，把 Nuxt 3 系統從開發一路部署到正式環境。平時研究 3C 產品、玩玩線上遊戲，偶而與朋友爬山⋯"
const chars = Array.from(intro)

// 做事的方式（整理自個人背景筆記）
const principles = [
  { k: "WHY", v: "看到不合理的地方就問為什麼，不接受「大概是這樣」。" },
  { k: "BUILD", v: "從概念、YAML、部署、看 log、修正，一路做到 production-like。" },
  { k: "ITERATE", v: "邊做邊問：先做一小塊，遇到錯誤回頭補概念，再往下。" },
  { k: "SHIP", v: "要的是可以直接拿去用的成果：完整程式、可執行的步驟、能複習的文件。" },
]

const avatarSrc = "/avatar.jpg" // 用綁定而不是靜態 src：靜態路徑會被當成 import，檔案還沒放就 build 失敗
const avatarBroken = ref(false) // 檔案不存在時顯示占位

const tags = ["AI APPLICATION", "KUBERNETES", "CKA", "DEVOPS", "LLM / RAG", "VUE 3", "NUXT", "GSAP"]
const marquee = [...tags, ...tags]

const root = ref(null)
let ctx

onMounted(() => {
  const img = root.value.querySelector(".intro-avatar img")
  if (img?.complete && img.naturalWidth === 0) avatarBroken.value = true

  ctx = gsap.context(() => {
    // 逐字隨捲動點亮（取代舊站 TextPlugin 打字機）
    // 只動 opacity：color 是字串 tween，120 個 span 每個捲動幀都要重組字串
    gsap.to(".intro-char", {
      opacity: 1,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: { trigger: ".intro-text", start: "top 75%", end: "bottom 40%", scrub: 0.6 },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.intro#about(ref="root")
  .marquee(aria-hidden="true")
    .marquee-track.is-outline
      span(v-for="(t, i) in marquee" :key="'a' + i") {{ t }}
    .marquee-track.is-reverse
      span(v-for="(t, i) in marquee" :key="'b' + i") {{ t }}
  .intro-body
    .sec-head
      span.sec-idx 01
      h2 About
    .intro-grid
      figure.intro-avatar(:class="{ 'is-broken': avatarBroken }")
        img(:src="avatarSrc" alt="ZhaoHou Lin" loading="lazy" @error="avatarBroken = true")
        .intro-avatar-fallback ZZ
      p.intro-text
        span.intro-char(v-for="(c, i) in chars" :key="i") {{ c }}
    ul.intro-principles
      li(v-for="p in principles" :key="p.k")
        span.intro-principle-k {{ p.k }}
        span {{ p.v }}
</template>

<style lang="stylus" scoped>
.intro
  position relative
  padding 4rem 0 8rem

.marquee
  overflow hidden
  border-top 1px solid colorLine
  border-bottom 1px solid colorLine
  padding 1rem 0

.marquee-track
  display flex
  gap 3rem
  width max-content
  font-family fontPixel
  font-size clamp(3rem, 8vw, 6rem)
  line-height 1
  white-space nowrap
  animation marquee 40s linear infinite
  span::after
    content '·'
    margin-left 3rem
    color colorAccent
  &.is-outline
    color transparent
    -webkit-text-stroke 1px colorSecondary
  &.is-reverse
    animation-direction reverse
    margin-top .5rem

@keyframes marquee
  to
    transform translateX(-50%)

.intro-body
  max-width 70rem
  margin 6rem auto 0
  padding 0 outlineSpace

// 和其他區塊共用同一套標題列，比例才一致
.sec-head
  sectionHead()

.intro-grid
  display grid
  grid-template-columns 14rem 1fr
  gap 3rem
  align-items start

.intro-avatar
  position relative
  aspect-ratio 1
  border 1px solid colorLine
  background-color #0d0d0d
  overflow hidden
  img
    size()
    object-fit cover
    display block
  &.is-broken img
    display none
  .intro-avatar-fallback
    pos()
    transform translate(-50%,-50%)
    font-family fontPixel
    font-size 4rem
    color rgba(255,255,255,.12)

.intro-principles
  list-style none
  margin-top 3rem
  display grid
  grid-template-columns repeat(auto-fill, minmax(16rem, 1fr))
  gap 1px
  background-color colorLine
  border 1px solid colorLine
  li
    padding 1.4rem
    background-color colorPrimary
    line-height 1.6
    color rgba(255,255,255,.8)
  .intro-principle-k
    display block
    margin-bottom .4rem
    font-family fontPixel
    font-size 1.6rem
    line-height 1
    color colorSecondary

.intro-text
  font-size clamp(1.3rem, 2.4vw, 2rem)
  line-height 1.9
  letter-spacing .08em
  text-indent 2em
  font-weight 500
  .intro-char
    opacity .12

@media (max-width: breakMobile)
  .intro
    padding 2rem 0 5rem
  .intro-grid
    grid-template-columns 1fr
    gap 1.5rem
  .intro-avatar
    width 10rem
  .intro-body
    margin-top 4rem
</style>
