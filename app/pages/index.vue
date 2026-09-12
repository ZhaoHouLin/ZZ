<script setup>
useSeoMeta({ title: "ZZ — ZhaoHou Lin" })

// 各區塊標題進場：從 Z 軸深處推近（docs/ONEPAGE-3D.md Q12），統一在這裡做，區塊元件不用各自寫
const { gsap } = useGsap()
const root = ref(null)
let ctx

onMounted(() => {
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
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template lang="pug">
.page-home(ref="root")
  HeroSection
  IntroSection
  ResumeSection
  GithubSection
  PensSection
  MountainSection
  AlbumSection
  SideIndex
</template>
