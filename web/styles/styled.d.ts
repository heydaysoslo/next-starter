// import {} from 'styled-components'
// import theme from '../themes/DefaultTheme'
// declare module 'styled-components' {
//   type Theme = typeof theme
//   export interface DefaultTheme extends Theme {}
// }

// import original module declarations
import 'styled-components'
import {
  BorderProps,
  breakpoints,
  BreakPoints,
  spacing,
  spacingProps
} from '../types'
// https://styled-components.com/docs/api#usage-with-typescript
import {} from 'styled-components/cssprop'
import {
  CSSObject,
  CSSProperties,
  FlattenSimpleInterpolation,
  FlattenSimpleInterpolation,
  FlattenSimpleInterpolation,
  FlattenSimpleInterpolation
} from 'styled-components'

type bpAbove = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type bpBelow = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type bpOnly = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type FontDeclarationObject = {
  [key: string]:
    | string
    | {
        size: string
        css?: CSSProp
      }
}

export type FontDeclaration = string | FontDeclarationObject

const range = [...new Array(20)].map((_, i) => i * 0.1) as const
type Percent = typeof range

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main?: string
      primary: string
      secondary: string
      text?: string
      border?: string
      background?: string
    }
    color: {
      (color: any): any
      darken(color: string, percent: number): any
      lighten(color: string, percent: number): any
      rotate(color: string, degree: number): any
      rgba(color: string, alpha: number): any
      hsla(color: string, alpha: number): any
      isDark(color: string): any
      isLight(color: string): any
    }
    breakpoints: BreakPoints
    bp: {
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
      below: {
        [bp in bpBelow]: string
      }
      only: {
        [bp in bpOnly]: string
      }
    }
    spacingUnit?: {
      [size in spacing]: string
    }
    spacing: {
      [size in spacing]: (
        props: spacingProps | spacingProps[]
      ) => FlattenSimpleInterpolation
    }
    responsiveSpacing?: {
      [size in spacing]?: {
        [bp in breakpoints]?: spacing | string
      }
    }
    responsiveFonts?: {
      [key: string]: FontDeclaration
    }
    grid?: {
      columns: number
    }
    fontFamily: {
      sans?: string
      serif?: string
    }
    fonts: {
      small: () => FlattenSimpleInterpolation
      body: () => FlattenSimpleInterpolation
      h1: () => FlattenSimpleInterpolation
      h2: () => FlattenSimpleInterpolation
      h3: () => FlattenSimpleInterpolation
      h4?: () => FlattenSimpleInterpolation
      h5?: () => FlattenSimpleInterpolation
      title?: () => FlattenSimpleInterpolation
      display?: () => FlattenSimpleInterpolation
    }
    aspect: {
      portrait?: number
      landscape?: number
      square?: number
      widescreen?: number
      panorama?: number
    }
    contentWidth: {
      small?: string
      large?: string
      text?: string
      image?: string
    }
    icons: {
      small?: string
      medium?: string
      large?: string
    }
    trans: {
      fast?: string
      slow?: string
    }
    borderWidth: {
      small?: string
      large?: string
    }
    border: {
      small?: () => ({ theme: DefaultTheme }) => string
      large?: () => ({ theme: DefaultTheme }) => string
    }
    defaultStyle?: ({ theme }: { theme: DefaultTheme | undefined }) => void
  }
}
