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
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  nitro: {
    prerender: {
      routes: ["/", "/portfolio", "/favorite"],
      crawlLinks: true,
    },
  },
})
