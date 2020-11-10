export default {
  name: 'sectionSettings',
  title: 'Section settings',
  type: 'object',
  fields: [
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { value: 'default', title: 'Default' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    }
  ]
}
