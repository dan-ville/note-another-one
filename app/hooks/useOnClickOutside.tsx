"use client"
import { RefObject, useEffect } from "react"

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (...args: any[]) => void
) {
  useEffect(() => {
    const listener = (event: any) => {
      // the element in question
      const el = ref?.current
      // Do nothing if clicking ref's element or descendent elements or elements that are exceptions, e.g. should not trigger handler when clicked
      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler(event)
    }
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
