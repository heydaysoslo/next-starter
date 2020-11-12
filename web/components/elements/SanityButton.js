import React from 'react'

import ExternalLink from '@heydays/ExternalLink'
import InternalLink from '@heydays/InternalLink'
import StyledButton from 'components/styled/StyledButton'

const SanityButton = ({ className, event, title, size, type }) => {
  let Component = 'button'
  let buttonProps = {}

  if (event._type === 'alert') {
    buttonProps = {
      onMouseDown: e => e.preventDefault(),
      onClick: () => alert(event.text)
    }
  }

  if (event._type === 'link') {
    Component = ExternalLink
  }

  if (event._type === 'internalLink') {
    Component = InternalLink
  }

  return (
    <StyledButton
      as={Component}
      className={className}
      {...event}
      {...buttonProps}
      size={size}
      type={type}
    >
      {title}
    </StyledButton>
  )
}

export default SanityButton