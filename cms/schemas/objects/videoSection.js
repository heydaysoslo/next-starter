import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import Vimeo from '../../custom/components/Vimeo'

const icon = '🎬'

export default {
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fields: [
    {
      name: 'video',
      title: 'Video',
      type: 'string',
      inputComponent: Vimeo
    }
  ],
  preview: {
    select: {
      video: 'video'
    },
    prepare({ video }) {
      const data = video && JSON.parse(video)
      return {
        title: data && data.label ? data.label : 'Video',
        media: () => <EmojiIcon>{icon}</EmojiIcon>, // Pagebuilder list icon
        subtitle: 'Video section'
      }
    }
  }
}
