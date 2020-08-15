import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import Emoji from './Emoji'

const Switch = ({ className, onClick, state, size }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseDown={e => e.preventDefault()}
    >
      <div className="inner">
        <motion.div
          className="switch"
          animate={state ? { x: size - size / 2.2 } : { x: 0 }}
        >
          <Emoji>{state ? '🌚' : '🌝'}</Emoji>
        </motion.div>
      </div>
    </button>
  )
}

export default styled(Switch)(
  ({ theme, size = 150 }) => css`
    font-size: ${size / 2.2}px;
    line-height: 1.1;
    display: flex;
    /* align-items: center; */

    .inner {
      width: ${size}px;
      border-radius: ${size / 2.2}px;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
      margin: 0 ${size / 4};
    }

    .switch {
      width: ${size / 2.2}px;
      height: ${size / 2.2}px;
      border-radius: ${size / 2.2}px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  `
)
