import { css, FlattenSimpleInterpolation } from 'styled-components'
import { spacingProps } from 'types'
import { parseCssUnit } from './helpers'

const shorthandDefs = {
  // Margins
  m: ['margin'],
  ml: ['margin-left'],
  mt: ['margin-top'],
  mr: ['margin-right'],
  mb: ['margin-bottom'],
  my: ['margin-top', 'margin-bottom'],
  mx: ['margin-left', 'margin-right'],
  // Padding
  p: ['padding'],
  pl: ['padding-left'],
  pt: ['padding-top'],
  pr: ['padding-right'],
  pb: ['padding-bottom'],
  py: ['padding-top', 'padding-bottom'],
  px: ['padding-left', 'padding-right'],
  // Grid
  gap: ['grid-gap']
}

const shorthands = Object.keys(shorthandDefs).reduce((acc, key) => {
  acc[key] = value => ({ theme }) => {
    return css`
      ${shorthandDefs[key].map(
        prop => css`
          ${prop}: ${value};
        `
      )}
    `
  }
  return acc
}, {})

type addSpacingProps = (
  props: spacingProps | spacingProps[],
  value: any
) => FlattenSimpleInterpolation

const addSpacingProps: addSpacingProps = (props = 'mb', value) => {
  if (typeof props === 'string') {
    return shorthands[props](value)
  } else if (Array.isArray(props)) {
    return css`
      ${props.map(prop => {
        if (!shorthands[prop]) {
          console.warn(
            `addSpacingProp: the method ${prop} does not exist on spacing`
          )
          return null
        }
        return shorthands[prop](value)
      })}
    `
  }
}

const applyPropValueOptions = (value, options) => {
  // Leave early if we don't have a value
  if (!value) {
    return value
  }
  // Apply multiplier if its a number
  if (!isNaN(options?.multiplier)) {
    const unitParsed = parseCssUnit(value)
    if (unitParsed.number) {
      return `${unitParsed.number * options.multiplier}${unitParsed.unit}`
    }
  }
  // Apply negative number
  if (options?.negative) {
    const { number, unit } = parseCssUnit(value)
    return `-${number}${unit}`
  }
  return value
}

const spacingFactory = ({ spacingUnits, bp }) => {
  // Generate spacing functions
  const spacingFunctions = Object.keys(spacingUnits).reduce((acc, key) => {
    // Make spacing key accessible as object (ie: spacing.gutter)
    acc[key] = (props, options = {}) => ({ theme }) => {
      // Map through all breakpoints for current spacing setting
      return Object.keys(spacingUnits[key]).map(bpKey => {
        // value can either be a theme.spacingUnit.key or a regular unit (like 10px)
        const value = spacingUnits[key][bpKey]
        const unit = theme?.spacingUnit?.[value] || value
        if (bp?.[bpKey]) {
          return css`
            ${bp[bpKey]} {
              ${addSpacingProps(props, applyPropValueOptions(unit, options))};
            }
          `
        } else {
          if (bpKey === 'xs') {
            return css`
              ${addSpacingProps(props, applyPropValueOptions(unit, options))}
            `
          } else {
            console.warn(`Breakpoint key: ${bpKey} does not exist.`)
            return null
          }
        }
      })
    }
    return acc
  }, {})

  // Make spacing object accesible as function
  const spacingObject = ({ val, cssProps, multiplier }) => {
    return css`
      ${addSpacingProps(cssProps, applyPropValueOptions(val, { multiplier }))};
    `
  }

  // Add spacing functions as keys to object
  Object.keys({ ...spacingFunctions }).forEach(key => {
    spacingObject[key] = spacingFunctions[key]
  })

  // Export function object
  return spacingObject
}

export default spacingFactory
