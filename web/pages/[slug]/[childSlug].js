// import { getPages } from '@cms'
// import React from 'react'

// import { getPages } from '../../lib/sanity'

// import TemplateResolver from '../../components/TemplateResolver'

// function ChildPage({ page, parent, doctors, global }) {
//   return (
//     <TemplateResolver
//       page={page}
//       doctors={doctors}
//       global={global}
//       breadcrumbs={[parent, page]}
//     />
//   )
// }

// export async function getStaticPaths() {
//   const allPages = await getPages()
//   const childPages = allPages.filter(page => page.parent !== 0)

//   const getAllData = async () => {
//     let slugData = []
//     for (const page of childPages) {
//       const parent = await getPageById(page.parent)
//       slugData.push({
//         params: {
//           childSlug: page.slug,
//           slug: parent.slug
//         }
//       })
//     }
//     return slugData
//   }

//   const slugData = await getAllData()

//   return {
//     paths: slugData,
//     fallback: true
//   }
// }

// export async function getStaticProps({ params }) {
//   const page = await getPageBySlug(params.childSlug).then(res => res[0])
//   // console.log('GET TEST', query.slug, test)

//   let parent
//   if (page && page.parent && page.parent !== 0) {
//     parent = await getPageById(page.parent)
//   }

//   if (!page && res) {
//     res.statusCode = 404
//   }

//   const doctors = await getDoctors().then(doctors => doctors)
//   const global = await getGlobal().then(global => global)
//   return {
//     props: {
//       page,
//       parent,
//       doctors,
//       global
//     }
//   }
// }

// export default ChildPage

const ChildPage = () => {
  return <h1>I'm child page</h1>
}

export default ChildPage
