import React from 'react'
import { GlobalStyle } from '../styles/utilities/Global'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import 'lazysizes'
import 'styles/reset.css'

import theme from 'styles/themes/defaultTheme'
import darkTheme from 'styles/themes/darkTheme' // gå over til dynamic importering

import Favicon from 'components/Favicon'
import { AppProvider } from 'components/context/appContext'
import useAppContext from '@heydays/useAppContext'

const App = props => {
  return (
    <AppProvider>
      <Inner {...props} />
    </AppProvider>
  )
}

const Inner = ({ Component, pageProps }) => {
  const { state } = useAppContext()
  return (
    <ThemeProvider theme={state.darkTheme ? darkTheme : theme}>
      <Favicon />
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
