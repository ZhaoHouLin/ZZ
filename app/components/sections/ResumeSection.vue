<script setup>
// 02 Resume：一張檢驗表，最左一欄是模版字的大年份（docs/LOGO-REDESIGN.md 整頁構圖 02）
const { gsap } = useGsap()

const groups = [
  {
    en: "Work",
    items: [
      { period: "2026-04 ~ 仍在職", org: "藍新資訊股份有限公司", role: "智能應用發展部", desc: "AI 應用研究與落地" },
      { period: "2022-08 ~ 2026-03", org: "藍新資訊股份有限公司", role: "專案工程師", desc: "疾病管制署駐點電腦相關維護（回任）" },
      { period: "2022-05 ~ 2022-08", org: "文境資科股份有限公司", role: "前端工程師", desc: "前端頁面切版、與後端 API 介接" },
      { period: "2019-01 ~ 2022-04", org: "藍新資訊股份有限公司", role: "專案工程師", desc: "疾病管制署駐點電腦相關維護" },
    ],
  },
  {
    en: "Education",
    items: [
      { period: "2018-08", org: "Alpha Camp", role: "學期一、二", desc: "" },
      { period: "2008-09 ~ 2012-06", org: "國立臺北科技大學", role: "光電工程系 學士", desc: "" },
    ],
  },
  {
    en: "Certification",
    items: [
      { period: "2025-11", org: "CKA", role: "Certified Kubernetes Administrator", desc: "" },
      { period: "準備中", org: "iPAS AI 應用規劃師", role: "初級", desc: "" },
    ],
  },
]
// 年份欄：取期間開頭的四位數；沒有年份（準備中）就放橫線
const yearOf = (p) => (/^\d{4}/.test(p) ? p.slice(0, 4) : "––––")

const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.utils.toArray(".rs-row").forEach((row) => {
      gsap.from(row, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: row, start: "top 90%" },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
section.resume#resume(ref="root")
  .sec-head
    span.sec-idx 02
    h2 Resume
  .rs-group(v-for="g in groups" :key="g.en")
    h3.rs-label {{ g.en }}
    ol.rs-table
      li.rs-row(v-for="it in g.items" :key="it.org + it.period" data-hover)
        span.rs-year {{ yearOf(it.period) }}
        span.rs-org
          strong.resume-main {{ it.org }}
          span.rs-period {{ it.period }}
        span.rs-role {{ it.role }}
        span.rs-desc {{ it.desc }}
</template>

<style lang="stylus" scoped>
.resume
  max-width 78rem
  margin 0 auto
  padding 6rem outlineSpace 9rem

.sec-head
  sectionHead()

.rs-group
  margin-bottom 3.5rem

.rs-label
  labelPlate(1.15rem)
  margin-bottom 1rem

.rs-table
  list-style none
  border-top 1px solid colorLine

.rs-row
  display grid
  grid-template-columns 8rem minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1.2fr)
  gap 1.5rem
  align-items center
  padding 1.1rem .8rem
  border-bottom 1px solid colorLine
  transition background-color .25s ease, color .25s ease
  &:hover
    background-color colorSecondary
    color colorPrimary
    .rs-period, .rs-desc
      color colorMutedOnPaper

.rs-year
  font-family fontDisplay
  font-weight 900
  font-size 3rem
  line-height 1
  font-variant-numeric tabular-nums

.rs-org
  display grid
  gap .2rem
  strong
    font-size 1.25rem
    font-weight 900
    letter-spacing .04em
  .rs-period
    font-family fontMono
    font-size .72rem
    letter-spacing .08em
    color colorMuted
    font-variant-numeric tabular-nums

.rs-role
  font-weight 700

.rs-desc
  color colorMuted
  line-height 1.6

@media (max-width: breakMobile)
  .resume
    padding-block 4rem 6rem
  .rs-row
    grid-template-columns 5rem minmax(0, 1fr)
    gap .3rem 1rem
    align-items start
    padding .9rem .4rem
  .rs-year
    font-size 2.2rem
    grid-row span 3
  .rs-role, .rs-desc
    grid-column 2
  .rs-desc:empty
    display none
</style>
