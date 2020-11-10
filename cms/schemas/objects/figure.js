import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import CloudinaryPreview from '../../custom/components/previews/CloudinaryPreview'
import d from '../defaults'

export default {
  name: 'figure',
  title: 'Image',
  type: 'object',
  icon: () => <EmojiIcon>🖼</EmojiIcon>, // dropdown preview in editor
  fields: [
    d.image,
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule =>
        Rule.error('You have to fill out the alternative text.').required(),
      description: `Describe what's in the image. Important for accesibility and SEO. Read more here https://blog.hubspot.com/marketing/image-alt-text`,
      options: {
        isHighlighted: true
      }
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      options: {
        isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      media: 'cldImage'
    },
    prepare({ media }) {
      return {
        media
      }
    },
    // Inline preview in editor
    component: props => {
      return (
        <CloudinaryPreview
          width={828}
          height={800}
          media={props?.value?.media}
        />
      )
    }
  }
}
