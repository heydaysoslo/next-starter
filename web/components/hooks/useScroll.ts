import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

/**
 * Get current scrollposition
 * @example ```tsx
 *  const scrollPosition = useScroll({delay: 200})
 * ```
 * @note isTop is a boolean that returns true if page is scrolled all the way to the top
 */

type Props = {
  /**
   * Defines the throttle delay
   */
  delay?: number
  /**
   * Defines the amount you need to scroll from top
   */
  topThreshold?: number
}
const useScroll = ({ delay = 50, topThreshold = 0 }: Props) => {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
    isTop: true
  })

  useEffect(() => {
    const updateScroll = () => {
      setScroll({
        x: window.pageXOffset,
        y: window.pageYOffset,
        isTop: window.pageYOffset <= topThreshold
      })
    }

    const throttledUpdateScroll = throttle(updateScroll, delay)
    updateScroll()
    window.addEventListener('scroll', throttledUpdateScroll)

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [delay])

  return scroll
}

export default useScroll
