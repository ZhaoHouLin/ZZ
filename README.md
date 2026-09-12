# ZZ

林炤后（ZhaoHou Lin）個人網站。Nuxt 4 + GSAP，黑白像素風。

## 開發

```sh
npm install
npm run dev        # http://localhost:3000
npm run generate   # 產出靜態站到 .output/public
npm run preview
```

## 結構

```
app/
  assets/style.styl    # 只放 stylus 變數與 mixin（自動注入每個元件）
  assets/global.styl   # 全站樣式、字型、頁面轉場
  components/          # TheCursor / TheMenu / TheNoise / ParticleField / ScrambleText
                       # HeroSection / HeroRing / IntroSection / ResumeSection
                       # PenModal / RidgeLines / TheFooter
  composables/useGsap.js
  data/github.json     # GitHub 專案
  data/css100.json     # 100 Days CSS 的 CodePen 連結
  data/album.json      # 相簿（圖片放 public/album/）
  pages/index.vue      # About：Hero + 自介 + 履歷
  pages/portfolio.vue  # GitHub 專案 + 100 Days CSS 彈窗
  pages/favorite.vue   # 山 / 興趣 / 相簿
```

## 部署（GitHub Pages）

推到 `main` 會觸發 `.github/workflows/deploy.yml`：`nuxt generate`（`NUXT_APP_BASE_URL=/ZZ/`）後推到 `gh-pages` 分支，
和舊的 `deploy.sh` 一樣的目的地，GitHub Pages 設定不用改。

## 待補

- `public/album/01.jpg ~ 06.jpg`：舊站的 Facebook CDN 圖片連結全部過期，改讀本機圖片。
- 履歷內容在 `app/components/ResumeSection.vue`，自介在 `IntroSection.vue`。
