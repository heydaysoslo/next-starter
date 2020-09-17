import { css, DefaultTheme } from 'styled-components'
import { remSize } from 'styles/utilities'
import fontFactory from 'styles/utilities/fontFactory'
import spacingFactory from 'styles/utilities/spacingFactory'
import theme from './defaultTheme'

export const responsiveFonts: DefaultTheme['responsiveFonts'] = {
  small: '14px/1.2',
  body: {
    xs: '200px/1,2',
    lg: '18px/1.2'
  },
  h1: {
    xs: {
      size: '80px/50px',
      css: css`
        text-transform: uppercase;
      `
    },
    lg: '160px/1.2'
  },
  h2: {
    xs: '24px/1.2',
    lg: '40px/1.2'
  },
  h3: {
    xs: '50px/1.2',
    lg: '24px/1.2'
  }
}

export default {
  ...theme,
  colors: {
    primary: 'green',
    secondary: 'orange',
    text: 'white',
    border: 'red',
    background: 'rgba(0,0,0,.8)'
  },
  fonts: fontFactory({ responsiveFonts, bp: theme.bp }),
  defaultStyle: ({ theme }) => css`
    body {
      background: ${theme?.colors?.background};
    }
  `
}
