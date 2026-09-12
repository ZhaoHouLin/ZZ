<script setup>
// Lab：技術路線、自建環境、內部專案、踩過的坑、正在摸的東西（內容整理自個人背景筆記，只放可公開的部分）
const { gsap } = useGsap()
const root = ref(null)
let ctx

const tiers = [
  { name: "AI Application", items: ["LLM / RAG", "Prompt Engineering", "Speech AI", "Human-in-the-loop"] },
  { name: "Software", items: ["JavaScript", "Vue 3 / Nuxt", "Google Apps Script", "REST / JWT"] },
  { name: "Cloud Native", items: ["Kubernetes (CKA)", "Docker / containerd", "GitLab CI / CD", "Ingress / TLS"] },
  { name: "Infra", items: ["Linux (Ubuntu)", "Network", "AD / LDAP", "NAS / SMB"] },
]

const lab = ["Ubuntu", "kubeadm", "containerd", "Calico", "Ingress-NGINX", "Harbor", "GitLab + Runner", "Gitea + Drone", "SMB CSI", "PV / PVC", "NodePort", "TLS"]

const pipeline = ["GitLab", "Runner", "Build Image", "Registry", "Kubernetes", "Deploy"]

const works = [
  {
    title: "企業內部 Nuxt 3 系統",
    desc: "AD / LDAP 登入、JWT Cookie session、檔案上傳下載落到 NAS（SMB CSI），部署於自建 Kubernetes，Ingress HTTPS。",
  },
  {
    title: "自建 Kubernetes 平台",
    desc: "kubeadm 從零建叢集：Calico 網路、Ingress-NGINX、Harbor registry、GitLab Runner 串成 build → push → deploy 的流程。",
  },
  {
    title: "NAS 儲存整合進 Kubernetes",
    desc: "用 SMB CSI 把 NAS 掛進 Pod，PV / PVC 統一管理；解掉 Pod 內看得到檔案、外面看不到的權限與掛載問題。",
  },
]

const logs = [
  "LDAP 登入失敗與 DNS timeout：Pod 內 DNS 解析與 AD 連線逐層排查",
  "SMB CSI mount：Pod 裡看得到檔案、外面看不到",
  "containerd 連 HTTP registry 被當成 HTTPS client 拒絕",
  "Ingress TLS 與 registry 憑證鏈",
]

const exploring = ["會議系統：語音辨識 + LLM 摘要", "ComfyUI / 本地模型", "AI Coding Assistant", "iPAS AI 應用規劃師（準備中）"]

let io

onMounted(() => {
  ctx = gsap.context(() => {
    // pipeline 的光點：編號依序亮起再暗下，循環；離開視窗暫停
    const signal = gsap
      .timeline({ repeat: -1, repeatDelay: 0.8, paused: true })
      .to(".lab-pipe-idx", { color: "#f5a623", duration: 0.2, stagger: { each: 0.28, repeat: 1, yoyo: true } })
    io = new IntersectionObserver(([e]) => (e.isIntersecting ? signal.play() : signal.pause()))
    io.observe(root.value.querySelector(".lab-pipeline"))

    gsap.utils.toArray(".lab-block").forEach((block) => {
      gsap.from(block.children, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: block, start: "top 85%" },
      })
    })
  }, root.value)
})

onUnmounted(() => {
  io?.disconnect()
  ctx?.revert()
})
</script>

<template lang="pug">
section.lab#lab(ref="root" data-glyph="lab")
  SectionBg(idx="03" variant="grid")
  .sec-head
    span.sec-idx 03
    h2 Lab

  .lab-block.lab-stack
    .lab-label stack
    .lab-tier(v-for="(t, i) in tiers" :key="t.name")
      .lab-tier-name {{ t.name }}
      ul.lab-tier-items
        li(v-for="it in t.items" :key="it") {{ it }}
      span.lab-tier-arrow(v-if="i < tiers.length - 1" aria-hidden="true") →

  .lab-cols
    .lab-block.lab-env
      .lab-label self-hosted
      ul.lab-chips
        li(v-for="c in lab" :key="c") {{ c }}
    .lab-block.lab-pipe
      .lab-label pipeline
      ol.lab-pipeline
        li(v-for="(p, i) in pipeline" :key="p")
          span.lab-pipe-idx {{ String(i + 1).padStart(2, "0") }}
          span {{ p }}

  .lab-block.lab-works
    .lab-label in-house
    article.lab-work(v-for="w in works" :key="w.title" data-hover)
      h3 {{ w.title }}
      p {{ w.desc }}

  .lab-cols
    .lab-block.lab-logs
      .lab-label debug log
      ul.lab-list
        li(v-for="l in logs" :key="l") {{ l }}
    .lab-block.lab-next
      .lab-label exploring
      ul.lab-list
        li(v-for="e in exploring" :key="e") {{ e }}
</template>

<style lang="stylus" scoped>
.lab
  max-width 70rem
  margin 0 auto
  padding 0 outlineSpace 8rem

.sec-head
  sectionHead()

.lab-block
  margin-bottom 3rem

.lab-label
  margin-bottom 1rem
  font-family fontDigital
  font-size 1rem
  letter-spacing .3em
  text-transform uppercase
  color colorAccent

// 技術路線：四層由左到右
.lab-stack
  display grid
  grid-template-columns repeat(4, 1fr)
  gap 1px
  background-color colorLine
  border 1px solid colorLine
  .lab-label
    grid-column 1 / -1
    padding 1rem 1.4rem 0
    margin 0
    background-color colorPrimary
  .lab-tier
    position relative
    padding 1.2rem 1.4rem 1.6rem
    background-color colorPrimary
  .lab-tier-name
    font-family fontPixel
    font-size 1.8rem
    line-height 1
    margin-bottom .8rem
  .lab-tier-items
    list-style none
    font-size .95rem
    line-height 1.8
    color colorMuted
  .lab-tier-arrow
    position absolute
    right -.5rem
    top 1.2rem
    z-index 1
    font-family fontPixel
    font-size 1.6rem
    color colorAccent

.lab-cols
  display grid
  grid-template-columns 1fr 1fr
  gap 3rem

.lab-chips
  list-style none
  display flex
  flex-wrap wrap
  gap .5rem
  li
    padding .35rem .7rem
    border 1px solid colorLine
    font-family fontDigital
    font-size 1rem
    letter-spacing .08em
    color colorSecondary
    transition border-color .3s, color .3s, transform .3s
    &:hover
      border-color colorAccent
      color colorAccent
      transform translateY(-2px)

.lab-pipeline
  list-style none
  flex(flex-start,stretch,column)
  li
    flex(flex-start,baseline)
    gap 1rem
    padding .6rem 0
    border-top 1px solid colorLine
    font-weight 700
    letter-spacing .05em
    &:last-child
      border-bottom 1px solid colorLine
  .lab-pipe-idx
    font-family fontDigital
    font-size 1rem
    color colorMuted

.lab-work
  padding 1.4rem 1rem
  border-top 1px solid colorLine
  transition background-color .4s ease, padding-left .4s cubic-bezier(.76,0,.24,1)
  &:last-child
    border-bottom 1px solid colorLine
  &:hover
    background-color rgba(255,255,255,.04)
    padding-left 1.6rem
  h3
    font-size 1.2rem
    font-weight 900
    letter-spacing .05em
  p
    margin-top .5rem
    line-height 1.7
    color rgba(255,255,255,.75)

.lab-list
  list-style none
  li
    position relative
    padding .5rem 0 .5rem 1.4rem
    line-height 1.6
    color rgba(255,255,255,.8)
    &::before
      content '>'
      position absolute
      left 0
      font-family fontPixel
      color colorAccent

@media (max-width: breakMobile)
  .lab-stack
    grid-template-columns 1fr
    .lab-tier-arrow
      right auto
      top auto
      left 1.4rem
      bottom -.9rem
      transform rotate(90deg)
  .lab-cols
    grid-template-columns 1fr
    gap 0
</style>
