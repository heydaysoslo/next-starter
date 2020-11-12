import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

const icon = '📝'

export default {
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'body',
      title: 'Body',
      type: 'editor'
    }
  ],
  preview: {
    select: {
      content: 'body'
    },
    prepare({ content }) {
      const text =
        content.filter(block => block._type === 'block')[0].children[0].text ||
        'Text'
      return {
        title: text,
        subtitle: 'Text section',
        media: <EmojiIcon>{icon}</EmojiIcon> // Pagebuilder list icon
      }
    }
  }
}
