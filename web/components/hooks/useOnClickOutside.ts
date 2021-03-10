import React, { useEffect } from 'react'

/**
 * Handler for outside clicks
 *
 * @example ```tsx
 * const headerRef = useRef<HTMLElement | null>(null)
 *
 * useOnClickOutside(headerRef, () => {
 * setOpen(false)
 * })
 *
 * <header ref={headerRef}>I'm header</header>
 * ```
 */
export const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  handler: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}
