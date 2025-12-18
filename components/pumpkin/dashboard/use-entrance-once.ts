"use client"

import { useEffect, useState } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

/**
 * Returns `true` shortly after mount (next animation frame) so the browser
 * has a chance to paint the "initial" styles first. This makes CSS entrance
 * transitions reliable and avoids "no-animation" bugs.
 *
 * In reduced-motion mode, we return `true` immediately so the final state
 * renders without movement.
 */
export function useEntranceOnce() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEntered(true)
      return
    }

    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return entered
}


