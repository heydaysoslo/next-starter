import { useState, useEffect } from 'react'

const initialMouseState = {
  x: 0,
  y: 0,
  screenX: 0,
  screenY: 0,
  pageX: 0,
  pageY: 0,
  clientX: 0,
  clientY: 0,
  movementX: 0,
  movementY: 0,
  offsetX: 0,
  offsetY: 0
}

function getMousePositionFromEvent(e) {
  const {
    screenX,
    screenY,
    movementX,
    movementY,
    pageX,
    pageY,
    clientX,
    clientY,
    offsetX,
    offsetY
  } = e
  return {
    screenX,
    screenY,
    movementX,
    movementY,
    pageX,
    pageY,
    clientX,
    clientY,
    offsetX,
    offsetY,
    x: screenX,
    y: screenY
  }
}

/**
 * Get mouse position
 *
 * @example ```tsx
 * const mouse = useMouse()
 * ```
 */
const useMouse = () => {
  const [mousePosition, setMousePostition] = useState(initialMouseState)

  function updateMousePosition(e: MouseEvent) {
    setMousePostition(getMousePositionFromEvent(e))
  }

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition)
    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  return mousePosition
}

export default useMouse
