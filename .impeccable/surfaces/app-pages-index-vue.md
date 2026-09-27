---
version: 1
slug: "app-pages-index-vue"
primary_target: "app/pages/index.vue"
related_targets: []
---

# Surface brief：首頁（一頁式個人網站）

## Scope and mode
整個一頁式首頁 `app/pages/index.vue` 與全站共用零件（layout、選單、索引、游標、回頂、頁尾）。Mode：Experience。

## Audience, job, constraints
面試官、同行、本人名片。目標是記住這個人。事實內容不動（見 PRODUCT.md）；純黑白；README 效能護欄；拿掉 Three.js 與碎片。保留：名字亂碼切換、右側索引、CodePen 視窗、回頂。100 Days CSS 的橫向拖曳拿掉（改 10×10 攤開）。

## Direction contract
THESIS：一個人的識別像貼在配電箱上的標籤與牆上的大字，直白、不裝飾；拒絕黑底霓虹、像素復古與卡片網格這類個人網站預設。
OWN-WORLD：白紙與純黑兩種底，#f2f2f2 與 #050505，沒有第三個顏色；白底黑字標籤牌（左側一個釘孔）、模版粗體大字（Big Shoulders Display 900）、Noto Sans TC 內文、等寬字只用於編號與規格；細線表格；45 度斜紋帶全站只出現一次。
STORY：訪客先看到一道劈進畫面的 ZZ 閃電與 ZERO ZONE，往下讀到工作證、檢驗表、四層技術與 CI/CD、早期作品存檔、山與那句話，最後停在聯絡牌前，記得 ZZ、3030 與「我命由我不由天」。
FIRST VIEWPORT：白紙滿版；H1（兩個 Z 相疊一筆到底）放大到約 1.4 倍視窗高，上橫完整、左端出框；右上黑色 EXT 3030 標籤牌；右下 ZERO ZONE 大字、名字亂碼切換、定位小字；底部斜紋帶；按住畫面時 H1 從頭描到尾（signature interaction），右側索引 00～06。
FORM：H1 logo × K3 hero × L3 Lab × W2 早期作品；自有候選第 3 名（分機面板）經多輪使用者改向，最終融合 B 印的筆畫與 D 警示標的語法；seed bf6b636b。
FINISH：unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment
按住 hero，閃電從頭劈到尾。

## Unresolved
無（藍新回任月份 2022-08 已提供，履歷已拆成兩段）。
