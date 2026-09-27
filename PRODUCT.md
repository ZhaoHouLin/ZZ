# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **面試官**：求職時收到連結，快速判斷這個人現在做什麼、做到什麼程度。
- **同行**：看作品與技術取向。
- **本人的名片**：在聊天、社群、履歷上分享的連結。

首要目標不是立即的行動轉換，而是讓看過的人**記住這個人**。聯絡方式要找得到，但不是頁面的終點。

## Product Purpose

林炤后（ZhaoHou Lin，綽號 ZZ）的個人網站。呈現他從前端工程師走到 AI 應用落地與 Cloud Native 的轉變，並讓人留下具體的個人印象。

## Positioning

AI Application × Cloud Native × Web 的交叉：不是單純的前端、也不是單純的 DevOps，而是能把 AI 從概念做到企業可部署系統的實作者。持有 CKA，自建過 Kubernetes 與 GitLab CI/CD，把 Nuxt 系統從開發部署到正式環境。

## Operating Context

- 部署在 GitHub Pages：<https://zhaohoulin.github.io/ZZ/>，子路徑 `/ZZ/`，推到 `main` 由 GitHub Actions 發佈。
- 常透過 LINE、Facebook 等分享連結，連結預覽圖（`public/og.png`）是第一印象的一部分。
- 桌機與手機都要能看；手機有陀螺儀互動，需要 HTTPS。

## Capabilities and Constraints

- Nuxt 4 + GSAP + Three.js，JavaScript（不用 TypeScript），pug + stylus，一頁式靜態預渲染。
- 效能護欄是硬性約束（README「效能護欄」）：同一時間只有一個 WebGL 迴圈、不用 mix-blend-mode / backdrop-filter / 整頁 filter、背景動態只用 transform / opacity。
- 靜態資源路徑必須帶 baseURL；Stylus 的 `flex 1` 與 `min()` / `max()` 有坑（見 `app/assets/style.styl`）。
- 語言：繁體中文為主，英文作為標題、標籤與點綴。沒有雙語切換的需求。

## Brand Commitments

每個識別元素都有來歷，動之前先問：

- **ZZ**：綽號縮寫。以**體素閃電**為 logo，閃電鋸齒正面讀作上下疊的 ZZ（點陣定義在 `app/components/hero/VoxelZZ.vue`，favicon 與 og.png 由同一份點陣產生）。
- **3030**：以前工作的分機號碼，放在 hero 的 LED 面板。**不是** 100 Days CSS 的 100。
- **我命由我不由天**：2025 年考完 CKA 後的體會。
- **走路要找難路走，挑擔要揀重擔挑**：2019 年爬山時的體會（目前在程式碼中註解保留）。
- **山**：個人照片 `public/mountain.jpg`，爬山是真實的興趣與體會來源。
- 使用者喜歡的參考網站：<https://trionn.com/>。

## Evidence on Hand

- 履歷：藍新資訊專案工程師（2019-01 ~ 2026-03，疾管署駐點）、智能應用發展部（2026-04 ~）、文境資科前端工程師（2022）、北科大光電、Alpha Camp。
- 證照：CKA（2025-11）；iPAS AI 應用規劃師初級準備中。
- 作品：GitHub 六個專案（`app/data/github.json`）、100 Days CSS 的 100 個 CodePen（`app/data/css100.json`），**皆為早期作品，保留並標明時期**。
- Lab 區的內部專案（企業 Nuxt 3 系統、自建 Kubernetes 平台、NAS 整合）沒有公開連結，只能描述。
- 大頭照 `public/avatar.jpg`。
- **沒有**：客戶推薦、量化成果、AI 領域的公開作品（2026-04 才轉部）。未來不得捏造。
- **刻意不公開**：身高體重、睡眠、訓練數據、公司內部證照要求等私人資訊。

## Product Principles

1. **記住這個人，勝過多看一頁。** 每個設計決策先問它是否增加記憶點。
2. **有來歷的元素才放大。** 識別元素要能說出故事；說不出來的就是裝飾，可以換。
3. **誠實呈現現在。** 定位寫的是現況；早期作品保留但標明時期，不拿舊作品冒充新方向。
4. **互動要順。** 動效再多，捲動與開窗都不能頓；效能護欄優先於新特效。
