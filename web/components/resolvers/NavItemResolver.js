import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { resolveRoute } from 'routes'

// Make sure it's possible to style nav links different than text links!!!!
// Need to find a way NOT to use styled link inside internalLink and ExternalLink
// but pass the style from outside
const StyledLink = styled.a(
  ({ theme, active }) => css`
    &:hover {
      border-bottom: 1px solid blue;
    }
    ${active &&
      css`
        border-bottom: 1px solid black;
      `}
  `
)

const StyledButton = styled.button`
  color: inherit;
  border: 2px solid black;
  padding: 5px 10px;
  display: inline-flex;
  border-radius: 0;
  appearance: none;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
    border-color: black;
  }
`

const ExternalLink = ({ className, href, blank, children, linkText }) => {
  const linkProps = {
    target: blank ? '_blank' : null,
    rel: blank ? 'nofollow noopener' : null
  }
  return (
    <StyledLink className={className} {...linkProps} href={href}>
      {linkText || children}
    </StyledLink>
  )
}

const InternalLink = ({ className, children, reference, linkText }) => {
  const router = useRouter()
  const href = resolveRoute(reference)
  const isActive = router.asPath === href
  return (
    <Link href={href} active={isActive}>
      <StyledLink className={className}>{linkText || children}</StyledLink>
    </Link>
  )
}

const Button = ({ className, event, title }) => {
  let Component = 'button'
  const _event = event[0]
  let buttonProps = {}

  if (_event._type === 'alert') {
    buttonProps = {
      onMouseDown: e => e.preventDefault(),
      onClick: () => alert(_event.text)
    }
  }

  if (_event._type === 'link') {
    Component = ExternalLink
  }

  if (_event._type === 'internalLink') {
    Component = InternalLink
  }

  return (
    <StyledButton
      className={className}
      {..._event}
      as={Component}
      {...buttonProps}
    >
      {title}
    </StyledButton>
  )
}

const types = {
  button: Button,
  internalLink: InternalLink,
  link: ExternalLink
}

const NavItemResolver = ({ className, item }) => {
  const Component = types[item._type] || null
  if (!Component) {
    console.warn(`Could not resolve nav item of type ${item._type}`)
    return null
  }
  return <Component className={className} {...item} />
}

export default NavItemResolver
