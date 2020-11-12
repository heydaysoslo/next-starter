import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { resolveRoute } from 'routes'

const InternalLink = ({ className, children, reference, linkText }) => {
  const router = useRouter()
  const href = resolveRoute(reference)
  const isActive = router.asPath === href
  return (
    <Link href={href} active={isActive}>
      <a className={className}>{linkText || children}</a>
    </Link>
  )
}

export default InternalLink
