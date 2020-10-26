import React from 'react'

import AspectContainer from './AspectContainer'
import LinkResolver from '@heydays/LinkResolver'
import Editor from '../editor'
import styled, { css } from 'styled-components'
import { P } from './Typography'
import CloudinaryImage from './CloudinaryImage'
import { CloudinaryNode } from 'types'

type Props = {
  className?: string
  title?: string
  image?: CloudinaryNode
  excerpt?: any
  link?: any
}

const Card: React.FC<Props> = ({ className, title, image, excerpt, link }) => {
  return (
    <LinkResolver link={link} className={className}>
      <div className="media">
        {image ? (
          <CloudinaryImage node={image} aspectRatio="portrait" />
        ) : (
          <AspectContainer
            aspect={{
              xs: 'portrait'
            }}
          />
        )}
      </div>
      {title && (
        <P modifiers="large" className="title">
          {title}
        </P>
      )}
      {excerpt && (
        <div className="excerpt">
          <Editor blocks={excerpt} />
        </div>
      )}
    </LinkResolver>
  )
}

export default styled(Card)(
  ({ theme: t }) => css`
    .media {
      background: #f1f1f1;
    }

    .title,
    .excerpt {
      ${t.spacing.sm('mt')}
    }
  `
)
