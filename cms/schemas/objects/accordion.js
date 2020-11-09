import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import d from '../defaults'

export default {
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  icon: () => <EmojiIcon>📜</EmojiIcon>, // Needed for editor
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'accordionItem',
          title: 'Accordion item',
          type: 'object',
          fields: [
            {
              ...d.title,
              validation: Rule => Rule.required()
            },
            {
              ...d.editor,
              validation: Rule => Rule.required()
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      items: 'items'
    },
    prepare({ items }) {
      const title =
        items.map(item => item.title && item.title).join(', ') || 'Accordion'
      return {
        title,
        media: () => <EmojiIcon>↕️</EmojiIcon>
      }
    }
  }
}
