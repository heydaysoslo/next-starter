import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'reusableSection',
  title: 'Reusable sections',
  type: 'document',
  icon: () => <EmojiIcon>♻️</EmojiIcon>,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Modules',
      type: 'pagebuilder',
      name: 'pagebuilder',
      description:
        'You can add as many sections as you want to build a global layout and use across as many pages as you want. (Note that adding a "Global module" to this section will not render anything in the front end.)'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title,
        media: () => <EmojiIcon>♻️</EmojiIcon>
      }
    }
  }
}
