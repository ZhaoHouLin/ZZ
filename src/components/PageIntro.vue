<template lang="pug">
.page-intro
  .introduction
    p 林炤后(ZhaoHou Lin)曾任職於文境資科前端工程師，不斷地追求網頁互動特效技術。目前就職於藍新資訊-疾管署專案工程師，擅長使用Vue3前端網頁開發，以及解決電腦硬體相關問題。
    p 平時喜歡研究3C產品、汲取網頁程式相關新知、玩玩線上遊戲，偶而與朋友爬山...
</template>

<style lang="stylus" scoped>
.page-intro
  background-color transparent
  flex()
  .introduction
    flex(,,column)
  .introduction p
    size(80%,auto)
    fontStyle()

@media screen and (max-width: 768px)
  .page-intro .introduction p
    fontStyle(1.4rem)
</style>
