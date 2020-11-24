import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: () => <EmojiIcon>🏷</EmojiIcon>,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    }
  ]
}
