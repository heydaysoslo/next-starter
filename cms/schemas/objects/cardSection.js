import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import d from '../defaults'

const icon = '🃏'

export default {
  name: 'cardSection',
  title: 'Card Section',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'cardsList',
      title: 'Cards',
      type: 'array',
      of: [
        {
          name: 'card',
          title: 'Card',
          type: 'card'
        },
        {
          name: 'staticCard',
          title: 'Static Card',
          description:
            'Use if you are not linking or fetching assets internally on the website.',
          type: 'object',
          fields: [
            d.title,
            {
              name: 'image',
              title: 'Image',
              type: 'mainImage'
            },
            d.editorMinimal,
            {
              name: 'link',
              title: 'Link',
              type: 'link'
            }
          ]
        }
      ]
    },
    {
      name: 'seeAllLink',
      title: 'See all link',
      type: 'internalLink'
    }
  ],
  preview: {
    select: {
      title: 'cardsList.0.content.title'
    },
    prepare({ title = 'No title' }) {
      return {
        title,
        subtitle: 'Card section',
        media: <EmojiIcon>{icon}</EmojiIcon> // Pagebuilder list icon
      }
    }
  }
}
