import Link from "next/link"
import { cn } from "@/lib/utils"

// The site's whole visual system lives here. Three type roles, nothing else:
//   - Playfair (font-heading) for names and titles
//   - Noto Sans for reading text
//   - Geist Mono, small and muted, for metadata: section labels, dates, tags
// Every list on the site is the same hairline-divided Entry, never a boxed card.

export const bodyText = "text-[15px] leading-relaxed text-foreground/80"

export const textLink =
  "text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"

export function Section({
  id,
  label,
  children,
}: {
  id?: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 grid gap-6 md:grid-cols-[9rem_1fr] md:gap-12"
    >
      <h2 className="font-mono text-xs text-muted-foreground md:pt-2">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export function EntryList({ children }: { children: React.ReactNode }) {
  return <div className="divide-y divide-border">{children}</div>
}

export function Entry({
  title,
  href,
  meta,
  subtitle,
  tags,
  children,
}: {
  title: string
  href?: string
  meta?: string
  subtitle?: string
  tags?: string[]
  children?: React.ReactNode
}) {
  return (
    <article className="py-7 first:pt-0 last:pb-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-xl font-semibold">
          {href ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group decoration-1 underline-offset-4 hover:underline"
            >
              {title}
              <span
                aria-hidden
                className="ml-1.5 font-sans text-sm text-muted-foreground transition-colors group-hover:text-foreground"
              >
                ↗
              </span>
            </Link>
          ) : (
            title
          )}
        </h3>
        {meta && (
          <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
            {meta}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      )}
      {children && <div className={cn("mt-3 space-y-3", bodyText)}>{children}</div>}
      {tags && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          {tags.join(" · ")}
        </p>
      )}
    </article>
  )
}

export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-5 font-mono text-xs text-muted-foreground">
        {children}
      </div>
    </footer>
  )
}
