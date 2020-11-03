import React from 'react'
import { GlobalStyle } from '../styles/utilities/Global'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import 'lazysizes/plugins/respimg/ls.respimg.js'
import 'lazysizes/plugins/attrchange/ls.attrchange.js'
import 'lazysizes'

import 'styles/reset.css'

import theme from 'styles/themes/defaultTheme'
import darkTheme from 'styles/themes/darkTheme'
import Header from 'components/Header'

import Favicon from 'components/Favicon'
import { SanityProvider } from 'components/context/sanityContext'
import { AppProvider } from 'components/context/appContext'

const App = props => {
  return (
    <SanityProvider>
      <AppProvider>
        <Inner {...props} />
      </AppProvider>
    </SanityProvider>
  )
}

const Inner = ({ Component, pageProps, ...props }) => {
  const [isDark, setIsDark] = React.useState(false)
  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <Favicon />
      <Header isDark={isDark} setIsDark={setIsDark} />
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
