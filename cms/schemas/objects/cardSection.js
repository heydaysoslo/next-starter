import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'cardSection',
  title: 'Card Section',
  type: 'object',
  fields: [
    // {
    //   name: 'label',
    //   title: 'Label',
    //   type: 'string'
    // },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    // {
    //   name: 'intro',
    //   title: 'Intro',
    //   type: 'editorMinimal'
    // },
    // {
    //   name: 'columnAmount',
    //   title: 'Column amount',
    //   description: 'Desired amount of columns.',
    //   type: 'number'
    // },
    {
      name: 'cardsList',
      title: 'Cards',
      type: 'array',
      of: [
        {
          name: 'card',
          title: 'Card',
          type: 'card'
        }
      ]
    },
    {
      name: 'seeAllLink',
      title: 'See all link',
      type: 'internalLink'
    }
  ],
  preview: {
    select: {
      title: 'cardsList.0.content.title'
    },
    prepare({ title = 'No title' }) {
      return {
        title,
        subtitle: 'Card section',
        media: <EmojiIcon>🃏</EmojiIcon>
      }
    }
  }
}
