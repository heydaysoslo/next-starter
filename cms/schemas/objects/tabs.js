import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'tabs',
  title: 'Tabs',
  type: 'object',
  icon: () => <EmojiIcon small>🗂</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'tabsItem',
          title: 'Tab item',
          type: 'object',
          fields: [
            {
              name: 'defaultOpen',
              title: 'Default open',
              description:
                'Toggle this if you want this particular item to be open by default. If not the first one be open by default',
              type: 'boolean'
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'content',
              title: 'Content',
              type: 'editor',
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
        items.map(item => item.title && item.title).join(', ') || 'Tab'
      return {
        title,
        media: () => <EmojiIcon>🗂</EmojiIcon> // Pagebuilder list icon
      }
    }
  }
}
