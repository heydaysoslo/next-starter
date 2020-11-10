import React from 'react'
import Editor from '../editor'
import { P, H3 } from '@heydays/Typography'
import styled, { css } from 'styled-components'
import LinkResolver from '@heydays/LinkResolver'
import Animate from '@heydays/animation/Animate'

type Props = {
  label: string
  title: string
  content: any
  link: any
  className?: string
}

const Section: React.FC<Props> = ({
  label,
  title,
  content,
  link,
  className,
}) => {
  return (
    <Animate className={className}>
      {label && (
        <P modifiers="small" className="label">
          {label}
        </P>
      )}
      {title && <H3 className="title">{title}</H3>}
      {content && <Editor className="content" blocks={content} />}
      {link && (
        <LinkResolver className="" link={link}>
          {link.title || link.url}
        </LinkResolver>
      )}
    </Animate>
  )
}

export default styled(Section)(
  ({ theme }) => css`
    text-align: center;
    .button {
      ${theme.spacing.md('mt')}
    }
  `
)
