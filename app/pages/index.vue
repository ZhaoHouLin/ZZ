<script setup>
useSeoMeta({ title: "ZZ — ZhaoHou Lin" })

// 全站共用的進場：區塊標題從 Z 軸推近、標題文字逐字滑出、數量從 000 跳上去。統一在頁面層做，區塊元件不用各自寫
const { gsap, SplitText } = useGsap()
const root = ref(null)
let ctx

onMounted(async () => {
  await document.fonts.ready // 像素字型載入前拆字會用到替代字型的寬度
  if (!root.value) return
  ctx = gsap.context(() => {
    gsap.utils.toArray(".sec-head").forEach((head) => {
      gsap.from(head, {
        transformPerspective: 800,
        z: -260,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: head, start: "top 88%" },
      })
    })
    gsap.utils.toArray(".sec-head h2, .lab-tier-name, .resume-main h3").forEach((el) => {
      const split = SplitText.create(el, { type: "chars", mask: "chars" })
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.03,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      })
    })
    gsap.utils.toArray(".sec-count").forEach((el) => {
      const end = parseInt(el.textContent, 10)
      if (Number.isNaN(end)) return
      const o = { v: 0 }
      gsap.to(o, {
        v: end,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => (el.textContent = String(Math.round(o.v)).padStart(3, "0")),
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
.page-home(ref="root")
  HeroSection
  IntroSection
  ResumeSection
  LabSection
  GithubSection
  PensSection
  MountainSection
  AlbumSection
  SideIndex
</template>
