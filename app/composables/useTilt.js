// hover 時依滑鼠在元素內的位置讓它微微傾斜（CSS perspective + rotate），純 transform、只在互動時觸發
// 用事件委派掛在容器上，一次服務容器裡所有符合 selector 的元素；觸控裝置不啟用
export const useTilt = (container, selector, { max = 8, extra = "", enabled = () => true } = {}) => {
  if (!window.matchMedia("(pointer: fine)").matches) return () => {}
  let el = null
  const reset = () => {
    if (el) el.style.transform = ""
    el = null
  }
  const onMove = (e) => {
    const t = e.target.closest(selector)
    if (t !== el) {
      reset()
      el = t
    }
    if (!el || !enabled()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(600px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) ${extra}`
  }
  container.addEventListener("pointermove", onMove, { passive: true })
  container.addEventListener("pointerleave", reset)
  return () => {
    reset()
    container.removeEventListener("pointermove", onMove)
    container.removeEventListener("pointerleave", reset)
  }
}
