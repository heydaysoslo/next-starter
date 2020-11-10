import React from 'react'
import styled, { css } from 'styled-components'

import Pagebuilder from '../pagebuilder/Pagebuilder'
import { H1 } from '@heydays/Typography'
import Container from '@heydays/Container'

const FrontPage = ({ className, title, pagebuilder }) => {
  return (
    <div className={className}>
      <Container className="Page__container">
        <header className="Page__header">{title && <H1>{title}</H1>}</header>
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
