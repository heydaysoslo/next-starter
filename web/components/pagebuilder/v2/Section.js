import React from 'react'
import styled, { css } from 'styled-components'
import { P, H3 } from '@heydays/Typography'

import Editor from '../../editor'
import Container from '@heydays/Container'

const Section = ({ label, title, content, className }) => {
  return (
    <div className={className}>
      <Container>
        {label && (
          <P modifiers="small" className="label">
            {label}
          </P>
        )}
        {title && <H3 className="title">{title}</H3>}
        {content && <Editor className="content" blocks={content} />}
      </Container>
    </div>
  )
}

export default styled(Section)(
  ({ theme }) => css`
    text-align: center;
    padding-top: 40px;
    background: green;
    .title {
      margin-top: 10px;
    }
    .content {
      margin-top: 20px;
    }
  `
)
