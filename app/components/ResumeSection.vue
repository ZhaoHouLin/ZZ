<script setup>
const { gsap } = useGsap()

const groups = [
  {
    title: "工作經歷",
    en: "Work",
    items: [
      { period: "2026-04 ~ 仍在職", org: "藍新資訊股份有限公司", role: "智能應用發展部", desc: "AI 應用研究與落地" },
      { period: "2019-01 ~ 2026-03", org: "藍新資訊股份有限公司", role: "專案工程師", desc: "疾病管制署駐點電腦相關維護" },
      { period: "2022-05 ~ 2022-08", org: "文境資科股份有限公司", role: "前端工程師", desc: "前端頁面切版、與後端 API 介接" },
    ],
  },
  {
    title: "學習經歷",
    en: "Education",
    items: [
      { period: "2018-08", org: "Alpha Camp", role: "學期一、二", desc: "" },
      { period: "2008-09 ~ 2012-06", org: "國立臺北科技大學", role: "光電工程系 學士", desc: "" },
    ],
  },
  {
    title: "證照",
    en: "Certification",
    items: [
      { period: "2025-11", org: "CKA", role: "Certified Kubernetes Administrator", desc: "" },
      { period: "準備中", org: "iPAS AI 應用規劃師", role: "初級", desc: "" },
    ],
  },
]

const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.utils.toArray(".resume-group").forEach((group) => {
      gsap.from(group.querySelector(".resume-rail"), {
        scaleY: 0,
        ease: "none",
        scrollTrigger: { trigger: group, start: "top 80%", end: "bottom 60%", scrub: true },
      })
      gsap.from(group.querySelectorAll(".resume-head, .resume-item"), {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: group, start: "top 78%" },
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
  .resume-group(v-for="g in groups" :key="g.en")
    .resume-rail
    .resume-head
      h2 {{ g.title }}
      span.resume-en {{ g.en }}
    .resume-list
      article.resume-item(v-for="it in g.items" :key="it.org" data-hover)
        .resume-period {{ it.period }}
        .resume-main
          h3 {{ it.org }}
          h4 {{ it.role }}
          p(v-if="it.desc") {{ it.desc }}
</template>

<style lang="stylus" scoped>
.resume
  max-width 60rem
  margin 0 auto
  padding 0 outlineSpace 8rem

.sec-head
  sectionHead()

.resume-group
  position relative
  padding-left 2.5rem
  margin-bottom 5rem

.resume-rail
  position absolute
  left 0
  top .5rem
  bottom 0
  width 1px
  background-color colorSecondary
  transform-origin top

.resume-head
  flex(flex-start,baseline)
  gap 1rem
  margin-bottom 2rem
  h2
    font-size 2rem
    font-weight 700
    letter-spacing .2em
  .resume-en
    font-family fontPixel
    font-size 1.8rem
    color colorMuted
    text-transform uppercase

.resume-list
  flex(flex-start,stretch,column)

.resume-item
  display grid
  grid-template-columns 12rem 1fr
  gap 2rem
  padding 1.6rem 1rem
  border-top 1px solid colorLine
  transition background-color .4s ease, padding-left .4s cubic-bezier(.76,0,.24,1)
  &:last-child
    border-bottom 1px solid colorLine
  &:hover
    background-color rgba(255,255,255,.04)
    padding-left 1.6rem
    .resume-period
      color colorAccent

.resume-period
  font-family fontDigital
  font-size 1.1rem
  letter-spacing .05em
  color colorMuted
  transition color .3s

.resume-main
  h3
    font-size 1.3rem
    font-weight 900
    letter-spacing .05em
  h4
    margin-top .3rem
    font-size 1rem
    font-weight 700
    color colorMuted
  p
    margin-top .8rem
    line-height 1.7
    color rgba(255,255,255,.75)

@media (max-width: breakMobile)
  .resume-group
    padding-left 1.4rem
  .resume-item
    grid-template-columns 1fr
    gap .6rem
</style>
