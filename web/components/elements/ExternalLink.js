import React from 'react'

const ExternalLink = ({ className, href, blank, children, linkText }) => {
  // // Resolve til url hvis link text mangler
  const linkProps = {
    target: blank ? '_blank' : null,
    rel: blank ? 'nofollow noopener' : null
  }
  return (
    <a className={className} {...linkProps} href={href}>
      {linkText || children}
    </a>
  )
}

export default ExternalLink
