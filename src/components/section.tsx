import Link from "next/link"
import { cn } from "@/lib/utils"

// The site's whole visual system lives here.
//   - One typeface, Geist Sans. Geist Mono only for the footer.
//   - Three sizes: display (hero line), body (18px), small.
//   - Hierarchy is ink vs grey, never boxes, rules or extra weights.
//   - One accent (brand orange) and one decorative element (the sky panel).

export const textLink =
  "underline decoration-foreground/25 underline-offset-[5px] transition-colors hover:text-brand hover:decoration-brand/50"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,36%)]">
      {/* Mobile: a short band above the content. Wide: a sticky right panel. */}
      <aside
        aria-hidden
        className="p-3 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-0 lg:h-dvh"
      >
        <div className="sky h-28 rounded-2xl lg:h-full" />
      </aside>

      <div className="flex min-h-dvh flex-col px-6 sm:px-16 lg:col-start-1 lg:row-start-1">
        <header className="pt-8 sm:pt-14">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight transition-colors hover:text-brand"
          >
            Emil Thaudal Bønnerup
          </Link>
        </header>

        <main className="max-w-[44rem] flex-1 text-lg leading-[1.55]">
          {children}
        </main>

        <footer className="mt-32 flex max-w-[44rem] items-center gap-4 pb-10 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Ugelbølle, Denmark</span>
          <span className="h-px flex-1 bg-border" />
          <Link href="/now" className="transition-colors hover:text-foreground">
            Now
          </Link>
          <Link
            href="https://github.com/emilthaudal"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/emil-tb"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </Link>
        </footer>
      </div>
    </div>
  )
}

export function Hero({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="pt-28 pb-16 text-[28px] leading-[1.25] tracking-tight sm:pt-40 sm:pb-24 sm:text-[32px]">
      {children}
    </h1>
  )
}

export function Section({
  id,
  label,
  className,
  children,
}: {
  id?: string
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("mt-28 scroll-mt-12", className)}>
      <h2 className="mb-5 text-muted-foreground">{label}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

// A titled entry: ink title line, grey details on the same line, then prose.
export function Item({
  title,
  href,
  details,
  children,
}: {
  title: string
  href?: string
  details?: string
  children?: React.ReactNode
}) {
  return (
    <div className="pt-4 first:pt-0">
      <p>
        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            {title}
          </Link>
        ) : (
          title
        )}
        {details && (
          <span className="text-muted-foreground"> · {details}</span>
        )}
      </p>
      {children && <div className="mt-1.5 space-y-4">{children}</div>}
    </div>
  )
}

// Numbered list with grey numerals.
export function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[1.75rem_1fr]">
          <span className="text-muted-foreground tabular-nums">{i + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function Muted({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>
}
