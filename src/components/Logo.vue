<template lang="pug">
.logo ZZ
</template>

<style lang="stylus" scoped>
@font-face
  font-family 'NewYorkEscapeCondensed-Condensed'
  src url('@/assets/fonts/NewYorkEscapeCondensed-Condensed.woff') format("woff")
.logo
  z-index 2
  position absolute
  bottom outlineSpace
  right outlineSpace
  flex()
  size(10rem,auto)
  padding 0rem 0.5rem
  border 2px solid colorSecondary
  // font-family 'NewYorkEscapeCondensed-Condensed'
  font-size 8rem
  line-height 8rem
</style>
