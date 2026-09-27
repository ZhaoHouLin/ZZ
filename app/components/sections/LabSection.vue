<script setup>
// 03 Lab：大字清單（docs/LOGO-REDESIGN.md L3）。四層技術用巨大的模版字疊成四行，滑過某一層時其他層變暗；
// CI/CD 是一條橫貫的長線加六個節點，節點依序亮起循環
const { gsap } = useGsap()

const tiers = [
  { name: "AI Application", items: ["LLM / RAG", "Prompt Engineering", "Speech AI", "Human-in-the-loop"] },
  { name: "Software", items: ["JavaScript", "Vue 3 / Nuxt", "Google Apps Script", "REST / JWT"] },
  { name: "Cloud Native", items: ["Kubernetes (CKA)", "Docker / containerd", "GitLab CI / CD", "Ingress / TLS"] },
  { name: "Infra", items: ["Linux (Ubuntu)", "Network", "AD / LDAP", "NAS / SMB"] },
]
const selfHosted = ["Ubuntu", "kubeadm", "containerd", "Calico", "Ingress-NGINX", "Harbor", "GitLab + Runner", "Gitea + Drone", "SMB CSI", "PV / PVC", "NodePort", "TLS"]
const pipeline = ["GitLab", "Runner", "Build Image", "Registry", "Kubernetes", "Deploy"]
const works = [
  { title: "企業內部 Nuxt 3 系統", desc: "AD / LDAP 登入、JWT Cookie session、檔案上傳下載落到 NAS（SMB CSI），部署於自建 Kubernetes，Ingress HTTPS。" },
  { title: "自建 Kubernetes 平台", desc: "kubeadm 從零建叢集：Calico 網路、Ingress-NGINX、Harbor registry、GitLab Runner 串成 build → push → deploy 的流程。" },
  { title: "NAS 儲存整合進 Kubernetes", desc: "用 SMB CSI 把 NAS 掛進 Pod，PV / PVC 統一管理；解掉 Pod 內看得到檔案、外面看不到的權限與掛載問題。" },
]
const logs = [
  "LDAP 登入失敗與 DNS timeout：Pod 內 DNS 解析與 AD 連線逐層排查",
  "SMB CSI mount：Pod 裡看得到檔案、外面看不到",
  "containerd 連 HTTP registry 被當成 HTTPS client 拒絕",
  "Ingress TLS 與 registry 憑證鏈",
]
const exploring = ["會議系統：語音辨識 + LLM 摘要", "ComfyUI / 本地模型", "AI Coding Assistant", "iPAS AI 應用規劃師（準備中）"]

const hovered = ref(-1)
const step = ref(-1) // CI/CD 目前亮的節點
const root = ref(null)
let ctx
let io

onMounted(() => {
  ctx = gsap.context(() => {
    // 節點依序亮起，走完一輪停一下再來；離開視窗暫停
    const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true })
    pipeline.forEach((_, i) => loop.call(() => (step.value = i), null, i * 0.45))
    loop.call(() => (step.value = -1), null, pipeline.length * 0.45 + 0.4)
    io = new IntersectionObserver(([e]) => (e.isIntersecting ? loop.play() : loop.pause()))
    io.observe(root.value.querySelector(".lab-line"))

    gsap.from(".lab-line-rule", {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: ".lab-line", start: "top 85%" },
    })
  }, root.value)
})

onUnmounted(() => {
  io?.disconnect()
  ctx?.revert()
})
</script>

<template lang="pug">
section.lab#lab(ref="root")
  .sec-head
    span.sec-idx 03
    h2 Lab
  ol.tiers(@mouseleave="hovered = -1")
    li.tier(
      v-for="(t, i) in tiers"
      :key="t.name"
      :class="{ 'is-dim': hovered >= 0 && hovered !== i }"
      @mouseenter="hovered = i"
    )
      h3.lab-tier-name {{ t.name }}
      p.tier-items {{ t.items.join(" · ") }}
  p.lab-self
    span.lab-label 自建環境
    | {{ selfHosted.join(" · ") }}

  .lab-line
    h3.lab-sub CI / CD
    .lab-line-track
      .lab-line-rule(aria-hidden="true")
      ol.lab-nodes
        li(v-for="(p, i) in pipeline" :key="p" :class="{ 'is-on': step === i }")
          span.node-dot(aria-hidden="true")
          span.node-no {{ String(i + 1).padStart(2, "0") }}
          span.node-name {{ p }}

  h3.lab-sub.lab-works-title 內部專案
  ol.lab-works
    li(v-for="w in works" :key="w.title")
      h4 {{ w.title }}
      p {{ w.desc }}

  .lab-notes
    div
      h3.lab-sub 踩過的坑
      ul
        li(v-for="l in logs" :key="l") {{ l }}
    div
      h3.lab-sub 進行中
      ul
        li(v-for="e in exploring" :key="e") {{ e }}
</template>

<style lang="stylus" scoped>
.lab
  max-width 78rem
  margin 0 auto
  padding 6rem outlineSpace 9rem

.sec-head
  sectionHead()

.lab-sub
  font-family fontDisplay
  font-weight 900
  font-size 1.6rem
  letter-spacing .04em
  text-transform uppercase

.lab-label
  font-family fontMono
  font-size .75rem
  letter-spacing .18em
  text-transform uppercase
  color colorMuted

// 四層大字
.tiers
  list-style none
  display grid
  gap .4rem
.tier
  display flex
  align-items baseline
  flex-wrap wrap
  gap .2rem 1.6rem
  padding-block .3rem
  transition opacity .35s ease
  &.is-dim
    opacity .22
.lab-tier-name
  font-family fontDisplay
  font-weight 900
  font-size clamp(3rem, 8vw, 6rem)
  line-height .95
  letter-spacing .02em
  text-transform uppercase
.tier-items
  color colorSoft
  font-size 1rem

.lab-self
  margin-top 1.8rem
  color colorMuted
  line-height 1.9
  .lab-label
    margin-right 1rem

// CI/CD 長線
.lab-line
  margin-top 5.5rem
.lab-line-track
  position relative
  margin-top 1.6rem
.lab-line-rule
  pos(0, 1.1rem)
  size(100%, 2px)
  background-color colorSecondary
.lab-nodes
  list-style none
  position relative
  display grid
  grid-template-columns repeat(6, minmax(0, 1fr))
  li
    display grid
    gap .5rem
    justify-items start
  .node-dot
    size(.9rem)
    margin-top .65rem
    background-color colorPrimary
    border 2px solid colorSecondary
    transition background-color .2s ease
  .node-no
    font-family fontMono
    font-size .7rem
    color colorMuted
  .node-name
    font-family fontDisplay
    font-weight 900
    font-size 1.5rem
    letter-spacing .03em
    transition opacity .2s ease
    opacity .55
  .is-on
    .node-dot
      background-color colorSecondary
    .node-name
      opacity 1

// 三個內部專案
.lab-works-title
  margin-top 5.5rem
.lab-works
  list-style none
  margin-top 1.2rem
  display grid
  grid-template-columns repeat(3, minmax(0, 1fr))
  gap 2.5rem
  border-top 1px solid colorLine
  padding-top 2rem
  li
    display grid
    gap .6rem
    align-content start
  h4
    font-size 1.3rem
    font-weight 900
    letter-spacing .04em
  p
    color colorSoft
    line-height 1.75

.lab-notes
  margin-top 4rem
  display grid
  grid-template-columns repeat(2, minmax(0, 1fr))
  gap 2.5rem
  ul
    list-style none
    margin-top 1rem
    display grid
    gap .6rem
  li
    padding-left 1.4rem
    position relative
    line-height 1.7
    color colorSoft
    &::before
      content ''
      pos(0, .72em)
      size(.6rem, 2px)
      background-color colorSecondary

@media (max-width: breakMobile)
  .lab
    padding-block 4rem 6rem
  .tier
    display grid
  .lab-tier-name
    font-size clamp(2.2rem, 11vw, 3rem)
  .tier-items
    font-size .85rem
  // 手機上長線改直的，節點由上而下
  .lab-line-rule
    pos(.44rem, 0)
    size(2px, 100%)
  .lab-nodes
    grid-template-columns 1fr
    gap 1.1rem
    li
      grid-template-columns 1rem 2.2rem 1fr
      align-items center
    .node-dot
      margin-top 0
  .lab-works, .lab-notes
    grid-template-columns 1fr
    gap 2rem
</style>
