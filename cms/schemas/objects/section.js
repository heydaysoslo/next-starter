import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

const icon = '📰'

export default {
  name: 'section',
  title: 'Section',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'editorMinimal'
    },
    {
      title: 'Settings',
      name: 'settings',
      type: 'sectionSettings'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Section',
        media: () => <EmojiIcon>{icon}</EmojiIcon> // Pagebuilder list icon
      }
    }
  }
}
