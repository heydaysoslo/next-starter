import { useEffect, useRef } from 'react'

/**
 * Console logs updated props
 *
 * @example ```tsx
 *  useTraceUpdate(props)
 * ```
 *
 * @note not sure if this actually works
 * @see https://github.com/damiangreen/use-trace-update
 */

export default function useTraceUpdate(props: any) {
  const prev = useRef(props)
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v]
      }
      return ps
    }, {})
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps)
    }
    prev.current = props
  })
}
