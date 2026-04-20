"use client"

import { useEffect, useState } from "react"
import type { ActivityResponse, ContributionDay } from "@/app/api/github-activity/route"

// ── Colour levels ──────────────────────────────────────────────────────────────
// 5 levels: 0 = empty, 1–4 = progressively more opaque green

function levelForCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-muted/40",
  1: "bg-emerald-900/60 dark:bg-emerald-800/50",
  2: "bg-emerald-700/70 dark:bg-emerald-600/60",
  3: "bg-emerald-600/85 dark:bg-emerald-500/75",
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

  const monthLabels = getMonthLabels(data.weeks)

  return (
    <div className="space-y-3">
      {/* Summary line */}
      <p className="text-sm text-muted-foreground">
        <span className="text-foreground font-medium tabular-nums">
          {data.total.toLocaleString()}
        </span>{" "}
        contributions in the last year
      </p>

      {/* Grid */}
      <div className="overflow-x-auto pb-1">
        <div className="relative min-w-max">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map(({ label, colIndex }, i) => {
              const nextCol = monthLabels[i + 1]?.colIndex ?? data.weeks.length
              const width = (nextCol - colIndex) * 13
              return (
                <span
                  key={`${label}-${colIndex}`}
                  className="text-[10px] text-muted-foreground"
                  style={{ width, minWidth: 0, display: "block" }}
                >
                  {label}
                </span>
              )
            })}
          </div>

          {/* Heatmap rows */}
          <div className="flex gap-0">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-[2px] mr-1 shrink-0">
              {DOW_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="h-[11px] w-7 text-[10px] text-muted-foreground flex items-center justify-end pr-1"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day) => {
                  const level = levelForCount(day.count)
                  return (
                    <div
                      key={day.date}
                      className={`h-[11px] w-[11px] rounded-[2px] cursor-default transition-opacity duration-100 ${LEVEL_CLASSES[level]}`}
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
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-52 bg-muted rounded" />
      <div className="flex gap-[2px] ml-8">
        {Array.from({ length: 53 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {Array.from({ length: 7 }).map((_, di) => (
              <div key={di} className="h-[11px] w-[11px] rounded-[2px] bg-muted/40" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
