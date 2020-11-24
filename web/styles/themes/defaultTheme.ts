import { css, DefaultTheme } from 'styled-components'

import { remSize } from '../utilities/Converters'
import breakpointsFactory, {
  bp as bpObject
} from '../utilities/breakpointsFactory'
import spacingFactory from '../utilities/spacingFactory'
import fontFactory, { fontFuncs } from '../utilities/fontFactory'
import color from '../utilities/Colors'

export const colors = {
  primary: 'red',
  secondary: 'green',
  text: 'black',
  border: 'black',
  background: 'white'
}

export const breakpoints = {
  xs: 0,
  sm: 550,
  md: 870,
  lg: 1200,
  xl: 1600,
  xxl: 1800
}

export const spacingUnit = {
  xs: remSize(5),
  sm: remSize(10),
  md: remSize(15),
  lg: remSize(40),
  section: remSize(160),
  gutter: remSize(40),
  gap: remSize(20),
  container: remSize(1440),
  pixel: '1px'
}

export const responsiveSpacing = {
  xs: {
    xs: remSize(5),
    lg: remSize(10)
  },
  sm: {
    xs: remSize(10),
    lg: remSize(15)
  },
  md: {
    xs: remSize(15),
    lg: 'lg'
  },
  lg: {
    xs: 'lg',
    lg: '12rem'
  },
  section: {
    xs: remSize(100)
  },
  gutter: {
    xs: 'md',
    lg: 'gutter'
  },
  container: {
    xs: '20px',
    sm: '40px',
    md: '5vw'
  },
  pixel: {
    xs: '1px'
  },
  header: {
    xs: 'var(--header-height)'
  }
}

export const grid = {
  columns: 12
}

export const fontFamily = {
  sans: `'SuisseIntl', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
  serif: `'Suisse Works', times, serif`
}

const fontDefs = {
  xs: '16px/1.2'
}

export const responsiveFonts = {
  small: fontDefs.xs,
  body: {
    xs: fontDefs.xs,
    lg: '18px/1.43'
  },
  title: {
    xs: fontDefs.xs,
    lg: '24px/1.2'
  },
  h1: {
    xs: '30px/1.2',
    md: '45px/1.2',
    lg: '70px/1.2'
  },
  h2: {
    xs: '24px/1.2',
    lg: '40px/1.2'
  },
  h3: {
    xs: fontDefs.xs,
    lg: '24px/1.2'
  }
}

export const aspect = {
  portrait: 6 / 7,
  landscape: 3 / 2,
  square: 1,
  widescreen: 16 / 9,
  panorama: 16 / 11
}

export const elevation = {
  1: 9,
  2: 99,
  3: 999,
  4: 9999
}

export const contentWidth = {
  small: remSize(600),
  large: remSize(1200)
}

export const icons = {
  small: remSize(40),
  medium: remSize(80),
  large: remSize(160)
}

export const trans = {
  fast: `0.1s ease`,
  slow: `1s ease`
}

export const borderWidth = {
  small: remSize(1),
  large: remSize(3)
}

/**
 * Usage:
 * {
 *  border-left: ${theme.border.large()}
 * }
 */
export const border = {
  large: () => ({ theme }) =>
    `${theme.borderWidth.large} solid ${theme.colors.border};`,
  small: () => ({ theme }) =>
    `${theme.borderWidth.small} solid ${theme.colors.border};`
}

const bp: bpObject = breakpointsFactory(breakpoints)
const spacing = spacingFactory({
  responsiveSpacing,
  bp: {
    sm: bp.sm,
    md: bp.md,
    lg: bp.lg,
    xl: bp.xl,
    xxl: bp.xxl
  }
})

const fonts: fontFuncs = fontFactory({ responsiveFonts, bp })

const theme: DefaultTheme = {
  name: 'defaultTheme',
  colors,
  breakpoints,
  color,
  bp,
  spacingUnit,
  grid,
  fontFamily,
  aspect,
  elevation,
  fonts,
  responsiveFonts,
  spacing,
  responsiveSpacing,
  contentWidth,
  trans,
  icons,
  borderWidth,
  border
}

export default theme
