import React, { useRef, useState, useEffect } from 'react'

const initialState = {
  width: 0,
  height: 0,
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  x: 0,
  y: 0,
  outerWidth: 0,
  outerHeight: 0
}

/**
 * Ref is the reference to the element whose height and with is required
 *
 * @example ```tsx
 * const divRef = useRef<HTMLElement | null>(null);
 * const { height, width } = useDimension(divRef);
 * <div ref={divRef}>
 * ```
 */
const useDimension = (ref: React.MutableRefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState<typeof initialState>(
    initialState
  )
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        entries.forEach((entry: ResizeObserverEntry) => {
          setDimensions({
            ...entry?.contentRect,
            outerWidth: entry?.borderBoxSize[0]?.inlineSize,
            outerHeight: entry?.borderBoxSize[0]?.blockSize
          })
        })
      }
    )
    if (ref?.current) resizeObserverRef.current.observe(ref.current)
    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
    }
  }, [ref])
  return dimensions
}

export default useDimension
