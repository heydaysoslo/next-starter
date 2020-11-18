import React from 'react'
import BaseBlockContent from '@sanity/block-content-to-react'

import Quote from './Quote'
import Figure from './Figure'
import Oembed from '../Oembed'
import { H3, H2, P } from '@heydays/Typography'
import Accordion from '@heydays/Accordion'
import InternalLink from '@heydays/InternalLink'
import ExternalLink from '@heydays/ExternalLink'
import StyledLink from 'components/styled/StyledLink'
import SanityButton from '@heydays/SanityButton'
import Container from '@heydays/Container'
import styled, { css } from 'styled-components'

export const serializers = {
  types: {
    block(props) {
      if (props.node.children.text && props.node.children.text.length === 0)
        return null
      switch (props.node.style) {
        case 'h2':
          return <H2>{props.children}</H2>

        case 'h3':
          return <H3>{props.children}</H3>

        case 'large':
          return <P modifiers="large">{props.children}</P>

        case 'small':
          return (
            <P as="small" modifiers="small">
              {props.children}
            </P>
          )

        case 'span':
          return <P as="span">{props.children}</P>

        default:
          return <P className="Editor__paragraph">{props.children}</P>
      }
    },
    button: (props) => {
      // @ts-ignore
      return <Container><SanityButton className="Editor__button" {...props?.node} /></Container>
    },
    quote(props) {
      if (!props.node.content) return null
      return <Quote quote={props.node} />
    },
    figure(props) {
      return <Figure node={props.node} />
    },
    oembed(props) {
      // @ts-ignore
      return <Oembed url={props.node.url} />
    },
    accordion(props) {
      // @ts-ignore
      return <Accordion items={props.node.items} exclusive defaultActive={2} />
    }
  },
  marks: {
    internalLink: ({mark, children}) => {
      // @ts-ignore
      return <StyledLink as={InternalLink} {...mark}>{children}</StyledLink>
    },
    link: ({mark, children}) => {
      // @ts-ignore
      return <StyledLink as={ExternalLink} {...mark}>{children}</StyledLink>
    }
  }
}

type Props = {
  blocks: any
  className?: string
}

const Editor: React.FC<Props> = ({ blocks, className }) => {
  return (
    <div className={`Editor ${className ? className : ''}`}>
      <BaseBlockContent
        className="Editor__blocks"
        blocks={blocks}
        serializers={serializers}
      />
    </div>
  )
}

export default styled(Editor)(({theme}) => css`
  .Editor__button {
    margin-top: 2rem;
  }
  .Editor__paragraph {
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
  }
`)
