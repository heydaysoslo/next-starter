import React from 'react'
import { GlobalStyle } from '../styles/utilities/Global'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import theme from 'styles/themes/defaultTheme'
import Header from 'components/Header'
import SEO from 'components/SEO'
import Favicon from 'components/Favicon'
import { AppProvider } from 'components/context/appContext'

import 'styles/reset.css'

const App = props => {
  return (
    <AppProvider>
      <Inner {...props} />
    </AppProvider>
  )
}

const Inner = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <SEO
        page={pageProps?.frontpage || pageProps?.article || pageProps?.page}
      />
      <Favicon />
      <Header />
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
