# ZZ

林炤后（ZhaoHou Lin）個人網站。Nuxt 4 + GSAP，一頁式、純黑白、工業標籤牌語法。

**線上版：<https://zhaohoulin.github.io/ZZ/>**

## 開發

```sh
npm install
npm run dev        # http://localhost:3000
npm run generate   # 產出靜態站到 .output/public（dist 是 Nuxt 產生的連結，指向同一處）
# 本機模擬 GitHub Pages 的子路徑（Git Bash 要加 MSYS_NO_PATHCONV=1，否則 /ZZ/ 會被轉成 Windows 路徑）
MSYS_NO_PATHCONV=1 NUXT_APP_BASE_URL=/ZZ/ npm run generate
npm run preview
# 新增或修改中文內容後，重新產生自架的中文字型子集（只含網站用到的字）
node scripts/subset-font.mjs
```

## 結構

```
app/
  assets/style.styl        # 只放 stylus 變數與 mixin（自動注入每個元件）：黑白兩色、字型、labelPlate() 標籤牌、sectionHead()；注意 flex() / min() / max() 的坑，見檔內註解
  assets/global.styl       # 全站樣式、自架字型
  assets/fonts/            # Big Shoulders Display、Martian Mono、Noto Sans TC 子集（自架；中文子集由 scripts/subset-font.mjs 產生）
  components/
    sections/              # 一頁式的區塊，依順序：Hero(00) / Intro(01 About) / Resume(02) / Lab(03) / Works(04 早期作品) / Mountain(05)
    hero/                  # ZzMark（ZZ logo，一筆到底的兩個 Z）、ScrambleText（名字亂碼切換）
    fx/                    # TheCursor、CursorGlow、TheNoise
    ui/                    # TheMenu（漢堡）、SideIndex（右側索引 00～06）、BackToTop、TheFooter（06 聯絡）、PenModal
  composables/
    useGsap.js             # gsap + ScrollTrigger / ScrollTo / SplitText，統一從這裡拿
  data/github.json         # GitHub 專案
  data/css100.json         # 100 Days CSS 的 CodePen 連結
  layouts/default.vue      # 游標、光暈、雜訊、選單、頁尾、回頂
  pages/index.vue          # 一頁式主頁 + 全站共用的進場動畫
  pages/portfolio.vue      # 舊網址轉址到 /#works
  pages/favorite.vue       # 舊網址轉址到 /#mountain
public/                    # 圖示、連結預覽圖、大頭照、山景照片，見 public/README.md
PRODUCT.md                 # 產品事實：受眾、定位、識別元素的來歷、不可捏造的素材
DESIGN.md                  # 視覺系統（由完成的實作整理）
docs/DECISIONS.md          # 重寫時的分析與決策
docs/ONEPAGE-3D.md         # 一頁式 + 3D 改版記錄（3D 已在 logo 重設計時拿掉）
docs/LOGO-REDESIGN.md      # logo 與整頁重新設計的問答與決策
```

## 效能護欄

修過一輪捲動卡頓後定下的規矩，改動畫前先看：

- 不載入 WebGL；持續在跑的動畫只有游標、光暈與山景標語的光帶。
- 全站不用 `mix-blend-mode`、`backdrop-filter`、整頁 `filter`；背景動態只用 transform / opacity。
- 捲動驅動的動畫動外層容器或不同元素，不和進場動畫搶同一組元素的同一個屬性。
- 白紙 hero 上的游標、漢堡、索引靠 `[data-paper]` 與 ScrollTrigger 換成黑色，不用混色模式。

## 部署（GitHub Pages）

推到 `main` 會觸發 `.github/workflows/deploy.yml`：`nuxt generate`（`NUXT_APP_BASE_URL=/ZZ/`）後推到 `gh-pages` 分支。
陀螺儀需要 HTTPS，GitHub Pages 可以，區網 IP 走 http 不行。
