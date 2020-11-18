import React from 'react'
// import External from 'react-icons/lib/fa/external-link'
// Follow sanity recommendations for internal/external links
// https://www.sanity.io/guides/portable-text-internal-and-external-links
// import ExternalLinkRenderer from '../../custom/components/ExternalLinkRenderer'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'link',
  type: 'object',
  title: 'External link',
  icon: () => <EmojiIcon small>🌍</EmojiIcon>,
  blockEditor: {
    icon: () => <EmojiIcon small>🌍</EmojiIcon>
    // render: ExternalLinkRenderer
  },
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'URL',
      description:
        'Valid url examples: https://domain.com, mailto:hey@domain.com, tel:99988777',
      validation: Rule =>
        Rule.uri({
          allowRelative: false,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
    {
      name: 'linkText',
      type: 'string',
      title: 'Link text'
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title',
      href: 'href',
      linkText: 'linkText'
    },
    prepare({ linkText, href }) {
      return {
        title: linkText || href
        // media: External
      }
    }
  }
}
