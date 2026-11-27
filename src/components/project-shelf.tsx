"use client"

import { useEffect, useRef, useState } from "react"

// Layout C (EMI-492): the projects side by side on one shelf that runs to the
// edges of the window and scrolls sideways, by trackpad, touch or the two
// arrows under it.

export function Shelf({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const read = () =>
      setEdge({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
      })
    read()
    el.addEventListener("scroll", read, { passive: true })
    window.addEventListener("resize", read)
    return () => {
      el.removeEventListener("scroll", read)
      window.removeEventListener("resize", read)
    }
  }, [])

  // To the next card whose left edge is past the current one.
  const move = (direction: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const origin = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft)
    const lefts = Array.from(el.children).map(
      (c) => c.getBoundingClientRect().left - origin,
    )
    const target =
      direction === 1
        ? lefts.find((l) => l > 8)
        : lefts.findLast((l) => l < -8)
    if (target === undefined) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: target, behavior: reduced ? "auto" : "smooth" })
  }

  const arrow =
    "flex size-9 items-center justify-center rounded-full border border-border transition-[color,border-color,opacity] hover:border-foreground/25 hover:text-foreground disabled:opacity-35 disabled:hover:border-border"

  return (
    <div>
      <div ref={ref} className="shelf">
        {children}
      </div>
      <div className="mt-6 flex gap-2 text-muted-foreground">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={edge.start}
          aria-label="Previous project"
          className={arrow}
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={edge.end}
          aria-label="Next project"
          className={arrow}
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  )
}
