import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import keyCodes from '../../utils/keyCodes'

import { H3 } from '@heydays/Typography'
import Editor from '../editor'

/**
 * @example <Accordion items={props.node.items} exclusive />
 * @example <Accordion items={props.node.items} />
 */

type item = { title: string; content: any; editor: any; _key: string }

type Props = {
  items: item[]
  /**
   * Decides if one opens at the time or multiple opens
   * @default false
   */
  exclusive?: boolean
  /**
   * Pass the index if you want to leave one open by default
   * @default null
   */
  defaultActive?: number | number[] | null
  className?: string
}

const Accordion: React.FC<Props> = ({
  items,
  exclusive = false,
  defaultActive = null,
  className
}) => {
  const [active, setActive] = useState(
    exclusive ? defaultActive : [defaultActive]
  )

  // wrapper ref for accesibilty
  const wrapper = useRef<HTMLDivElement>(null)

  // return null if no array
  if (!items || items.length === 0) return null

  const handleClick = (i: number) => {
    if (exclusive) {
      active === i ? setActive(null) : setActive(i)
    } else {
      if (Array.isArray(active)) {
        if (active.includes(i)) {
          const newActive = [...active].filter(a => a !== i)
          setActive(newActive)
        } else {
          setActive([...active, i])
        }
      }
    }
  }
  return (
    <div className={className} ref={wrapper}>
      {items.map(
        (item, i) =>
          item.title &&
          item.content && (
            <AccordionItem
              key={item._key}
              i={i}
              active={active}
              item={item}
              exclusive={exclusive}
              handleClick={handleClick}
              wrapperRef={wrapper}
            />
          )
      )}
    </div>
  )
}

type ItemProps = {
  item: item
  handleClick: (i: number) => void
  i: number
  active: number | (number | number[] | null)[] | null
  wrapperRef: React.RefObject<HTMLDivElement>
  exclusive: boolean
}

const AccordionItem: React.FC<ItemProps> = ({
  item,
  handleClick,
  i,
  active,
  exclusive,
  wrapperRef
}) => {
  const handleKeyDown = e => {
    const { arrowDown, arrowUp, home, end } = keyCodes
    // https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html#kbd_label
    // Prevent scrolling if following keys are pressed
    if ([arrowDown, arrowUp, home, end].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
    if (wrapperRef?.current) {
      const refs: HTMLButtonElement[] = [
        ...wrapperRef.current.querySelectorAll<HTMLButtonElement>('.trigger')
      ]

      if (e.keyCode === arrowDown) {
        if (refs[i + 1]) {
          refs[i + 1].focus()
        } else {
          refs[0].focus()
        }
      }
      if (e.keyCode === arrowUp) {
        if (refs[i - 1]) {
          refs[i - 1].focus()
        } else {
          refs[refs.length - 1].focus()
        }
      }
      if (e.keyCode === home) {
        refs[0].focus()
      }
      if (e.keyCode === end) {
        refs[refs.length - 1].focus()
      }
    }
  }
  const horVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  }
  const verVariants = {
    closed: { rotate: 0 },
    open: { rotate: -90 }
  }
  return (
    // @ts-ignore
    <StyledAccordionItem active={active} exclusive={exclusive} i={i}>
      <button
        className="trigger"
        onClick={() => handleClick(i)}
        onMouseDown={e => e.preventDefault()} // To prevent focus on click but still keeps focus on tab
        onKeyDownCapture={e => handleKeyDown(e)}
        aria-expanded={
          active === i || (Array.isArray(active) && active.includes(i))
            ? 'true'
            : 'false'
        }
        aria-controls={`${item._key}-${i}`}
        id={`${i}-${item._key}`}
      >
        <H3 className="title">{item.title}</H3>
        <svg className="icon" viewBox="0 0 10 10">
          <motion.line
            variants={verVariants}
            animate={active === i ? 'open' : 'closed'}
            className="ver"
            x1="5"
            y1="0"
            x2="5"
            y2="10"
          />
          <motion.line
            variants={horVariants}
            animate={active === i ? 'open' : 'closed'}
            className="hor"
            x1="0"
            y1="5"
            x2="10"
            y2="5"
          />
        </svg>
      </button>
      <div
        className="content"
        id={`${item._key}-${i}`}
        aria-labelledby={`${i}-${item._key}`}
      >
        <Editor blocks={item.editor} />
      </div>
    </StyledAccordionItem>
  )
}

const StyledAccordionItem = styled(AccordionItem)<
  Exclude<ItemProps, 'handleClick' | 'item' | 'wrapperRef'>
>(({ theme: t, active, exclusive, i }) => {
  let isActive = false
  if (Array.isArray(active)) {
    isActive = active?.includes?.(i)
  } else if (exclusive) {
    isActive = active === i
  }
  return css`
    border-bottom: ${t.border?.large?.()};
    border-color: ${isActive
      ? t.colors.primary
      : t.color.darken(t.colors.primary, 0.2)};
    transition: border-color ${t.trans.fast}, scolor ${t.trans.fast};

    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      text-align: left;
      ${t.spacing.xs('py')};

      .title {
        font-family: ${t.fontFamily.sans};
        color: ${isActive
          ? t.colors.primary
          : t.color.darken(t.colors.primary, 0.2)};
      }

      &:focus {
        outline: none;
        background: ${t.colors.primary};
      }
    }

    .icon {
      width: ${t.icons.small};
      height: ${t.icons.small};
      ${t.spacing.sm('mr')};
      line {
        stroke: ${isActive
          ? t.colors.primary
          : t.color.darken(t.colors.primary, 0.2)};
      }
    }

    .content {
      display: ${isActive ? 'block' : 'none'};
      ${t.spacing.sm('px')}
      ${t.spacing.md('pb')}
    }

    &:hover {
      border-color: ${t.color.darken(t.colors.primary, 0.5)};
      .trigger .title {
        color: ${t.color.darken(t.colors.primary, 0.5)};
      }

      .icon {
        line {
          stroke: ${t.color.darken(t.colors.primary, 0.5)};
        }
      }
    }
  `
})

export default styled(Accordion)(({ theme }) => css``)
