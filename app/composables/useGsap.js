import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// 統一從這裡拿 gsap，確保 ScrollTrigger 只註冊一次
export const useGsap = () => ({ gsap, ScrollTrigger })
