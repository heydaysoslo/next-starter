import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

const icon = '⏺'

export default {
  name: 'personReference',
  title: 'Person Reference',
  type: 'object',
  icon: () => <EmojiIcon>{icon}</EmojiIcon>,
  fields: [
    {
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'person' }]
    }
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.image'
    },
    prepare({ title = 'No title', media = <EmojiIcon>{icon}</EmojiIcon> }) {
      return {
        title,
        media
      }
    }
  }
}
