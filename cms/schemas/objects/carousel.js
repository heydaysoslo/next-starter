import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

const icon = '🎠'

export default {
  name: 'carousel',
  title: 'Carousel',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'mainImage',
          title: 'Image',
          type: 'mainImage'
        }
      ]
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'aspect'
    }
  ],
  preview: {
    prepare: () => ({
      title: 'Carousel',
      media: () => <EmojiIcon>{icon}</EmojiIcon> // Pagebuilder list icon
    })
  }
}
