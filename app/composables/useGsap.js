import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)

// 統一從這裡拿 gsap，確保 plugin 只註冊一次
export const useGsap = () => ({ gsap, ScrollTrigger, SplitText })
