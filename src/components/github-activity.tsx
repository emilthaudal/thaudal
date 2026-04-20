"use client"

import { useEffect, useRef, useState } from "react"
import type { ActivityResponse, ContributionDay } from "@/app/api/github-activity/route"

// ── Colour levels ──────────────────────────────────────────────────────────────

function levelForCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

// Empty cells: near-transparent so the grid structure is visible but not heavy.
// Active levels: consistent green scale that works in both light and dark mode.
const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-foreground/[0.06]",
  1: "bg-emerald-800/50 dark:bg-emerald-700/50",
  2: "bg-emerald-600/70 dark:bg-emerald-500/65",
  3: "bg-emerald-500/85 dark:bg-emerald-400/80",
  4: "bg-emerald-500 dark:bg-emerald-400",
}

// ── Tooltip state ──────────────────────────────────────────────────────────────

type TooltipInfo = {
  date: string
  count: number
  x: number
  y: number
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// ── Month labels ───────────────────────────────────────────────────────────────

function getMonthLabels(
  weeks: ContributionDay[][]
): { label: string; colIndex: number }[] {
  const labels: { label: string; colIndex: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, i) => {
    const firstDay = week[0]
    if (!firstDay) return
    const month = new Date(firstDay.date + "T00:00:00").getMonth()
    if (month !== lastMonth) {
      labels.push({
        label: new Date(firstDay.date + "T00:00:00").toLocaleString("en-US", {
          month: "short",
        }),
        colIndex: i,
      })
      lastMonth = month
    }
  })

  return labels
}

// ── Day-of-week labels ─────────────────────────────────────────────────────────

const DOW_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]

// ── Main component ─────────────────────────────────────────────────────────────

export function GithubActivity() {
  const [data, setData] = useState<ActivityResponse | null>(null)
  const [error, setError] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)

  useEffect(() => {
    fetch("/api/github-activity")
      .then((r) => {
        if (!r.ok) throw new Error("Failed")
        return r.json() as Promise<ActivityResponse>
      })
      .then(setData)
      .catch(() => setError(true))
  }, [])

  if (error) {
    return (
      <p className="text-sm text-muted-foreground">
        Activity unavailable right now.
      </p>
    )
  }

  if (!data) {
    return <ActivitySkeleton />
  }

  const numWeeks = data.weeks.length
  const monthLabels = getMonthLabels(data.weeks)

  return (
    <div className="space-y-3 w-full">
      {/* Summary line */}
      <p className="text-sm text-muted-foreground">
        <span className="text-foreground font-medium tabular-nums">
          {data.total.toLocaleString()}
        </span>{" "}
        contributions in the last year
      </p>

      {/* Grid — fluid, fills full container width */}
      <div className="w-full">
        {/* Outer layout: [day labels col] [heatmap area] */}
        <div className="flex gap-1 w-full">
          {/* Left column: spacer for month row + day-of-week labels */}
          <div className="shrink-0 w-7">
            {/* Spacer matching month labels height */}
            <div className="h-4" />
            {/* Day-of-week labels — height matches cell rows */}
            <div
              className="grid"
              style={{ gridTemplateRows: `repeat(7, 1fr)`, rowGap: "3px" }}
            >
              {DOW_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="text-[10px] text-muted-foreground flex items-center justify-end pr-1 leading-none"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right column: month labels + week grid */}
          <div className="flex-1 min-w-0">
            {/* Month labels — same grid template as week columns */}
            <div
              className="grid mb-1"
              style={{
                gridTemplateColumns: `repeat(${numWeeks}, 1fr)`,
              }}
            >
              {monthLabels.map(({ label, colIndex }, i) => (
                <span
                  key={`${label}-${colIndex}`}
                  className="text-[10px] text-muted-foreground leading-none"
                  style={{
                    gridColumn: colIndex + 1,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Week columns grid */}
            <div
              className="grid w-full"
              style={{
                gridTemplateColumns: `repeat(${numWeeks}, 1fr)`,
                gap: "3px",
              }}
            >
              {data.weeks.map((week, wi) => (
                <div
                  key={wi}
                  className="grid"
                  style={{
                    gridTemplateRows: "repeat(7, 1fr)",
                    gap: "3px",
                  }}
                >
                  {week.map((day) => {
                    const level = levelForCount(day.count)
                    return (
                      <div
                        key={day.date}
                        className={`rounded-[2px] cursor-default transition-opacity duration-100 aspect-square ${LEVEL_CLASSES[level]}`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setTooltip({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          })
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASSES[level]}`}
          />
        ))}
        <span>More</span>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y - 8, transform: "translate(-50%, -100%)" }}
        >
          <div className="bg-popover text-popover-foreground text-[11px] border border-border rounded px-2 py-1 shadow-md whitespace-nowrap">
            <span className="font-medium">{tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}</span>
            {" · "}
            <span className="text-muted-foreground">{formatDate(tooltip.date)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function ActivitySkeleton() {
  return (
    <div className="space-y-3 animate-pulse w-full">
      <div className="h-4 w-52 bg-muted rounded" />
      <div className="flex gap-1 w-full">
        <div className="shrink-0 w-7" />
        <div
          className="grid flex-1"
          style={{ gridTemplateColumns: "repeat(53, 1fr)", gap: "3px" }}
        >
          {Array.from({ length: 53 }).map((_, wi) => (
            <div
              key={wi}
              className="grid"
              style={{ gridTemplateRows: "repeat(7, 1fr)", gap: "3px" }}
            >
              {Array.from({ length: 7 }).map((_, di) => (
                <div key={di} className="rounded-[2px] aspect-square bg-foreground/[0.06]" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
