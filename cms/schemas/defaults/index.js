export default {
  title: {
    name: 'title',
    title: 'Title',
    type: 'string'
  },
  subtitle: {
    name: 'subtitle',
    title: 'Sub Title',
    type: 'string'
  },
  image: {
    name: 'cldImage',
    title: 'Image',
    type: 'cloudinaryMedia',
    options: {
      selectionType: 'single',
      resourceType: 'image'
    }
  },
  media: {
    name: 'media',
    title: 'Media',
    type: 'cloudinaryMedia',
    options: {
      selectionType: 'single'
    }
  },
  editor: {
    name: 'editor',
    title: 'Editor',
    type: 'editor'
  },
  editorMinimal: {
    name: 'editorMinimal',
    title: 'Editor Minimal',
    type: 'editorMinimal'
  },
  alt: {
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
  caption: {
    title: 'Caption',
    name: 'caption',
    type: 'string',
    options: {
      isHighlighted: true
    }
  },
  color: {
    name: 'color',
    title: 'Color',
    type: 'color'
  }
}
