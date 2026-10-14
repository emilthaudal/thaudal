import type { Metadata } from "next"
import Link from "next/link"
import { Nav } from "@/components/nav"
import {
  Entry,
  EntryList,
  Footer,
  Section,
  bodyText,
  textLink,
} from "@/components/section"

export const metadata: Metadata = {
  title: "Now — Emil Thaudal Bønnerup",
  description: "What I'm currently working on, building, and thinking about.",
}

const LAST_UPDATED = "October 2026"

// The closing "where it stands" line of each entry.
function Status({ children }: { children: React.ReactNode }) {
  return <p className="italic text-muted-foreground">{children}</p>
}

export default function NowPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <header className="mx-auto max-w-4xl px-6 pt-40 pb-20 sm:pt-48">
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Now
          </h1>
          <p className="mt-6 text-muted-foreground">
            A snapshot of what I&apos;m focused on right now. Last updated{" "}
            {LAST_UPDATED}.
          </p>
        </header>

        <div className="mx-auto max-w-4xl space-y-24 px-6 pb-32">
          <Section label="work">
            <EntryList>
              <Entry
                title="Whiteaway — Fulfillment Pipeline"
                meta="2024 — now"
              >
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
                <p>
                  We&apos;re now ramping this up: more of the ERP is coming
                  apart, split across several 2-3 person teams working in
                  parallel on separate domains. A growing part of my role is
                  working alongside our architect and project owner to take
                  business capabilities and requirements and break them down
                  into scoped, dependency-aware work each team can actually
                  pick up and run with.
                </p>
                <Status>
                  Current focus: event schema design and the first domain
                  extraction — getting order lifecycle events flowing
                  independently of the ERP write path — plus shaping the
                  team-level breakdown for the next wave of extractions.
                </Status>
              </Entry>

              <Entry
                title="Whiteaway — Agentic Engineering Rollout"
                meta="2026 — now"
              >
                <p>
                  I&apos;ve spent the last while working heavily with Claude
                  and Claude Code, and I&apos;m now responsible for rolling
                  that out across the engineering department — not just
                  picking a tool, but building the practices around it: how to
                  scope work so an agent can run it well, how to review
                  agent-written changes properly, and where the approach
                  actually pays off versus where it doesn&apos;t.
                </p>
                <p>
                  The goal is to lift the whole department&apos;s productivity
                  and quality, not just my own — pairing directly with other
                  engineers on real tasks, writing up what works, and folding
                  the lessons back into how the ERP migration teams operate day
                  to day.
                </p>
                <p>
                  That practice now lives in a Claude Code plugin I built and
                  maintain: skills for planning a feature, running a whole epic
                  with parallel implementer agents, verifying a change with
                  real evidence, fixing CI and investigating production, plus a
                  reviewer agent that reads each PR with none of the
                  author&apos;s context. A guard hook stops agents from
                  force-pushing, skipping tests or touching cloud resources
                  without asking, and every skill change has to pass an
                  LLM-graded eval suite. It runs in Claude Code, Copilot CLI
                  and Codex, so nobody has to switch tools to use it.
                </p>
                <p>
                  My own output is the test case: 680+ merged PRs across
                  roughly 50 services since April, all of it worked
                  agent-first.
                </p>
                <Status>
                  Current focus: piloting the plugin in my own team, feeding
                  what a week of real use shows back into the skills, and then
                  taking it to the rest of the department.
                </Status>
              </Entry>
            </EntryList>
          </Section>

          <Section label="side projects">
            <EntryList>
              <Entry
                title="Drivetrain"
                href="https://drivetrain.thaudal.com"
                tags={["Rust", "Next.js", "Railway"]}
              >
                <p>
                  A bicycle maintenance and component wear tracker. The problem
                  it solves is simple: I forget when I last replaced a chain,
                  serviced the suspension, or swapped brake pads — and I want
                  the app to tell me before the bike tells me in a less
                  pleasant way.
                </p>
                <p>
                  The interesting part is how it calculates wear. Rather than
                  just counting kilometres, it pulls ride data from Strava and
                  Intervals.icu and cross-references it with weather — a wet or
                  snowy ride wears a drivetrain significantly faster than a dry
                  one, so the wear model weights conditions accordingly. The
                  goal is predictions you can actually trust.
                </p>
                <p>
                  Split into an API (Rust) and a web frontend. Auth is Clerk,
                  persistence is sqlx with compile-time query verification —
                  SQL errors surface at{" "}
                  <code className="font-mono text-[13px]">cargo build</code>,
                  not at runtime.
                </p>
                <Status>Live at drivetrain.thaudal.com.</Status>
              </Entry>

              <Entry
                title="Hammi"
                href="https://github.com/emilthaudal/hammi"
                tags={["Rust", "React", "PWA"]}
              >
                <p>
                  A week-long challenge: a Tamagotchi for my wife. Hammi is a
                  pet hamster that lives on her phone. It hatches from an egg,
                  grows up over four days and gets hungry, bored and sleepy in
                  real time, with push notifications when it needs something.
                  The whole household shares the same Hammi.
                </p>
                <p>
                  The one hard rule was that it stays gentle: neglect only
                  makes Hammi sad, never sick, and it cheers up as soon as
                  someone looks after it. Rust and SQLite on the server, a
                  React PWA on the phone, one service on Railway.
                </p>
              </Entry>

              <Entry
                title="Relay"
                href="https://github.com/emilthaudal/Relay"
                tags={["Swift", "iOS", "HealthKit"]}
              >
                <p>
                  An iOS app that syncs workouts across HealthKit, Strava, and
                  Intervals.icu — deduplicating as it goes so you don&apos;t
                  end up with the same run logged three times. Written in
                  Swift.
                </p>
                <Status>
                  Currently on the backburner while the Whiteaway work is
                  intense, but I&apos;m keeping it maintained.
                </Status>
              </Entry>
            </EntryList>
          </Section>

          <p className={`${bodyText} md:pl-[calc(9rem+3rem)]`}>
            Inspired by{" "}
            <Link
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className={textLink}
            >
              nownownow.com
            </Link>
            . The idea is to keep this honest and up to date.
          </p>
        </div>
      </main>

      <Footer>
        <Link href="/" className="transition-colors hover:text-foreground">
          ← Back
        </Link>
        <span>Ugelbølle, Denmark</span>
      </Footer>
    </>
  )
}
