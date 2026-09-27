---
name: ZZ
description: 林炤后（ZZ）的一頁式個人網站：配電箱標籤與牆上大字，純黑白。
colors:
  ink: "#050505"
  paper: "#f2f2f2"
  muted-on-ink: "#8c8c8c"
  soft-on-ink: "#c4c4c4"
  muted-on-paper: "#595959"
  rule-on-ink: "#2a2a2a"
typography:
  display:
    fontFamily: "'Big Shoulders Display', 'Noto Sans TC Subset', '微軟正黑體', 'Microsoft JhengHei', sans-serif"
    fontSize: "clamp(3.2rem, 11vh, 6rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "0.04em"
  headline:
    fontFamily: "'Big Shoulders Display', 'Noto Sans TC Subset', '微軟正黑體', 'Microsoft JhengHei', sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 4rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.04em"
  title:
    fontFamily: "'Big Shoulders Display', 'Noto Sans TC Subset', '微軟正黑體', 'Microsoft JhengHei', sans-serif"
    fontSize: "1.6rem"
    fontWeight: 900
    letterSpacing: "0.04em"
  body:
    fontFamily: "'Noto Sans TC Subset', '微軟正黑體', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  body-lead:
    fontFamily: "'Noto Sans TC Subset', '微軟正黑體', 'Microsoft JhengHei', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 2vw, 1.55rem)"
    fontWeight: 500
    lineHeight: 1.9
    letterSpacing: "0.04em"
  label:
    fontFamily: "'Big Shoulders Display', 'Noto Sans TC Subset', '微軟正黑體', 'Microsoft JhengHei', sans-serif"
    fontSize: "1.4rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.06em"
    fontFeature: "tnum"
  mono:
    fontFamily: "'Martian Mono', ui-monospace, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.14em"
    fontFeature: "tnum"
rounded:
  none: "0px"
  pin: "50%"
spacing:
  gutter: "1.4rem"
  head-gap: "1.2rem"
  head-bottom: "3rem"
  section-top: "6rem"
  section-bottom: "9rem"
  container: "78rem"
components:
  label-plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: ".28em .6em .22em 1.3em"
  label-plate-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: ".28em .6em .22em 1.3em"
  table-row:
    textColor: "{colors.paper}"
    padding: "1.1rem .8rem"
  table-row-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  index-num:
    textColor: "{colors.paper}"
    typography: "{typography.mono}"
    padding: ".3rem .4rem .25rem"
    width: "2.8rem"
  index-num-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  back-to-top:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    size: "3.2rem"
    rounded: "{rounded.none}"
---

# Design System: ZZ

## Overview

**Creative North Star: "The Switchboard Label"（配電箱上的標籤）**

一個人的識別像貼在配電箱上的標籤與牆上噴的大字：直白、不裝飾、一眼讀完。整站只有兩種底，純黑 (ink) 與白紙 (paper)，所有標記都是同一種白底黑字、左側一個釘孔的標籤牌；標題是模版粗體大字，資料排在細線表格裡。沒有卡片、沒有漸層光暈做主角、沒有第三個顏色。

密度是「牆面」而不是「儀表板」：大字大留白，細節收進等寬字的編號與日期。首屏是全站唯一的白紙區，巨大的 ZZ 閃電筆畫左端出框，底部一條 45 度斜紋帶；其餘區塊都在黑底上，Mountain 區是唯一的滿版照片。

已確認拒絕的方向：黑底霓虹、像素復古、卡片網格這類個人網站預設；以及先前的琥珀色強調色（已全數移除）。

**Key Characteristics:**
- 兩種底色、零強調色；灰只用於次要文字與細線。
- 標籤牌 (labelPlate) 是全站唯一的標記語法。
- 模版粗體大寫展示字，等寬字只給數字、規格、日期。
- 細線表格取代卡片；hover 以黑白反轉回應。
- 按住首屏，閃電從頭劈到尾再閃白，是唯一的招牌互動。

## Colors

一黑一白，灰階只是它們的次要聲音。

### Primary
- **Transformer Black**（ink）：全站預設底色、白紙區上的文字與筆畫、標籤牌的字與釘孔。首屏以外的每個區塊都坐在它上面。

### Neutral
- **Label Paper**（paper）：首屏底色、黑底上的正文、標籤牌底、hover 反轉後的底、選取反白、focus 外框。
- **Conduit Grey**（muted-on-ink）：黑底上的次要文字（日期、說明、區塊計數、捲軸），對黑約 5.9:1。
- **Cable Grey**（soft-on-ink）：黑底上比正文淡一階的長段文字（清單、說明段落、Lab 技能列、百日格數字），對黑約 11:1。
- **Pencil Grey**（muted-on-paper）：白紙與反轉列上的次要文字，對白約 6.5:1。
- **Wire Rule**（rule-on-ink）：黑底上的 1px 細線：區塊標題底線、表格列線、面板外框、手機進度軌。

### Named Rules
**The Two Grounds Rule.** 介面只有 ink 與 paper 兩種底色，沒有第三個色相。唯一的例外是 Mountain 區的彩色照片，它是內容，不是介面色。

**The Grey Is Secondary Rule.** 灰只能出現在次要文字與細線上，不能當底色、不能當標題色、不能拿來做強調。所有灰都來自色票（muted、soft、rule），不寫死色碼。

## Typography

**Display Font:** Big Shoulders Display 800/900（自架 woff2，僅拉丁字母；中文退回自架的 Noto Sans TC 子集）
**Body Font:** Noto Sans TC 子集（自架可變字重 100～900，只含網站用到的字，約 97KB；由 scripts/subset-font.mjs 產生，改中文內容後要重跑；退回微軟正黑體、system-ui）
**Label/Mono Font:** Martian Mono（自架 woff2）

**Character:** 窄而高的模版粗體像噴漆與鋼印，把每個英文字變成招牌；正黑體內文穩穩承接中文；等寬字像設備銘牌上的序號，只在需要對齊數字時出現。

### Hierarchy
- **Display**（900, clamp(3.2rem, 11vh, 6rem), 0.9）：首屏 ZERO ZONE；Lab 四層技術名 (clamp(3rem, 8vw, 6rem), 0.95) 同級。一律大寫。
- **Headline**（900, clamp(2.6rem, 5vw, 4rem), 1）：區塊標題 About / Resume / Lab / Early Works / Mountain / Contact，大寫，永遠和編號標籤牌同列。
- **Title**（900, 1.6rem）：區塊內小標（CI / CD、GitHub、100 Days CSS），大寫；表格內的年份用展示字 900、3rem、tabular-nums。
- **Body**（400–700, 16px, 1.7）：表格說明、清單；自介段落用 body-lead（500, clamp(1.2rem, 2vw, 1.55rem), 1.9, 最寬 36em）。中文強調用 900 粗體正黑體，不換字體。
- **Label**（900, 1–1.6rem 依場合, 0.06em, 大寫, tabular-nums）：只透過標籤牌出現。
- **Mono**（400–500, 0.66–0.9rem, 0.08–0.2em, tabular-nums）：編號 01–06、日期區間、規格、EXT 字樣、提示文字。

### Named Rules
**The Mono Is For Numbers Rule.** Martian Mono 只用於編號、規格、日期與短提示；句子與標題不用等寬字。

**The Latin Display Rule.** 展示字只負責拉丁字母；中文大字直接用正黑體 900，不另找中文展示字體，也不讓它掉到系統細體。

## Layout

內容欄寬 78rem 置中，兩側留白 1.4rem (gutter)，這個 gutter 同時是固定元件（漢堡、索引、回頂、首屏標籤牌）到視窗邊的距離。區塊上 6rem、下 9rem（手機 4rem / 6rem；About 為 9rem / 9rem）。

每個區塊以標題列開頭：編號標籤牌 + 大寫標題 + 右側可選的等寬計數，下方 1px 細線，距內容 3rem。內容多用細線表格：頂線一條、每列底線一條、列內距約 1rem，欄位由 CSS grid 定義，第一欄常是標籤牌或大年份。

全出血的只有兩處：首屏白紙（高 max(100vh, 640px)）與 Mountain 照片（高 max(100vh, 600px)）。頁尾底部有一個只露上半的巨大 ZZ 描邊（約 62vw，手機 150vw）。

斷點兩個：960px 以下雙欄版面（工作證＋自介、早期作品）改單欄；768px 以下表格欄收成「標籤欄 + 內容欄」、CI/CD 長線轉直、右側索引只剩一條 2px 捲動進度線。

## Elevation & Depth

平的。深度只靠兩種底色的切換、1px 細線與 hover 反轉，不靠陰影堆疊。全頁一層 7% 不透明的膠捲顆粒（SVG feTurbulence，只以 transform 抖動）給純黑一點材質；游標附近有一圈 7% 白的柔光。唯二的陰影是實物隱喻：About 的工作證（像一張掛在牆上的卡）與 CodePen 視窗下方的柔和落影，兩者都是低對比的擴散陰影，不是硬邊位移陰影。

### Shadow Vocabulary
- **Hung Badge**（`box-shadow: 0 1.6rem 3rem -1rem rgba(0,0,0,.7)`）：只給工作證。
- **Modal Drop**（`box-shadow: 0 30px 80px rgba(0,0,0,.6)`）：只給 CodePen 視窗，底下是 92% 黑的遮罩，不模糊背景。

### Named Rules
**The Flat Wall Rule.** 新元件預設沒有陰影；要分層就換底色或加細線。

**The Paper Context Rule.** 游標、漢堡、索引在白紙上改成黑色，靠 `[data-paper]` 與捲動位置切換 CSS 變數，不用混色模式。

## Shapes

直角是預設：標籤牌、表格列、索引編號、百日格、回頂按鈕、視窗都是 0 圓角。圓只出現在代表實物的小零件：標籤牌的釘孔、配電箱面板四角的螺絲、游標的環與點；工作證頂端的掛繩孔 (.4rem) 是唯一的圓角矩形。

線條語彙：1px 細線分隔，1.5px 框給索引編號與回頂，2px 給 CI/CD 長線與工作證部門底線。ZZ 筆畫是方頭方角（square cap、miter join），箭頭圖示也是同樣的方頭 SVG 線。

全站只有一個斜紋：首屏底部 45 度黑白斜紋帶（每格 1.3rem，高 4.5rem，手機 3.2rem）。

## Components

### Label Plate（標籤牌，signature）
全站唯一的標記。
- **Shape:** 直角，白底黑字，左內距 1.3em 讓出釘孔；釘孔是 0.32em 的黑色圓點。
- **Type:** 展示字 900、大寫、0.06em、tabular-nums，字級依場合 1–1.6rem；選單裡放大到 clamp(2.6rem, 8vw, 5.5rem)。
- **Variants:** 反色版（黑底白字白釘孔）只用在白紙首屏的 EXT 3030；框線版（透明底、1px 白 outline）用在 Archive 註記與選單項目的 hover。
- **Used for:** 區塊編號、EXT 3030、做事方式與履歷分組的欄首、聯絡欄位名、Mountain 的年份註記、選單項目。

### Section Head（區塊標題列）
- 編號標籤牌 (1.5rem) + Headline + 右側可選等寬計數，gap 1.2rem，底部 1px Wire Rule，下距 3rem。

### Ruled Table（細線表格）
- 頂線與列底線都是 Wire Rule；無底色、無圓角。
- **Hover:** 整列反轉為 paper 底 ink 字 (.25s ease)，列內次要文字改 Pencil Grey。GitHub 清單同樣反轉，箭頭同時往右上移 3px。

### Navigation
- **漢堡:** 固定右上，3.4×2.6rem 的底板和目前底色相同，三條 3px 線；打開時轉成 X（cubic-bezier(.76, 0, .24, 1)）。
- **選單:** 滿版黑色配電箱面板，1px 外框、兩角螺絲，由中線 clip-path 展開；項目是等寬編號 + 大標籤牌，hover 轉框線版。
- **右側索引:** 00–06 等寬編號，1.5px 框；目前區塊填滿反轉；hover 時左側浮出大寫區塊名。手機改為右緣 2px 進度線。

### Buttons
- **Back to Top:** 3.2rem 白色方塊、黑色方頭箭頭 + TOP，捲過首屏 80% 才淡入，只動 opacity（transform 留給磁吸）。
- **百日格:** 10×10 方格，1px 框，展示字編號；hover、focus、選中時反轉為白底黑字。
- **Focus:** 全站 2px paper 外框、3px offset。

### Lightning Strike（按住劈下，signature interaction）
首屏的 ZZ 是一條 SVG 路徑。進場時以 stroke-dashoffset 從頭描到尾（1.1s, power4.in）；按住畫面重描（0.7s），放開時淡到 12% 再重描一次。描完的一瞬間整個首屏蓋上 90% 黑再退去（0.04s 進、0.35s power2.out 出）。在連結與按鈕上不觸發；prefers-reduced-motion 時不描線。

### Cursor
精準指標才出現：1.5px 環 + 4px 點，黑底白色、白紙黑色；hover 放大到 64px，可開啟的項目變成 72px 實心圓並寫上標籤。

## Do's and Don'ts

### Do:
- **Do** 所有標記都用標籤牌：白底黑字、左側一個釘孔、展示字 900 大寫。
- **Do** 新區塊用區塊標題列開頭，編號延續 00–06 的等寬兩位數。
- **Do** 資料用細線表格排，hover 以整列黑白反轉回應。
- **Do** 次要文字在黑底用 Conduit Grey、在白紙用 Pencil Grey；細線用 Wire Rule。
- **Do** 背景與捲動動畫只動 transform 與 opacity；捲動驅動的動畫動外層容器，不和進場動畫搶同一個屬性。
- **Do** 新增白紙區塊時加上 `[data-paper]`，讓游標、漢堡、索引自動換成黑色。

### Don't:
- **Don't** 加入第三個顏色或任何強調色（琥珀已經移除）。
- **Don't** 做卡片網格；需要分組就用細線表格或標籤牌欄首。
- **Don't** 做黑底霓虹、發光文字或像素復古的效果。
- **Don't** 再放第二條斜紋帶；它全站只出現在首屏底部一次。
- **Don't** 使用 WebGL、`mix-blend-mode`、`backdrop-filter` 或整頁 `filter`。
- **Don't** 給標籤牌、表格列或按鈕加圓角；圓只屬於釘孔、螺絲與游標。
- **Don't** 把等寬字用在句子或標題上。
