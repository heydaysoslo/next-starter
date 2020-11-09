import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'reusableSectionReference',
  title: 'Reusable Section',
  type: 'object',
  fields: [
    {
      name: 'reusableSection',
      title: 'Module',
      type: 'reference',
      to: [{ type: 'reusableSection' }]
    }
  ],
  preview: {
    select: {
      title: 'reusableSection.title'
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Reusable Section',
        media: () => <EmojiIcon>♻️</EmojiIcon>
      }
    }
  }
}
