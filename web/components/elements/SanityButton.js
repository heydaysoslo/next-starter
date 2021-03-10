import React from 'react'

import ExternalLink from '@heydays/ExternalLink'
import InternalLink from '@heydays/InternalLink'
import StyledButton from 'components/styled/Button.styled'

const SanityButton = ({ className, event, title, size, type, children }) => {
  let Component = 'button'
  let buttonProps = {}
  // Event returns array in some cases. Need to check and resolve
  const resolvedEvent = Array.isArray(event) ? event?.[0] : event

  if (!resolvedEvent?._type) {
    console.warn('Button action event type not defined')
  }

  if (resolvedEvent?._type === 'alert') {
    buttonProps = {
      onMouseDown: e => e.preventDefault(),
      onClick: () => alert(resolvedEvent.text)
    }
  }

  if (resolvedEvent?._type === 'link') {
    Component = ExternalLink
  }

  if (resolvedEvent?._type === 'internalLink') {
    Component = InternalLink
  }

  return (
    <StyledButton
      as={Component}
      className={className}
      {...resolvedEvent}
      {...buttonProps}
      size={size}
      type={type}
    >
      {title || children}
    </StyledButton>
  )
}

export default SanityButton
