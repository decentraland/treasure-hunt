import { useEffect, useState } from "react"
import { useMotionValue } from "framer-motion"

export default function useWindowScroll() {
  // const []
  // if (!hasEventListener) {
  //   addScrollListener()
  // }
  // return viewportMotionValues
  const scrollX = useMotionValue(0)
  const scrollY = useMotionValue(0)
  const [state, setState] = useState({
    scrollX,
    scrollY,
    height: 1,
    width: 1,
  })

  useEffect(() => {
    const updateScrollValues = () => {
      scrollX.set(window.scrollX)
      scrollY.set(window.scrollY)
      setState({
        scrollX,
        scrollY,
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener("resize", updateScrollValues)
    window.addEventListener("scroll", updateScrollValues, { passive: true })

    return () => {
      window.removeEventListener("resize", updateScrollValues)
      window.removeEventListener("scroll", updateScrollValues)
    }
  })

  return state
}
