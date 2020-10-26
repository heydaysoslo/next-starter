import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
}

const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

export default styled(Container)(
  ({ theme }) => css`
    max-width: 100%;
    ${theme.spacing.container('px')}
  `
)
