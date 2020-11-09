import S from '@sanity/desk-tool/structure-builder'
import Sort from 'react-icons/lib/fa/sort-amount-asc'
import FaList from 'react-icons/lib/fa/list-ul'
import MdPerson from 'react-icons/lib/md/person'
// import FaNewspaper from 'react-icons/lib/fa/newspaper-o'

/**
 * Config file sanity custom stuff
 */

export default {
  previewUrl: {
    production: 'https://heydays-starter.netlify.com/preview/',
    development: 'http://localhost:3000/preview/'
  },
  access_token:
    'skrB5IUvRDgqr6Mwhagwf70EFjWv2EbKEVuwRljH98oSMg3LixNIsCDMwEnRzXDTmgk3AeKNLr4RuzK910YbGpiP2GGaxnra8bQiExsSrFPXqp71QHqEXSx3vGllZfLAewJj36KEjYLuOeoeBGbFMmrJQ5xCuR5j5whx0UVOvBJRwMMHwQMQ',
  /**
   * Page Types
   *
   * This controls the order of menu in the desk
   */
  pageTypes: ['page'],
  // menus: [
  //   { title: 'Primary Menu', id: 'primaryMenu' },
  //   { title: 'Footer Menu', id: 'footerMenu' }
  // ],
  /**
   * Custom Types
   *
   * All fields are required.
   * Remember to create a orderType schema for your custom type.
   *
   * This also controls the order of the custom types
   */
  customTypes: []
}

/**
 * Actions / Helpers
 */

export const createMenuDeskStructure = () =>
  S &&
  S.listItem()
    .title('Menu')
    .icon(FaList)
    .schemaType('menu')
    .child(S.documentTypeList('menu'))
// .items(
//   menus.map(({ title, id }) => {
//     return S.listItem()
//       .title(title)
//       .child(
//         S.editor()
//           .id(id)
//           .schemaType("menu")
//           .documentId(`menu-${id}`)
//       )
//       .icon(FaList);
//   })
// )

export const createCustomTypeDeskStructure = customTypes =>
  customTypes.map(({ title, typeId, typeTitle, icon, orderTypeId }) => {
    // Get all posts
    const posts =
      S &&
      S.documentTypeListItems().filter(listItem => listItem.getId() === typeId)
    // Get order page of correct type
    const orderPage =
      S &&
      S.listItem()
        .title(title)
        .child(
          S.editor()
            .id(orderTypeId)
            .schemaType(orderTypeId)
            .documentId(orderTypeId)
        )
        .icon(Sort)

    // Here you can add more setting types ex. category. Use the same
    // approach as with orderPage

    return (
      S &&
      S.listItem()
        .title(typeTitle)
        .icon(icon)
        .child(
          S.list()
            .title(typeTitle)
            .items([...posts, orderPage])
        )
    )
  })

// const createOrderDoc = type => {
//   const upperCaseType = type.charAt(0).toUpperCase() + type.slice(1)
//   return {
//     name: `${type}Order`,
//     title: `${upperCaseType} Order`,
//     type: 'document',
//     icon: Sort,
//     fields: [
//       {
//         name: 'order',
//         title: `${upperCaseType} Order`,
//         type: 'array',
//         of: [
//           {
//             name: type,
//             title: upperCaseType,
//             type: 'reference',
//             to: [{ type }]
//           }
//         ]
//       }
//     ]
//   }
// }
