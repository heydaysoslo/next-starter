import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import sanityClient from '@sanity/client'

import TemplateResolver from '@heydays/TemplateResolver'
import Head from 'next/head'
import groq from 'groq'
import useInterval from '@heydays/useInterval'
import { PAGEBUILDER } from 'lib/sanity/queries/fragments.groq'

const PREVIEWABLE_TYPES = ['page', 'frontpage', 'article']

const query = groq`
    {
      "siteSettings": *[_type == "siteSettings"] {
        primaryMenu->,
        secondaryMenu->,
        frontpage->{
          ...,
          ${PAGEBUILDER}
        },
        privacypage->,
        "designTokens": *[_id in ["drafts.2aa46f20-4574-4fc5-90e8-4ad01944cbb9"]]{
          ...
        } | order(_updatedAt desc)
      } | order(_updatedAt desc),
      "data": *[_id in [$draftId, $id]]{
        authors[]{
          person->,
        },
        ${PAGEBUILDER},
        ...
      } | order(_updatedAt desc),
    }
    `
const Preview = ({ className, ...props }) => {
  const [page, setPage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    console.log('router has changed', router)
  }, [router])

  useEffect(() => {
    const previewClient = sanityClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      useCdn: false,
      token: router?.query?.access_token,
    })

    // Need id for query
    if (router?.query?.id) {
      const { id } = router.query
      const pageId = id ? id.replace('drafts.', '') : null
      const params = { draftId: `drafts.${pageId}`, id: pageId }

      const fetchPreview = async () => {
        const { data, siteSettings } = await previewClient.fetch(query, params)
        const isPreviewable = PREVIEWABLE_TYPES.includes(data[0]._type)
        let page = data[0]

        // Serve frontpage if not previewable
        if (!isPreviewable) {
          console.warn('This page is not previewable. Serving frontpage')
          page = siteSettings[0].frontpage
        }

        // Make page structure
        const newData = {
          ...page,
          siteSettings: {
            ...siteSettings[0],
            designTokens: siteSettings[0]?.designTokens?.[0],
          },
        }

        setPage(newData)
      }

      // Fetch first preview
      fetchPreview()
    }
  }, [])

  return (
    <div className={className}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="Preview">
        <div className="Preview__content">
          {page && (
            <TemplateResolver page={page} siteSettings={page.siteSettings} />
          )}
        </div>
      </div>
    </div>
  )
}

// This needs to be here
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default styled(Preview)(({ theme }) => css``)
