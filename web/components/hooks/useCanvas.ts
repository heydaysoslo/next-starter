import { useState, useEffect } from 'react'
import useWindowSize from './useWindowSize'

/**
 *
 * Usage:
 *
 * const Graphic = () => {
  const container = useRef(null)
  const canvas = useRef(null)
  const { c, width, height } = useCanvas({ canvas, container })

  useEffect(() => {
    if (c) {
      c.fillRect(0, 0, 100, 100)
    }
  }, [c])

  return (
    <div ref={container} style={{width: '100%', height: '50vh'}}>
      <canvas ref={canvas}></canvas>
    </div>
  )
}
*
* Use container to control the size of the canvas
*
*/

type Props = {
  canvas: React.RefObject<HTMLCanvasElement>
  container: React.RefObject<HTMLElement>
}

const useCanvas = ({ canvas, container }: Props) => {
  const [c, setC] = useState<CanvasRenderingContext2D | null>(null)
  const [width, setWidth] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const windowSize = useWindowSize()

  // HandleResizing
  useEffect(() => {
    if (canvas?.current && container.current) {
      const ctx = canvas.current.getContext('2d')
      setC(ctx)
      if (ctx) {
        const ratio = window.devicePixelRatio || 1
        ctx.scale(ratio, ratio)

        const { width, height } = container.current.getBoundingClientRect()
        canvas.current.width = width
        canvas.current.height = height
        setWidth(width)
        setHeight(height)
      }
    }
  }, [windowSize, canvas, container])

  return { c, width, height }
}

export default useCanvas
