import { GlobalStyle } from '../styles/utilities/Global'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import 'lazysizes/plugins/respimg/ls.respimg.js'
import 'lazysizes/plugins/attrchange/ls.attrchange.js'
import 'lazysizes'

import theme, { darkTheme } from '../styles/themes'
import Switch from '../components/elements/Switch'

function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = React.useState(false)
  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <Switch
        size={60}
        state={isDark}
        onClick={() => setIsDark(prevState => !prevState)}
      />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
