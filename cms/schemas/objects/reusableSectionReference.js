import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

const icon = '♻️'

export default {
  name: 'reusableSectionReference',
  title: 'Reusable Section',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
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
        media: () => <EmojiIcon>{icon}</EmojiIcon> // Pagebuilder list icon
      }
    }
  }
}
