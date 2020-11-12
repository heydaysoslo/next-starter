import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import d from '../defaults'
import {
  responsiveSpacing,
  responsiveFonts,
  colors
} from '../../../web/styles/themes/defaultTheme'
const responsiveUnits = ['xs', 'sm', 'md', 'lg', 'xl']

export default {
  name: 'designTokens',
  title: 'Design Tokens',
  type: 'document',
  icon: () => <EmojiIcon>💅</EmojiIcon>,
  fields: [
    d.title,
    {
      name: 'theme',
      title: 'Theme',
      type: 'object',
      description:
        'For these values to take effect you must go into Settings -> Site Settings -> Design Tokens and select this theme.',
      fields: [
        {
          name: 'fontFamily',
          title: 'Font Family',
          type: 'object',
          options: {
            collapsible: true
          },
          fields: [
            {
              name: 'sans',
              title: 'Sans',
              description:
                'Make sure you have the font installed and activated on your computer. You must put the name in quotes eg: "Acumin Pro"',
              type: 'string'
            },
            {
              name: 'serif',
              title: 'Serif',
              description:
                'Make sure you have the font installed and activated on your computer. You must put the name in quotes eg: "Acumin Pro"',
              type: 'string'
            }
          ]
        },
        {
          name: 'colors',
          title: 'Colors',
          type: 'object',
          options: {
            collapsible: true
          },
          fields: [
            ...Object.keys(colors).map(key => ({
              name: key,
              title: key,
              type: 'color'
            }))
          ]
        },
        {
          name: 'responsiveFonts',
          title: 'Fonts',
          type: 'object',
          options: {
            collapsible: true
          },
          fields: [
            ...Object.keys(responsiveFonts).map(fontKey => ({
              name: fontKey,
              title: fontKey,
              type: 'object',
              options: {
                collapsible: true
              },
              fields: [
                ...responsiveUnits.map(unit => ({
                  name: unit,
                  title: unit,
                  description: `Defines font-size and line-height in this form: '[font-size]/[line-height]'
                  .Example: '18px/24px'. Read more at https://cssreference.io/property/font-size/ or https://cssreference.io/property/line-height/`,
                  type: 'string'
                }))
              ]
            }))
          ]
        },
        {
          name: 'responsiveSpacing',
          title: 'Spacing',
          type: 'object',
          options: {
            collapsible: true
          },
          fields: [
            ...Object.keys(responsiveSpacing).map(spacingKey => ({
              name: spacingKey,
              title: spacingKey,
              type: 'object',
              options: {
                collapsible: true
              },
              fields: [
                ...responsiveUnits.map(unit => ({
                  name: unit,
                  title: unit,
                  description: 'Pixel value',
                  type: 'string'
                }))
              ]
            }))
          ]
        }
      ]
    }
  ]
}
