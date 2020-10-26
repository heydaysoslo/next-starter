import React from 'react'
import BaseBlockContent from '@sanity/block-content-to-react'

import LinkResolver from '@heydays/LinkResolver'
import Quote from './Quote'
import Figure from './Figure'
import Oembed from '../Oembed'
import { H3, H2, P } from '@heydays/Typography'
import Button from '@heydays/Button'
import Accordion from '@heydays/Accordion'

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

        case 'button':
          if (!props.node.link) return null
          return (
            <p>
              <Button
                as={LinkResolver}
                data={props.node.link.link}
                modifiers="primary"
              >
                {props.node.link.title}
              </Button>
            </p>
          )

        case 'span':
          return <P as="span">{props.children}</P>

        default:
          return <P>{props.children}</P>
      }
    },
    button(props) {
      if (!props.node.link) return null
      return (
        <p>
          <Button
            as={LinkResolver}
            link={props.node.link?.href}
            modifiers={props.node.linkStyle && props.node.linkStyle}
          >
            {props.node.link.linkText}
          </Button>
        </p>
      )
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
    link(props) {
      const link = props?.mark?.externalLink?.url || props?.mark?.reference
      if (!link) return props.children
      return (
        <LinkResolver
          className=""
          openInNewTab={props?.mark?.externalLink?.blank}
          link={link}
        >
          {props.children ||
            props?.mark?.title ||
            props?.mark?.reference?.title}
        </LinkResolver>
      )
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

export default Editor
