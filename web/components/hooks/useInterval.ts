import { useEffect, useRef } from 'react'

/**
 * SetInterval implemented the correct way in hooks
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 *
 * @example ```tsx
 * useInterval(() => {
 *  // Your logic
 * }, 500)
 * ```
 * @note You can break the interval by passing `null`
 * @example ```tsx
 * useInterval(() => {
 *  // Your logic
 * }, someBoolean ? 200 : null)
 * ```
 */

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<typeof callback>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
