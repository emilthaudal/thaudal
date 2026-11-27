"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Layout B (EMI-492): one stage and a row of names. Picking a name swaps what
// is on the stage. The words of every project sit in one grid cell, so the
// stage never moves when the text changes length; only the picked project's
// media is displayed, so the others' clips neither load nor play.

export type Tab = {
  name: string
  // The line of words under the names.
  text: React.ReactNode
  stage: React.ReactNode
}

export function ProjectTabs({ tabs }: { tabs: Tab[] }) {
  const [picked, setPicked] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
    if (step === 0) return
    e.preventDefault()
    const next = (picked + step + tabs.length) % tabs.length
    setPicked(next)
    buttons.current[next]?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Projects"
        className="flex flex-wrap gap-x-7 gap-y-1"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            ref={(el) => {
              buttons.current[i] = el
            }}
            type="button"
            role="tab"
            id={`project-tab-${i}`}
            aria-selected={i === picked}
            aria-controls={`project-panel-${i}`}
            tabIndex={i === picked ? 0 : -1}
            onClick={() => setPicked(i)}
            onKeyDown={onKeyDown}
            className={cn(
              "relative py-1 transition-colors",
              i === picked
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.name}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 bottom-0 h-px origin-left bg-brand transition-transform duration-300 ease-out",
                i === picked ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>

      <div className="mt-5 grid">
        {tabs.map((tab, i) => (
          <div
            key={tab.name}
            aria-hidden={i !== picked}
            className={cn(
              "col-start-1 row-start-1 space-y-1.5 transition-opacity duration-300",
              i === picked ? "opacity-100" : "invisible opacity-0",
            )}
          >
            {tab.text}
          </div>
        ))}
      </div>

      <div className="breakout mt-8">
        {tabs.map((tab, i) => (
          <div
            key={tab.name}
            role="tabpanel"
            id={`project-panel-${i}`}
            aria-labelledby={`project-tab-${i}`}
            hidden={i !== picked}
            className="animate-in duration-500 ease-out fade-in slide-in-from-bottom-1 motion-reduce:animate-none"
          >
            {tab.stage}
          </div>
        ))}
      </div>
    </div>
  )
}
