// https://nuxt.com/docs/4.x/api/nuxt-config
import { fileURLToPath } from "node:url"

// 只放 stylus 變數與 mixin，會注入每個 <style lang="stylus">
const styleEntry = fileURLToPath(
  new URL("./app/assets/style.styl", import.meta.url)
).replace(/\\/g, "/")

export default defineNuxtConfig({
  compatibilityDate: "2026-09-12",
  devtools: { enabled: false },
  css: ["~/assets/global.styl"],
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `@import "${styleEntry}"`,
        },
      },
    },
  },
  app: {
    // GitHub Pages 部署到 /ZZ/ 時由 NUXT_APP_BASE_URL 覆寫（見 .github/workflows/deploy.yml）
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
    head: {
      htmlAttrs: { lang: "zh-Hant-TW" },
      title: "ZZ — ZhaoHou Lin",
      meta: [
        { name: "description", content: "林炤后 ZhaoHou Lin 的個人網站：AI 應用、Kubernetes、Vue / Nuxt 前端。" },
        { property: "og:title", content: "ZZ — ZhaoHou Lin" },
        { property: "og:description", content: "AI Application · Cloud Native · Web." },
        { name: "theme-color", content: "#050505" },
      ],
      // 分頁圖示：體素閃電，和 hero 同一份點陣。svg 給支援的瀏覽器（sizes any 讓 Chrome 優先選它），ico 與 png 是退回，apple-touch-icon 給 iOS 加到主畫面
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg", sizes: "any" },
        { rel: "icon", type: "image/png", href: "/icon-32.png", sizes: "32x32" },
        { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ["/", "/portfolio", "/favorite"],
      crawlLinks: true,
    },
  },
})
