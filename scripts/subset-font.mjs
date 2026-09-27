// 重新產生自架的中文字型子集：掃描 app/ 與 nuxt.config.ts 裡實際會顯示的中文字（去掉程式註解），
// 加上英數符號，向 Google Fonts 要 Noto Sans TC 只含這些字的可變字重檔，存到 app/assets/fonts/。
// 用法：node scripts/subset-font.mjs（新增或修改中文內容後執行，否則新字會退回系統字型）
import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")
let text = ""
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(vue|js|json|ts)$/.test(e.name)) text += readFileSync(p, "utf8")
  }
}
walk(join(root, "app"))
text += readFileSync(join(root, "nuxt.config.ts"), "utf8")
text = text.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "")

const cjk = [...new Set([...text].filter((c) => /[⺀-鿿　-〿＀-￯‘-‟…·–—]/.test(c)))].join("")
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("")
const chars = cjk + ascii

// 用瀏覽器的 User-Agent 才會拿到 woff2；同一個網址涵蓋 400～900 所有字重
const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&text=${encodeURIComponent(chars)}`, { headers: { "User-Agent": ua } })).text()
const url = css.match(/url\(([^)]+)\)/)?.[1]
if (!url) throw new Error("Google Fonts 沒有回傳字型網址：\n" + css.slice(0, 400))
const font = Buffer.from(await (await fetch(url)).arrayBuffer())

writeFileSync(join(root, "app/assets/fonts/NotoSansTC-subset.woff2"), font)
writeFileSync(join(root, "app/assets/fonts/NotoSansTC-subset.txt"), chars)
console.log(`中文 ${[...cjk].length} 字，字型 ${(font.length / 1024).toFixed(1)} KB`)
