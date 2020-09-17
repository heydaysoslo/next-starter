import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import { H1, P } from '@heydays/Typography'
import Container from '@heydays/Container'
import Button from '@heydays/Button'

const FrontPage = ({ className, title, pagebuilder }) => {
  return (
    <div className={className}>
      <Container className="Page__container">
        <Button modifiers="active">Button</Button>
        <header className="Page__header">
          <P>FrontPage</P>
          {title && <H1>{title}</H1>}
        </header>
        {pagebuilder && (
          <div className="Page__content">
            {pagebuilder?.sections && (
              <Pagebuilder sections={pagebuilder.sections} />
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default styled(FrontPage)(
  ({ theme }) => css`
    .Page__header {
      ${theme.spacing.sm('mt')}
    }
    .Page__content {
      ${theme.spacing.sm('mt')}
    }
  `
)
