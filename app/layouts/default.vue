<script setup>
// 磁吸元件全站一次掛好（見 useMagnet.js），元素只要標 data-magnet
let stopMagnet = () => {}
onMounted(() => (stopMagnet = useMagnet()))
onUnmounted(() => stopMagnet())
</script>

<template lang="pug">
.layout
  ClientOnly
    TheCursor
    CursorGlow
  TheNoise
  TheMenu
  main
    slot
  TheFooter
  BackToTop
  ClientOnly
    FragmentField
</template>
