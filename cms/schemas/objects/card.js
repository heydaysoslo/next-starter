import React from 'react'
import CloudinaryPreview from '../../custom/components/previews/CloudinaryPreview'
import d from '../defaults'

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
    },
    {
      name: 'cardOverride',
      title: 'Card Override',
      type: 'object',
      description: `We will get the information we need
      from the refrence above. But if you wan't to override
      the information in the card use the fields below.`,
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        d.title,
        {
          name: 'image',
          title: 'Image',
          type: 'mainImage'
        },
        d.editorMinimal,
        {
          name: 'link',
          title: 'Link',
          type: 'url'
        }
      ]
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
