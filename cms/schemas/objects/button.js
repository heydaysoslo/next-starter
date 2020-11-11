import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

const icon = '⏺'

export default {
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: () => <EmojiIcon>{icon}</EmojiIcon>,
  fields: [
    {
      name: 'link',
      title: 'Link',
      type: 'link'
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'This determines the button style.',
      options: {
        list: [
          { value: 'primary', title: 'Primary' },
          { value: 'secondary', title: 'Secondary' }
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      linkTitle: 'link.title'
    },
    prepare({ title, linkTitle }) {
      return {
        title: title || linkTitle || 'No title',
        media: () => <EmojiIcon>{icon}</EmojiIcon>
      }
    }
  }
}
