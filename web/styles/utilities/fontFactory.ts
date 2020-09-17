import { css, DefaultTheme } from 'styled-components'

import { remSize } from './Converters'

const px2LineHeight = (size, lineheight) => {
  if (!size.includes('px') || !lineheight.includes('px')) {
    console.warn(
      `px2LineHeight() assumes px values. Size or lineheight is not spesified in px. Was ${size} ${lineheight}`
    )
  }
  return (
    Math.round(
      (parseFloat(lineheight) / parseFloat(size) + Number.EPSILON) * 100
    ) / 100
  )
}

export const createFontSizeAndLineHeight = size => {
  const [fz, lh] =
    typeof size === 'object' ? size.size.split('/') : size.split('/')
  const fzUnit = fz.replace(/[0-9]/g, '').trim()
  const fzVal = parseFloat(fz)
  const lhUnit = lh.replace(/[0-9]/g, '').trim()
  return css`
    font-size: ${fzUnit === 'px' ? remSize(fzVal) : fz};
    line-height: ${lhUnit === 'px' ? px2LineHeight(fz, lh) : lh};
    ${size.css && size.css};
  `
}

const fontFactory = ({ responsiveFonts, bp }) =>
  Object.keys(responsiveFonts).reduce((acc, key) => {
    acc[key] = () => {
      if (responsiveFonts?.[key]) {
        const val = responsiveFonts[key]
        return typeof val === 'string'
          ? createFontSizeAndLineHeight(val)
          : Object.keys(val).map(bpKey => {
              return bpKey === 'xs'
                ? createFontSizeAndLineHeight(val[bpKey])
                : css`
                    ${bp[bpKey]} {
                      ${createFontSizeAndLineHeight(val[bpKey])}
                    }
                  `
            })
      }
    }
    return acc
  }, {})

export default fontFactory
