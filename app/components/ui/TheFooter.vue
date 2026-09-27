<script setup>
// 06 聯絡：整頁的收尾（docs/LOGO-REDESIGN.md 整頁構圖 06）。信箱與電話直接寫出來可以選取，底部一個巨大的 ZZ 描邊只露上半
const year = new Date().getFullYear()
const contacts = [
  { k: "Mail", v: "rodes5292@gmail.com", href: "mailto:rodes5292@gmail.com" },
  { k: "Phone", v: "+886 906-822-708", href: "tel:+886906822708" },
  { k: "GitHub", v: "ZhaoHouLin", href: "https://github.com/ZhaoHouLin", ext: true },
  { k: "CodePen", v: "rodes", href: "https://codepen.io/rodes", ext: true },
  { k: "Facebook", v: "ZhaoHouLin", href: "https://www.facebook.com/ZhaoHouLin", ext: true },
]
</script>

<template lang="pug">
footer.contact#contact
  .contact-head
    span.sec-idx 06
    h2 Contact
  .contact-grid
    p.contact-big 聯絡
    ul.contact-list
      li(v-for="c in contacts" :key="c.k")
        span.contact-k {{ c.k }}
        a.contact-v(:href="c.href" :target="c.ext ? '_blank' : null" :rel="c.ext ? 'noopener' : null") {{ c.v }}
  p.contact-copy © {{ year }} · ZhaoHou Lin · Nuxt 4 + GSAP
  .contact-mark(aria-hidden="true")
    ZzMark(:stroke="3")
</template>

<style lang="stylus" scoped>
// 內層和其他區塊的內容一樣寬（78rem 扣掉兩側 outlineSpace），左緣與標題線才會切齊
.contact
  position relative
  overflow hidden
  padding 6rem 0 0
  border-top 1px solid colorLine
.contact-head, .contact-grid, .contact-copy
  width calc(100% - 2.8rem)
  max-width calc(78rem - 2.8rem)
  margin-inline auto

.contact-head
  margin-bottom 3rem
  display flex
  align-items center
  gap 1.2rem
  padding-bottom 1.2rem
  border-bottom 1px solid colorLine
  .sec-idx
    labelPlate(1.5rem)
  h2
    font-family fontDisplay
    font-size clamp(2.6rem, 5vw, 4rem)
    font-weight 900
    line-height 1
    letter-spacing .04em
    text-transform uppercase

.contact-grid
  display grid
  grid-template-columns minmax(0, 1fr) minmax(0, 1.4fr)
  gap 3rem
  align-items start

.contact-big
  font-size clamp(4rem, 12vw, 6rem)
  font-weight 900
  line-height 1
  letter-spacing .06em

.contact-list
  list-style none
  display grid
  gap .9rem
  li
    display grid
    grid-template-columns 9rem minmax(0, 1fr)
    align-items center
    gap 1.2rem
  .contact-k
    labelPlate(1.2rem)
    justify-self start
  .contact-v
    font-size clamp(1.1rem, 2vw, 1.5rem)
    font-weight 700
    overflow-wrap anywhere
    text-decoration underline
    text-decoration-thickness 1px
    text-underline-offset .3em
    text-decoration-color colorMuted
    transition text-decoration-color .2s ease
    &:hover
      text-decoration-color colorSecondary

// 一面牆：ZZ 放大到約 62% 視窗寬，從頁尾底部冒出來，露出上橫、第一道斜筆與中橫（筆畫從方框 22.5% 開始）
.contact-mark
  position relative
  height 28vw
  margin-top 1.5rem
  overflow hidden
  color colorSecondary
  svg
    position absolute
    left 18vw
    top -13.5vw
    width 62vw
    height 62vw

.contact-copy
  margin-top 4rem
  font-size .78rem
  letter-spacing .06em
  color colorMuted

@media (max-width: breakMobile)
  .contact
    padding-top 4rem
  .contact-grid
    grid-template-columns 1fr
    gap 2rem
  .contact-list li
    grid-template-columns 7rem minmax(0, 1fr)
    gap .8rem
  // 手機上放大到 1.5 倍視窗寬，露出上橫與第一道斜筆才讀得出是字
  .contact-mark
    height 66vw
    svg
      left -12vw
      top -33.75vw
      width 150vw
      height 150vw
</style>
