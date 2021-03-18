import { useState, useEffect } from 'react'
import _debounce from 'lodash/debounce'

const getSize = () => {
  return typeof window !== 'undefined'
    ? {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
      }
    : {
        innerHeight: 0,
        innerWidth: 0,
        outerHeight: 0,
        outerWidth: 0
      }
}

/**
 * Get size of window
 *
 * @example ´´´tsx
 *
 * const windowSize = useWindowSize({ debounce: 250 })
 * handleResize = () => {
 *    // do stuff on resize
 * }
 * useEffect(handleResize, [windowSize])
 *```
 */

type Props = {
  /**
   * Debounce in miliseconds
   * @default 100
   */
  debounce?: number
}

const useWindowSize = ({ debounce = 100 }: Props = {}) => {
  const [windowSize, setWindowSize] = useState(getSize())

  const handleResizeDebounce = _debounce(handleResize, debounce)

  function handleResize() {
    setWindowSize(getSize())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResizeDebounce)
    return () => {
      window.removeEventListener('resize', handleResizeDebounce)
    }
  }, [handleResizeDebounce])

  return windowSize
}

export default useWindowSize
