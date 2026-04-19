import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Now — Emil Thaudal Bønnerup",
  description: "What I'm currently working on, building, and thinking about.",
}

const LAST_UPDATED = "April 2026"

export default function NowPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
            <span className="text-primary">›</span> /now
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl font-semibold leading-tight tracking-tight mb-6">
            Now
          </h1>
          <p className="text-sm text-muted-foreground">
            A snapshot of what I&apos;m focused on right now.{" "}
            <span className="italic">Last updated {LAST_UPDATED}.</span>
          </p>
        </div>

        <div className="space-y-16">
          {/* Work */}
          <section>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Work
            </p>

            <div className="space-y-10">
              {/* Whiteaway */}
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <h2 className="font-heading text-2xl font-semibold">
                    Whiteaway — Fulfillment Pipeline
                  </h2>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    2024 — now
                  </span>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  <p>
                    The main thing consuming my engineering time right now.
                    Whiteaway runs a large e-commerce operation across the
                    Nordics and the fulfillment side — orders, warehouse picks,
                    carrier handoffs, delivery confirmations — has historically
                    been tightly coupled to a legacy Navision ERP system.
                  </p>
                  <p>
                    We&apos;re taking that apart. The goal is a cloud-native,
                    event-driven fulfillment pipeline where each domain
                    (inventory, picking, shipping, returns) owns its own state
                    and communicates through events rather than synchronous ERP
                    calls. The vision is to replace brittle point-to-point
                    integrations with a durable event backbone.
                  </p>
                  <p>
                    In practice this means a lot of domain modeling work —
                    figuring out where the real bounded contexts are inside a
                    system that was never designed with them in mind — and
                    incremental migration so we don&apos;t stop orders moving
                    while we rebuild the rails under them.
                  </p>
                  <p className="text-foreground/60 italic">
                    Current focus: event schema design and the first domain
                    extraction — getting order lifecycle events flowing
                    independently of the ERP write path.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Side projects */}
          <section>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Side projects
            </p>

            <div>
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="font-heading text-2xl font-semibold">Relay</h2>
                <Link
                  href="https://github.com/emilthaudal/Relay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub ↗
                </Link>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  An iOS app that syncs workouts across HealthKit, Strava, and
                  Intervals.icu — deduplicating as it goes so you don&apos;t end
                  up with the same run logged three times. Written in Swift.
                </p>
                <p className="text-foreground/60 italic">
                  Currently on the backburner while the Whiteaway work is
                  intense, but I&apos;m keeping it maintained.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Footer note */}
          <p className="text-xs text-muted-foreground">
            Inspired by{" "}
            <Link
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              nownownow.com
            </Link>
            . The idea is to keep this honest and up to date.
          </p>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
          <span className="text-xs text-muted-foreground">Aalborg, Denmark</span>
        </div>
      </footer>
    </>
  )
}
