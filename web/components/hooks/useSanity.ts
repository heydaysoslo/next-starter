import { useContext } from 'react'
import SanityContext from '../context/sanityContext'

/**
 * Get sanity data from context
 *
 * @example ```tsx
 *  const sanity = useSanity()
 * ```
 */
const useSanity = () => {
  const sanity = useContext(SanityContext)
  return sanity
}

export default useSanity
