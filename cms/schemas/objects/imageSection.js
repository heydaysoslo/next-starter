import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import CloudinaryPreview from '../../custom/components/previews/CloudinaryPreview'

const icon = '🖼'

export default {
  name: 'imageSection',
  title: 'Image Section',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      name: 'aspect',
      title: 'Aspect Ratio',
      type: 'aspect'
    }
  ],
  preview: {
    select: {
      media: 'image.cldImage'
    },
    prepare({ media }) {
      return {
        title: 'Image',
        media: () => <CloudinaryPreview media={media} fallback={icon} />, // Pagebuilder list icon
        subtitle: 'Image section'
      }
    }
  }
}
