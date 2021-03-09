import React from 'react'
import dynamic from 'next/dynamic'
import Header from './Header'
import SEO from './SEO'
import Footer from '@heydays/Footer'
import styled from 'styled-components'
import { SanityProvider } from 'components/context/sanityContext'
import useAppContext from '@heydays/useAppContext'

type Props = {
  page: any
  global: any
}

const Layout: React.FC<Props> = ({ page, global, children }) => {
  const { state } = useAppContext()
  return (
    <SanityProvider data={{ global }}>
      <Wrapper>
        <SEO page={page} />
        <Content>
          <Header isDark={state.isDark} />
          {children}
        </Content>
        <StyledFooter />
      </Wrapper>
    </SanityProvider>
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
  position: relative;
`
const StyledFooter = styled(Footer)`
  flex-shrink: 0;
`

export default Layout
