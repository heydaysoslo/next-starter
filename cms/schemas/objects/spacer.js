import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import { responsiveSpacing } from '../../../web/styles/themes/defaultTheme'

export default {
  name: 'spacer',
  title: 'Space',
  type: 'object',
  icon: () => <EmojiIcon>↕️</EmojiIcon>,
  fields: [
    {
      name: 'space',
      title: 'Space',
      type: 'string',
      options: {
        list: Object.keys(responsiveSpacing).map(key => ({
          title: key,
          value: key
        }))
      }
    }
  ]
}
