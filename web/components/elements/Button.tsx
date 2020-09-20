import React from 'react'
import styled, { css } from 'styled-components'
import { applyModifier } from '../../styles/utilities'

type Modifiers = 'secondary' | 'small' | 'active'

type Props = {
  children: React.ReactNode
  className?: string
  modifiers?: Modifiers | Modifiers[] | undefined
  onClick?: () => void
}

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={className}
      onMouseDown={e => e.preventDefault}
      {...props}
    >
      {children}
    </button>
  )
}

export default styled(Button)(
  ({ theme: t }) => css`
    appearance: none;
    background: none;
    display: inline-block;
    border: 2px solid transparent;
    background-color: ${t.colors.text};
    color: ${t.colors.background};
    font-size: 2rem;
    padding: 20px;
    transition: 0.15s ease background-color, color;
    cursor: pointer;
    ${t.fonts.h1()};
    ${t.spacing.section('mt')}

    &:hover {
      background-color: white;
      color: black;
      border-color: black;
    }

    ${t.bp.sm} {
      background: orange;
    }
    ${t.bp.md} {
      background: red;
    }
    ${t.bp.lg} {
      background: purple;
    }
    ${t.bp.xl} {
      background: ${t.color.darken('red', 0.25)};
    }

    ${applyModifier(
      'small',
      css`
        padding: 0;
      `
    )}

    ${applyModifier(
      'active',
      css`
        /* background: orange; */
      `
    )}
  `
)
