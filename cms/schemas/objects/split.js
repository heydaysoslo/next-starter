import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import CloudinaryPreview from '../../custom/components/previews/CloudinaryPreview'
import d from '../defaults'

const icon = '📰'

export default {
  name: 'split',
  title: 'Split',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      validation: Rule => Rule.max(2),
      description:
        'First item will appear on the left, and second item will appear on the right',
      of: [
        {
          name: 'content',
          title: 'content',
          type: 'object',
          fields: [d.title, d.editorMinimal],
          preview: {
            select: {
              title: 'title'
            },
            prepare({ title }) {
              return {
                title: title,
                media: () => <EmojiIcon>📝</EmojiIcon>,
                subtitle: 'Content'
              }
            }
          }
        },
        {
          name: 'media',
          title: 'media',
          type: 'object',
          fields: [
            d.media,
            {
              name: 'aspect',
              title: 'Aspect Ratio',
              type: 'aspect'
            }
          ],
          preview: {
            select: {
              media: 'media'
            },
            prepare({ media }) {
              return {
                title: 'Media',
                media: () => <CloudinaryPreview media={media} fallback={icon} /> // Pagebuilder list preview
              }
            }
          }
        },
        {
          name: 'blank',
          title: 'blank',
          type: 'object',
          description: 'Option to leave the space blank',
          fields: [
            {
              name: 'hidden',
              title: 'hidden',
              type: 'string',
              validation: Rule => Rule.required(),
              description:
                'This fields needs to be polulated. Write anything here.'
            }
          ],
          preview: {
            prepare() {
              return {
                title: 'Blank space',
                media: () => <EmojiIcon>🔲</EmojiIcon>
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'items.content.title',
      media: 'items.media.media'
    },
    prepare({ media, title }) {
      return {
        title,
        media: () => <CloudinaryPreview media={media} fallback={icon} />, // Pagebuilder list preview
        subtitle: 'Split'
      }
    }
  }
}
