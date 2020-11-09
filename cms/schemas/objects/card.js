import React from 'react'
import CloudinaryPreview from '../../custom/components/previews/CloudinaryPreview'

export default {
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'reference',
      description: 'Use this for internal content.',
      to: [{ type: 'article' }, { type: 'page' }]
    }
  ],
  preview: {
    select: {
      title: 'content.title',
      media: 'content.mainImage'
    },
    prepare({ title = 'No title', media }) {
      return {
        title: `Card: ${title}`,
        media: <CloudinaryPreview media={media} fallback="🃏" />
      }
    }
  }
}
