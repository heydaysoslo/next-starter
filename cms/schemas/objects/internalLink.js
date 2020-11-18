import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
// import Link from 'react-icons/lib/io/link'
// Follow sanity recommendations for internal/external links
// https://www.sanity.io/guides/portable-text-internal-and-external-links
// import InternalLinkIcon from 'react-icons/lib/md/link'
// import InternalLinkRenderer from '../../custom/components/InternalLinkRenderer'

export default {
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  icon: () => <EmojiIcon small>🔗</EmojiIcon>,
  blockEditor: {
    // render: InternalLinkRenderer, // this is occasionaly crashing for some weird reason
    icon: () => <EmojiIcon small>🔗</EmojiIcon>
  },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [{ type: 'article' }, { type: 'page' }, { type: 'frontpage' }]
    },
    {
      name: 'linkText',
      type: 'string',
      title: 'Link text'
    }
  ],
  preview: {
    select: {
      title: 'reference.title',
      linkText: 'linkText'
    },
    prepare({ title, linkText }) {
      return {
        title: linkText || title || 'No link title'
        // media: Link
      }
    }
  }
}
