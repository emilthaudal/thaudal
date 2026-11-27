"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

// EMI-492: the Projects section in its current form and three shorter ones,
// chosen with ?layout=a|b|c so they can be compared in the running site.
// Without the parameter the page is today's. Once one is picked, it moves into
// page.tsx and this file and the layouts not chosen go.

const options = [
  { key: "current", label: "Current" },
  { key: "a", label: "A · Feature and grid" },
  { key: "b", label: "B · Stage" },
  { key: "c", label: "C · Shelf" },
] as const

export function LayoutSwitch({
  current,
  a,
  b,
  c,
}: {
  current: React.ReactNode
  a: React.ReactNode
  b: React.ReactNode
  c: React.ReactNode
}) {
  const layout = useSearchParams().get("layout")
  const chosen = layout === "a" ? a : layout === "b" ? b : layout === "c" ? c : current
  const key = layout === "a" || layout === "b" || layout === "c" ? layout : "current"

  return (
    <>
      {chosen}
      {layout !== null && (
        <nav
          aria-label="Layout options"
          className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 gap-1 rounded-full border border-border bg-background/85 p-1 text-sm whitespace-nowrap shadow-[0_8px_24px_-12px_oklch(0_0_0/0.3)] backdrop-blur"
        >
          {options.map((o) => (
            <Link
              key={o.key}
              href={`?layout=${o.key}#projects`}
              replace
              aria-current={o.key === key ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1 transition-colors",
                o.key === key
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {o.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
