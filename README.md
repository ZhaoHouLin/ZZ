# ZZ

林炤后（ZhaoHou Lin）個人網站。Nuxt 4 + GSAP + Three.js，一頁式、黑白像素風、琥珀強調色。

**線上版：<https://zhaohoulin.github.io/ZZ/>**

## 開發

```sh
npm install
npm run dev        # http://localhost:3000
npm run generate   # 產出靜態站到 .output/public（dist 是 Nuxt 產生的連結，指向同一處）
npm run preview
```

## 結構

```
app/
  assets/style.styl        # 只放 stylus 變數與 mixin（自動注入每個元件；注意 flex() / min() / max() 的坑，見檔內註解）
  assets/global.styl       # 全站樣式、字型
  components/
    sections/              # 一頁式的七個區塊，依順序：Hero / Intro(About) / Resume / Lab / Github / Pens(100 Days CSS) / Mountain
    hero/                  # hero 專用：VoxelZZ（Three.js 體素閃電）、HeroRing（環形文字）、ScrambleText
    fx/                    # 全站特效：FragmentField（WebGL 碎片）、SectionBg（區塊底紋 + 巨大編號）、CursorGlow、TheCursor、TheNoise、RidgeLines
    ui/                    # TheMenu（漢堡）、SideIndex（右側索引）、BackToTop、TheFooter、PenModal
  composables/
    useGsap.js             # gsap + ScrollTrigger / ScrollTo / SplitText，統一從這裡拿
    useTilt.js             # hover 依滑鼠傾斜
    useMagnet.js           # 磁吸元件（[data-magnet]）
    useGyroTilt.js         # 手機陀螺儀，可整個拆除
  data/github.json         # GitHub 專案
  data/css100.json         # 100 Days CSS 的 CodePen 連結
  data/glyphs.js           # 各區塊碎片聚合成的像素圖示
  layouts/default.vue      # 游標、光暈、雜訊、選單、頁尾、回頂、碎片畫布
  pages/index.vue          # 一頁式主頁 + 全站共用的進場動畫
  pages/portfolio.vue      # 舊網址轉址到 /#github
  pages/favorite.vue       # 舊網址轉址到 /#mountain
public/                    # 圖示、大頭照、山景照片，見 public/README.md
docs/DECISIONS.md          # 重寫時的分析與決策
docs/ONEPAGE-3D.md         # 一頁式 + 3D 改版的問答、決策與後續調整記錄
```

## 效能護欄

修過一輪捲動卡頓後定下的規矩，改動畫前先看：

- 同一時間只有一個 WebGL 渲染迴圈：hero 可見時跑 VoxelZZ，捲走後跑 FragmentField。
- Three.js 動態載入且只解構用到的類別；1/3 解析度像素化渲染；沒有 WebGL 或 `prefers-reduced-motion` 就不建場景。
- 全站不用 `mix-blend-mode`、`backdrop-filter`、整頁 `filter`；背景動態只用 transform / opacity。
- 捲動驅動的動畫動外層容器或不同元素，不和進場動畫搶同一組元素的同一個屬性。

## 部署（GitHub Pages）

推到 `main` 會觸發 `.github/workflows/deploy.yml`：`nuxt generate`（`NUXT_APP_BASE_URL=/ZZ/`）後推到 `gh-pages` 分支。
陀螺儀需要 HTTPS，GitHub Pages 可以，區網 IP 走 http 不行。
