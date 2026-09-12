// 磁吸：游標接近 [data-magnet] 元素時，元素被吸向游標；離開時彈回。全站一個 pointermove、rAF 節流；觸控不啟用
export const useMagnet = () => {
  if (!window.matchMedia("(pointer: fine)").matches) return () => {}
  const { gsap } = useGsap()
  const RANGE = 40 // 元素外圍多少 px 內開始吸
  const PULL = 0.35 // 吸過去的比例
  const held = new Set()
  let raf = 0
  let px = 0
  let py = 0
  const tick = () => {
    raf = 0
    for (const el of document.querySelectorAll("[data-magnet]")) {
      const r = el.getBoundingClientRect()
      const dx = px - (r.left + r.width / 2)
      const dy = py - (r.top + r.height / 2)
      const near = Math.abs(dx) < r.width / 2 + RANGE && Math.abs(dy) < r.height / 2 + RANGE
      if (near) {
        held.add(el)
        gsap.to(el, { x: dx * PULL, y: dy * PULL, duration: 0.4, ease: "power3.out", overwrite: "auto" })
      } else if (held.has(el)) {
        held.delete(el)
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" })
      }
    }
  }
  const onMove = (e) => {
    px = e.clientX
    py = e.clientY
    raf ||= requestAnimationFrame(tick)
  }
  window.addEventListener("pointermove", onMove, { passive: true })
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener("pointermove", onMove)
  }
}
