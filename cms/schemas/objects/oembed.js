import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'oembed',
  title: 'Embed (oembed)',
  type: 'object',
  icon: () => <EmojiIcon>⏯</EmojiIcon>,
  fields: [
    {
      name: 'url',
      title: 'Url',
      description:
        'Paste Youtube, Vimeo or Soundcloud url. Ex: https://www.youtube.com/watch?v=n5uz7egB9tA. For security reasons only Youtube, Vimeo and Souncloud is supported. Talk to us if need to expand.',
      type: 'url'
    }
  ]
}
