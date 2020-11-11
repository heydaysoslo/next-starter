import React from 'react'
import { GlobalStyle } from '../styles/utilities/Global'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'

import 'lazysizes'
import 'styles/reset.css'

import theme from 'styles/themes/defaultTheme'
import darkTheme from 'styles/themes/darkTheme' // gå over til dynamic importering

import Favicon from 'components/Favicon'
import { AppProvider } from 'components/context/appContext'
import useAppContext from '@heydays/useAppContext'

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
      <Favicon />
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
        {/* key={router.route} fucks up route changes */}
        {/* <Component {...pageProps} router={router} key={router.route} /> */}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
