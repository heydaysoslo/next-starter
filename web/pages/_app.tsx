import React from 'react'
import { GlobalStyle } from '../styles/utilities/Global'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import 'lazysizes'
import 'styles/reset.css'

import theme from 'styles/themes/defaultTheme'
import darkTheme from 'styles/themes/darkTheme' // gå over til dynamic importering

import Favicon from 'components/Favicon'
import { AppProvider } from 'components/context/appContext'
import useAppContext from '@heydays/useAppContext'
import DesignTokens from 'components/DesignTokens'
import { defaultSeo } from 'lib/seoConfig'

const App = (props: AppProps) => {
  return (
    <AppProvider>
      <Inner {...props} />
    </AppProvider>
  )
}

const Inner = ({ Component, pageProps, router }: AppProps) => {
  const { state } = useAppContext()
  return (
    <ThemeProvider theme={state.darkTheme ? darkTheme : theme}>
      <DefaultSeo {...defaultSeo} />
      <Favicon />
      <GlobalStyle />
      <DesignTokens>
        {/* Do not put anything inside Animate Presence or page transitions will fail */}
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </DesignTokens>
    </ThemeProvider>
  )
}

export default App
