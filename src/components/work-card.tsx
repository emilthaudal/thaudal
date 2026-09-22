"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type WorkCardProps = {
  company: string
  period: string
  role: string
  description: string
}

export function WorkCard({ company, period, role, description }: WorkCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="group border-t border-border cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between py-5 gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="font-heading text-xl font-semibold">{company}</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {role}
            </span>
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              expanded ? "max-h-48 mt-3 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="text-sm text-muted-foreground leading-relaxed pr-8">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 pt-0.5">
          <span className="text-xs text-muted-foreground tabular-nums">
            {period}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </div>
      </div>
    </div>
  )
}
