<script setup>
// 01 About：左邊一張工作證，右邊自介全文與四塊做事方式標語牌（docs/LOGO-REDESIGN.md 整頁構圖 01）
const { gsap } = useGsap()

const intro =
  "林炤后（ZhaoHou Lin），綽號 ZZ。2019 年起任職於藍新資訊，前七年駐點疾病管制署，負責系統維運與前端開發；2026 年 4 月轉入智能應用發展部，研究 AI 應用如何落地成企業可部署的系統。持有 CKA，自建 Kubernetes 與 GitLab CI/CD 環境，把 Nuxt 3 系統從開發一路部署到正式環境。平時研究 3C 產品、玩玩線上遊戲，偶而與朋友爬山⋯"
const chars = Array.from(intro)

// 做事的方式：短句是標語牌上的大字，長句是說明
const principles = [
  { k: "WHY", s: "問到底", v: "看到不合理的地方就問為什麼，不接受「大概是這樣」。" },
  { k: "BUILD", s: "做到上線", v: "從概念、YAML、部署、看 log、修正，一路做到 production-like。" },
  { k: "ITERATE", s: "邊做邊補", v: "先做一小塊，遇到錯誤回頭補概念，再往下。" },
  { k: "SHIP", s: "給能用的", v: "完整程式、可執行的步驟、能複習的文件。" },
]
const tags = ["AI Application", "Kubernetes", "CKA", "DevOps", "LLM / RAG", "Nuxt"]

const avatarSrc = `${useRuntimeConfig().app.baseURL}avatar.jpg` // 綁定而非靜態 src（靜態路徑會被當成 import）；要帶 baseURL，GitHub Pages 部署在 /ZZ/ 底下
const avatarBroken = ref(false)

const root = ref(null)
let ctx

onMounted(() => {
  const img = root.value.querySelector(".badge-photo img")
  if (img?.complete && img.naturalWidth === 0) avatarBroken.value = true

  ctx = gsap.context(() => {
    // 工作證像被夾上去：從上方掉下來，輕輕晃一下停住
    gsap.from(".badge", {
      yPercent: -18,
      rotation: -4,
      opacity: 0,
      duration: 1.1,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: ".badge", start: "top 85%" },
    })
    // 逐字隨捲動點亮
    gsap.to(".intro-char", {
      opacity: 1,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: { trigger: ".intro-text", start: "top 75%", end: "bottom 45%", scrub: 0.6 },
    })
    gsap.from(".rule", {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.8,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: { trigger: ".rules", start: "top 85%" },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.intro#about(ref="root")
  .sec-head
    span.sec-idx 01
    h2 About
  .intro-grid
    article.badge(aria-label="工作證")
      .badge-clip(aria-hidden="true")
      figure.badge-photo(:class="{ 'is-broken': avatarBroken }")
        img(:src="avatarSrc" alt="林炤后" loading="lazy" @error="avatarBroken = true")
        span.badge-fallback ZZ
      .badge-name
        strong 林炤后
        span ZZ
      p.badge-dept 智能應用發展部
      dl.badge-fields
        div
          dt EXT
          dd 3030
        div
          dt CKA
          dd 2025-11
      ul.badge-tags
        li(v-for="t in tags" :key="t") {{ t }}
    .intro-body
      p.intro-text
        span.intro-char(v-for="(c, i) in chars" :key="i") {{ c }}
      ul.rules
        li.rule(v-for="p in principles" :key="p.k")
          span.rule-k {{ p.k }}
          strong.rule-s {{ p.s }}
          span.rule-v {{ p.v }}
</template>

<style lang="stylus" scoped>
.intro
  max-width 78rem
  margin 0 auto
  padding 9rem outlineSpace 9rem

.sec-head
  sectionHead()

.intro-grid
  display grid
  grid-template-columns 24rem 1fr
  gap 4rem
  align-items start

// 工作證
.badge
  position relative
  background-color colorSecondary
  color colorPrimary
  padding 2.6rem 1.8rem 1.8rem
  display grid
  gap 1rem
  box-shadow 0 1.6rem 3rem -1rem rgba(0, 0, 0, .7)
  .badge-clip
    pos(50%, .9rem)
    transform translateX(-50%)
    size(4.6rem, .8rem)
    border-radius .4rem
    background-color colorPrimary

.badge-photo
  position relative
  aspect-ratio 1
  overflow hidden
  background-color colorLineOnPaper
  img
    size()
    object-fit cover
    display block
  &.is-broken img
    display none
  .badge-fallback
    pos()
    transform translate(-50%, -50%)
    font-family fontDisplay
    font-weight 900
    font-size 5rem
    color colorMutedOnPaper
  &:not(.is-broken) .badge-fallback
    display none

.badge-name
  display flex
  align-items baseline
  gap .8rem
  strong
    font-size 2.2rem
    font-weight 900
    letter-spacing .06em
  span
    font-family fontDisplay
    font-weight 900
    font-size 1.8rem

.badge-dept
  font-weight 700
  padding-bottom .8rem
  border-bottom 2px solid colorPrimary

.badge-fields
  display flex
  flex-wrap wrap // 手機上工作證較窄，EXT 與 CKA 兩欄會換行
  gap .3rem 2rem
  div
    display flex
    align-items baseline
    gap .5rem
  dt
    font-family fontMono
    font-size .72rem
    letter-spacing .14em
    color colorMutedOnPaper
  dd
    font-family fontDisplay
    font-weight 900
    font-size 1.9rem
    font-variant-numeric tabular-nums

.badge-tags
  list-style none
  display flex
  flex-wrap wrap
  gap .4rem
  li
    padding .2rem .5rem
    border 1px solid colorPrimary
    font-family fontMono
    font-size .66rem
    letter-spacing .06em
    text-transform uppercase

// 自介
.intro-text
  font-size clamp(1.2rem, 2vw, 1.55rem)
  line-height 1.9
  letter-spacing .04em
  font-weight 500
  max-width 36em
  .intro-char
    opacity .18

// 做事方式：和履歷同一種細線表格，標籤牌是每列的第一欄（不用卡片）
.rules
  list-style none
  margin-top 3.5rem
  border-top 1px solid colorLine

.rule
  display grid
  grid-template-columns 8.5rem 9rem minmax(0, 1fr)
  gap 1.2rem
  align-items center
  padding 1rem 0
  border-bottom 1px solid colorLine
  .rule-k
    labelPlate(1.05rem)
    justify-self start
  .rule-s
    font-size 1.3rem
    font-weight 900
    letter-spacing .06em
  .rule-v
    color colorSoft
    line-height 1.7

@media (max-width: 960px)
  // 欄寬要有下限 0，否則工作證與自介的內容會把欄撐寬、整頁出現橫向捲動
  .intro-grid
    grid-template-columns minmax(0, 1fr)
    gap 3rem
  .badge
    max-width unquote("min(26rem, 100%)")

@media (max-width: breakMobile)
  .intro
    padding-block 6rem
  .badge
    grid-template-columns 7.5rem minmax(0, 1fr)
    column-gap 1.2rem
    padding 2.4rem 1.2rem 1.2rem
    .badge-photo
      grid-row span 4
    .badge-tags
      grid-column 1 / -1
  .badge-name strong
    font-size 1.7rem
  .rule
    grid-template-columns 6.5rem minmax(0, 1fr)
    gap .3rem 1rem
    .rule-v
      grid-column 2
      font-size .88rem
</style>
