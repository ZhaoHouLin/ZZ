# 設計決策記錄

2026-09-12 — 把個人網站 ZZ（Vue 3 + Vite，2023-03 停更）重寫成 Nuxt 4 時的分析與決策。

**目標**：分析舊站風格，用 Nuxt 4 重做，保留識別、做得更酷炫，並修掉舊站的實際問題。

---

## 舊站分析

### 技術棧

Vue 3.2 + Vite 3、vue-router、Pinia（只放選單開關）、GSAP 3.11（ScrollTrigger / TextPlugin / ScrollToPlugin）、swiper（裝了沒用）、pug、stylus、vite-plugin-svg-icons（只有一個 codepen icon）。`deploy.sh` 手動 build 後 force push 到 `gh-pages`，`base: '/ZZ/'`。

### 視覺風格

| 元素 | 做法 |
|---|---|
| 配色 | 純黑 `#000` 底、白 `#fff` 字，單色；紅色只出現在漢堡 X 與選單 hover 漸層 |
| 字型 | 像素字 `Advanced_Pixel-7`（電話、信箱、環形文字、計數）、`Digital-7`；另有 4 個 woff 沒用到 |
| 識別元件 | 左上方框「ZZ」logo、SVG textPath 環形跑馬「Hello! Wellcome to my website. I'm ZZ.」、中央 `#0 → 3030` 計數、直書電話與信箱、細線構圖、圓環自訂游標（`cursor: none`） |
| 動效 | 整個 About 頁用一條 ScrollTrigger `pin + scrub` 時間軸串 4 個 `position: absolute` 的 100vh 區塊；自介用 TextPlugin 打字機；雪花 / 霓虹粒子背景 |
| 選單 | 漢堡 → 右側 40% 半透明抽屜，紅色漸層 `background-clip: text` hover |

### 內容

| 頁 | 內容 |
|---|---|
| About（`/` 與 `/about` 同一頁） | Hero、自介一段、履歷（工作 2 筆、學歷 2 筆） |
| Portfolio | GitHub 專案 6 個、100 Days CSS 的 CodePen 100 個（iframe 嵌入） |
| Favorite | 對聯「走路要找難路走 / 挑擔要揀重擔挑」、一張 Facebook 相片、6 筆相簿 JSON |

### 實際問題

| # | 嚴重度 | 問題 |
|---|---|---|
| 1 | 🔴 | `FacebookAlbum.json` 與 Favorite 背景圖全是 Facebook CDN 帶簽章的連結（`oe=63E0746B` 等），2023 年初就過期，線上全是破圖 |
| 2 | 🔴 | Portfolio、Favorite 的根元素 `position: fixed; height: 100vh`，手機版內容超出就捲不動 |
| 3 | 🟠 | About 頁動畫 `end: "+=4000"` 硬編，`.test1` / `.test2` 是空區塊佔著時間軸，`Resume` 被 `SectionIntro` 和 `About` 各 import 一次 |
| 4 | 🟠 | `CardContent.vue` 每張卡 `onMounted` 都往 `body` 塞一次 CodePen `ei.js`（100 次），iframe 用 `translate(0,-51px)` 蓋掉 CodePen header |
| 5 | 🟠 | `Cursor.vue` 用 `gsap.to({}, 0.016, { repeat: -1 })` 當 rAF 輪詢；粒子背景用 `innerHTML` 產 50 個 div 各跑 3 條無限 tween |
| 6 | 🟠 | `main.css` / `base.css` 是 Vite 範本殘留（Vue 綠色 link、1024px 以上 `#app` 變 grid），與 `style.styl` 互相打架 |
| 7 | 🟡 | 環形文字 `Wellcome` 拼錯；`textLength='180%'` 硬撐；swiper、4 個字型、5 個 Icon*.vue、`InfoCrawl`、`LineAnimation` 未使用 |
| 8 | 🟡 | 資料 JSON 混了 UI 狀態（`open: false`）；`import "../data/CSS100.json"` 大小寫與檔名 `css100.json` 不符（Windows 才跑得動） |
| 9 | 🟡 | README 是 Vite 範本原文 |

---

## 決策

**Q1 — 新專案放哪裡？**
選項：A 直接在 `ZZ` repo 開 `nuxt4` 分支重寫 / B 另開新 repo / C 從 ZZ-Frame-Nuxt 模板長出來
✅ **A**。保留 git 歷史與 GitHub Pages 目的地（`/ZZ/`、`gh-pages`），review 完 merge 到 main 即上線；和 ZZ-Frame-Nuxt 的 `nuxt4` 分支做法一致。C 不選是因為模板帶 naive-ui、LDAP、JWT、檔案上傳，個人網站一個都用不到。

**Q2 — 風格要改多少？**
選項：A 全換風格 / B 保留黑白像素識別，加一個強調色與更多動效
✅ **B**。「ZZ」方框、環形文字、直書聯絡資訊、像素字、圓環游標是這個站的識別；紅色 `#ff2a2a` 本來就在漢堡與選單裡，拉出來當唯一強調色。

**Q3 — SSR 還是 SPA？**
選項：A `ssr: false`（同模板）/ B SSR + `nuxt generate` 預渲染
✅ **B**。GitHub Pages 是靜態，預渲染讓 `/portfolio`、`/favorite` 直開有 HTML，也有 SEO。代價是所有動畫都必須在 `onMounted` 才碰 `window`，隨機值（粒子、山脊線）在 client 生成或包 `<ClientOnly>`，避免 hydration mismatch。

**Q4 — 整頁 pin 的捲動時間軸要不要留？**
✅ **不留**。改成一般文件流：Hero 100vh 做視差淡出，下面各區塊各自用 ScrollTrigger。理由：舊做法 `+=4000` 硬編、手機版底部空白（舊站註解也在抱怨）、加內容就要重調整條時間軸。

**Q5 — 100 個 CodePen iframe 怎麼載？**
✅ **點開才建 iframe**，一次只有一個；彈窗 `Teleport` 到 body，鍵盤 ← → 切換、Esc 關閉。不再蓋 CodePen header（原本 `-51px` 的 hack），連結指到 pen 頁。

**Q6 — 過期的 Facebook 相片怎麼辦？**
✅ **改讀 `public/album/01~06.jpg`**，`album.json` 只留標題與本機路徑；圖片不存在時顯示編號占位（SSR 下 `<img>` 可能在 hydration 前就 404，`@error` 不會觸發，`onMounted` 補查 `naturalWidth === 0`）。圖片由使用者自己補。

**Q7 — 部署方式？**
✅ **GitHub Actions**：push `main` → `nuxt generate`（`NUXT_APP_BASE_URL=/ZZ/`）→ `peaceiris/actions-gh-pages` 推到 `gh-pages`。目的地與舊 `deploy.sh` 相同，Pages 設定不用改；`public/.nojekyll` 防止 `_nuxt/` 被 Jekyll 忽略。只綁 `main` 是為了 `nuxt4` 分支可以先 review，不會覆蓋線上舊站。

**Q8 — 狀態管理？**
✅ **不裝 Pinia**。唯一的跨元件狀態是選單開關，`useState('menuOpen')` 就夠。

**Q9 — stylus 檔案怎麼分？**
✅ `app/assets/style.styl` 只放變數與 mixin（沿用舊站 `flex()` / `size()` / `pos()` / `colorPrimary` 命名），由 `nuxt.config` 的 `additionalData` 注入每個 SFC；全站規則放 `global.styl`。
踩到的坑：`additionalData` 只注入 SFC 的 `<style lang="stylus">`，`css: []` 陣列裡的 `.styl` 不會注入，`global.styl` 要自己 `@import './style.styl'`，否則 `colorPrimary` 原樣輸出、整站變白底。

**Q10 — 履歷、自介內容？**
✅ **照舊站原樣搬**，不改事實。「2019-01 ~ 仍在職」與「2022-05 ~ 2022-08」時間順序看起來有點怪，留給使用者確認。

---

## 新版元件對照

| 舊 | 新 | 差異 |
|---|---|---|
| `Cursor.vue` + `useMousePosition` | `TheCursor.vue` | `gsap.quickTo` 慣性跟隨、雙層（環 + 點）、`mix-blend-mode: difference`、hover 到 `a / button / [data-hover]` 放大；`pointer: coarse` 不顯示 |
| `Hamburger.vue` + `Menu.vue` + `stores/counter.js` | `TheMenu.vue` | 全螢幕 `clip-path` 展開、項目 stagger、格線背景、Esc 關閉、換頁自動關 |
| `BackgroundLikeNeon` / `BackgroundLikeSnow` | `ParticleField.vue` | canvas 星座線，粒子被滑鼠推開，`gsap.ticker` 驅動，`prefers-reduced-motion` 時只畫靜態一幀 |
| `InfoText.vue`（TextPlugin） | `ScrambleText.vue` | 亂碼解碼輪播 ZhaoHou Lin / Raiden / 林炤后 |
| `Ring.vue` | `HeroRing.vue` | 修 Welcome 拼字、計數改 0 → 100 呼應 100 Days CSS |
| `Logo.vue` + `SectionHome.vue` | `HeroSection.vue` | 加即時時鐘、進場時間軸與捲動視差分開動內外層，避免搶同一屬性 |
| `InfoCrawl.vue`（未用） | `IntroSection.vue` 跑馬燈 | 兩列反向、一列描邊 |
| `SectionIntro.vue` | `IntroSection.vue` | 逐字隨捲動點亮（scrub） |
| `Resume.vue` | `ResumeSection.vue` | 資料抽成陣列、時間軸線隨捲動畫出 |
| `CardContent.vue` | `PenModal.vue` | 見 Q5 |
| `Favorite.vue` | `pages/favorite.vue` + `RidgeLines.vue` | 生成式山脊 SVG 跟滑鼠視差、興趣清單、相簿格 |
| — | `TheNoise.vue`、`TheFooter.vue` | 膠捲顆粒層、頁尾 |

刪除：swiper、vite-plugin-svg-icons、Pinia、`LineAnimation`、5 個 `Icon*.vue`、4 個未用字型、`main.css` / `base.css`、`deploy.sh`、`.eslintrc.cjs`。

---

## 驗證

- `npm run generate` 通過，預渲染 `/`、`/portfolio`、`/favorite` + `200.html` / `404.html`，產出 551 KB。
- Chrome 實跑（1568×771）：三頁、選單、CodePen 彈窗（含 → 與 Esc）、對聯、相簿占位皆正常，console 無錯誤。
- **未驗證**：手機寬度只寫了 media query，沒實機看；`.github/workflows/deploy.yml` 沒跑過（要 push 到 main 才會觸發）。

## 待辦

- `public/album/01.jpg ~ 06.jpg` 補圖。
- 確認履歷時間。
- Review 後 merge `nuxt4` → `main`、push，第一次 Actions 跑完到 GitHub Pages 看 `/ZZ/` 是否正常。
