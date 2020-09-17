import { DefaultTheme } from 'styled-components'
import { emSize } from './Converters'

type bp = (breakpoints: DefaultTheme['breakpoints']) => DefaultTheme['bp']

export const breakpointsFactory: bp = breakpoints => ({
  sm: `@media (min-width: ${emSize(breakpoints.sm)})`,
  md: `@media (min-width: ${emSize(breakpoints.md)})`,
  lg: `@media (min-width: ${emSize(breakpoints.lg)})`,
  xl: `@media (min-width: ${emSize(breakpoints.xl)})`,
  xxl: `@media (min-width: ${emSize(breakpoints.xxl)})`,

  below: {
    sm: `@media (max-width: ${emSize(breakpoints.xs)})`,
    md: `@media (max-width: ${emSize(breakpoints.sm)})`,
    lg: `@media (max-width: ${emSize(breakpoints.md)})`,
    xl: `@media (max-width: ${emSize(breakpoints.lg)})`,
    xxl: `@media (max-width: ${emSize(breakpoints.xl)})`
  },

  only: {
    xs: `@media (max-width: ${emSize(breakpoints.sm)})`,
    sm: `@media (min-width: ${emSize(breakpoints.xs)} and max-width: ${emSize(
      breakpoints.md
    )})`,
    md: `@media (min-width: ${emSize(breakpoints.sm)} and max-width: ${emSize(
      breakpoints.lg
    )})`,
    lg: `@media (min-width: ${emSize(breakpoints.md)} and max-width: ${emSize(
      breakpoints.xl
    )})`,
    xl: `@media (min-width: ${emSize(breakpoints.lg)} and max-width: ${emSize(
      breakpoints.xxl
    )})`,
    xxl: `@media (min-width: ${emSize(breakpoints.xl)})`
  }
})

export default breakpointsFactory
