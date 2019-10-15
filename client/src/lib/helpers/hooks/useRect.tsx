// source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { useLayoutEffect, useCallback, useState } from 'react'
import { Limiter } from '../helpers';

type RectResult = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

function getRect<T extends HTMLElement>(element?: T): RectResult {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  }
  if (element) rect = element.getBoundingClientRect()
  return rect
}

export function useRect<T extends HTMLElement>(ref: React.RefObject<T>, options?: { refreshInterval?: number }): RectResult {
  const [rect, setRect] = useState<RectResult>(ref && ref.current ? getRect(ref.current) : getRect())

  const debounce = new Limiter(options && options.refreshInterval ? options.refreshInterval : 750);
  const handleResize = useCallback(() => {
    if (!ref.current) return
    // Update client rect
    debounce.execute(() => setRect(getRect(ref.current!)))
  }, [ref])

  //inital load
  useLayoutEffect(() => {
    if (!ref.current) return
    setRect(getRect(ref.current!))
  }, [])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    handleResize()

    // @ts-ignore
    if (typeof ResizeObserver === 'function') {
      // @ts-ignore
      let resizeObserver = new ResizeObserver(() => handleResize())
      resizeObserver.observe(element)
      return () => {
        if (!resizeObserver) return
        resizeObserver.disconnect()
        resizeObserver = null
      }
    } else {
      window.addEventListener('resize', handleResize) // Browser support, remove freely
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [ref.current])

  return rect
}