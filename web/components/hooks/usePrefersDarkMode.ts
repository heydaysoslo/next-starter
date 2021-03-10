import { useEffect, useState } from 'react'

/**
 * Checks if user prefers darkmode.
 * @returns true if user prefers dark moe
 *
 * @example ```tsx
 * const prefersDarkMode = usePrefersDarkMode()
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
 */
const usePrefersDarkMode = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean | null>(null)

  useEffect(() => {
    setPrefersDarkMode(
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }, [])

  return prefersDarkMode
}

export default usePrefersDarkMode
