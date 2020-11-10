import React from 'react'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import SEO from '../components/SEO'
import Footer from '@heydays/Footer'
import styled from 'styled-components'

const AdminBar = dynamic(() => import('../components/cms/AdminBar'), {
  ssr: false
})

const Layout = ({ page, preview = false, children }) => {
  return (
    <Wrapper>
      <SEO page={page} />
      <Content>
        {preview && <AdminBar />}
        <Header />
        {children}
      </Content>
      <StyledFooter />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
`

const Content = styled.div`
  flex: 1 0 auto;
`
const StyledFooter = styled(Footer)`
  flex-shrink: 0;
`

export default Layout
