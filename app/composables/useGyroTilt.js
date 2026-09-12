// 手機陀螺儀帶動閃電傾斜（docs/ONEPAGE-3D.md Q6 / Q15）。獨立開關：拿掉這個檔案與 HeroSection、VoxelZZ 裡引用它的幾行即可
// - Android：頁面載入後直接啟用
// - iOS 13+：DeviceOrientationEvent.requestPermission() 必須在使用者點擊的當下呼叫，所以 hero 放一顆 motion 按鈕
// - 第一筆讀數當作「拿手機的自然角度」，之後只算相對偏移，不假設使用者拿的角度
export const useGyroTilt = () => {
  const m = {
    available: false, // 觸控裝置且支援 deviceorientation
    needsPermission: false, // iOS
    active: false,
    tilt: { x: 0, y: 0 }, // 給 VoxelZZ 讀，範圍與滑鼠傾斜一致
    enable: async () => false,
    disable: () => {},
  }
  if (typeof window === "undefined") return m
  const coarse = window.matchMedia("(pointer: coarse)").matches
  m.available = coarse && "DeviceOrientationEvent" in window
  m.needsPermission = m.available && typeof DeviceOrientationEvent.requestPermission === "function"

  let base = null
  const clamp = (v) => Math.max(-1, Math.min(1, v))
  const onOrient = (e) => {
    if (e.beta == null || e.gamma == null) return
    if (!base) base = { beta: e.beta, gamma: e.gamma }
    m.tilt.y = clamp((e.gamma - base.gamma) / 30) * 0.6 // 左右翻
    m.tilt.x = clamp((e.beta - base.beta) / 30) * 0.4 // 前後翻
  }

  m.enable = async () => {
    if (!m.available || m.active) return m.active
    if (m.needsPermission) {
      try {
        if ((await DeviceOrientationEvent.requestPermission()) !== "granted") return false
      } catch {
        return false
      }
    }
    base = null
    window.addEventListener("deviceorientation", onOrient)
    m.active = true
    return true
  }
  m.disable = () => {
    window.removeEventListener("deviceorientation", onOrient)
    m.active = false
    m.tilt.x = m.tilt.y = 0
  }
  return m
}
