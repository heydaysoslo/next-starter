import React from 'react'
import dynamic from 'next/dynamic'
import SEO from '../components/SEO'

const AdminBar = dynamic(() => import('../components/cms/AdminBar'), {
  ssr: false
})

const Layout = ({ page, preview = false, children }) => {
  return (
    <>
      <SEO page={page} />
      {preview && <AdminBar />}
      {children}
    </>
  )
}

export default Layout
