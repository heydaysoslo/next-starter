import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'pagebuilder',
  title: 'pagebuilder',
  type: 'object',
  fields: [
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        // Section
        {
          name: 'section',
          title: 'Section',
          type: 'section'
        },
        // Cards
        {
          name: 'cardSection',
          title: 'Card Section',
          type: 'cardSection'
        },
        // Text section
        {
          name: 'textSection',
          title: 'Text Section',
          type: 'textSection'
        },
        // Full Image
        {
          name: 'imageSection',
          title: 'Full Image Section',
          type: 'imageSection'
        },
        // Split
        {
          name: 'split',
          title: 'Split',
          type: 'split'
        },
        // Carousel
        {
          name: 'carousel',
          title: 'Carousel',
          type: 'carousel'
        },
        // Tabs
        {
          name: 'tabs',
          title: 'Tabs',
          type: 'tabs'
        },
        // Video Section
        {
          name: 'videoSection',
          title: 'Video Section',
          type: 'videoSection'
        },
        {
          name: 'reusableSectionReference',
          type: 'reusableSectionReference'
        }
      ]
    }
  ]
}
