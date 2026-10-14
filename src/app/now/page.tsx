import type { Metadata } from "next"
import Link from "next/link"
import { Hero, Item, Muted, Section, Shell, textLink } from "@/components/section"

export const metadata: Metadata = {
  title: "Now — Emil Thaudal Bønnerup",
  description: "What I'm currently working on, building, and thinking about.",
}

const LAST_UPDATED = "October 2026"

// The closing "where it stands" line of each entry.
function Status({ children }: { children: React.ReactNode }) {
  return (
    <p>
      <Muted>{children}</Muted>
    </p>
  )
}

export default function NowPage() {
  return (
    <Shell>
      <Hero>
        What I&apos;m focused on <span className="text-brand">now.</span>
      </Hero>

      <p className="text-muted-foreground">
        Last updated {LAST_UPDATED}. Inspired by{" "}
        <Link
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className={textLink}
        >
          nownownow.com
        </Link>
        ; the idea is to keep this honest and up to date.
      </p>

      <Section label="Work" className="mt-16">
        <Item title="Whiteaway, fulfillment pipeline" details="2024 – now">
          <p>
            The main thing consuming my engineering time. Whiteaway runs a
            large e-commerce operation across the Nordics, and the fulfillment
            side (orders, warehouse picks, carrier handoffs, delivery
            confirmations) has historically been tightly coupled to a legacy
            Navision ERP.
          </p>
          <p>
            We&apos;re taking that apart. The goal is an event-driven
            fulfillment pipeline where each domain (inventory, picking,
            shipping, returns) owns its own state and communicates through
            events rather than synchronous ERP calls, replacing brittle
            point-to-point integrations with a durable event backbone.
          </p>
          <p>
            In practice that means a lot of domain modelling, finding the real
            bounded contexts in a system never designed with them in mind, and
            incremental migration so orders keep moving while we rebuild the
            rails under them. It&apos;s now split across several 2–3 person
            teams, and a growing part of my role is breaking business
            capabilities into scoped, dependency-aware work each team can run
            with.
          </p>
          <Status>
            Current focus: event schema design and the first domain extraction,
            getting order lifecycle events flowing independently of the ERP
            write path, plus the team breakdown for the next wave.
          </Status>
        </Item>

        <Item title="Whiteaway, agentic engineering" details="2026 – now">
          <p>
            I&apos;m responsible for rolling agentic development out across
            the engineering department. Not just picking a tool, but building
            the practices around it: how to scope work so an agent can run it
            well, how to review agent-written changes properly, and where the
            approach pays off versus where it doesn&apos;t.
          </p>
          <p>
            That practice now lives in a Claude Code plugin I built and
            maintain: skills for planning a feature, running a whole epic with
            parallel implementer agents, verifying a change with real evidence,
            fixing CI and investigating production, plus a reviewer agent that
            reads each PR with none of the author&apos;s context. A guard hook
            stops agents from force-pushing, skipping tests or touching cloud
            resources without asking, and every skill change has to pass an
            LLM-graded eval suite. It runs in Claude Code, Copilot CLI and
            Codex, so nobody has to switch tools.
          </p>
          <p>
            My own output is the test case: 680+ merged PRs across roughly 50
            services since April, all of it worked agent-first.
          </p>
          <Status>
            Current focus: piloting the plugin in my own team, feeding what
            real use shows back into the skills, then taking it to the rest of
            the department.
          </Status>
        </Item>
      </Section>

      <Section label="Side projects">
        <Item
          title="Drivetrain"
          href="https://drivetrain.thaudal.com"
          details="Rust, Next.js, Railway"
        >
          <p>
            A bicycle component wear tracker. I forget when I last replaced a
            chain or swapped brake pads, and I want the app to tell me before
            the bike does in a less pleasant way.
          </p>
          <p>
            Rather than just counting kilometres, it pulls rides from Strava
            and Intervals.icu and cross-references them with the weather: a wet
            or snowy ride wears a drivetrain much faster than a dry one. Rust
            API with sqlx compile-time checked queries, so SQL errors surface
            at <code className="font-mono text-base">cargo build</code>, not
            at runtime.
          </p>
          <Status>Live at drivetrain.thaudal.com.</Status>
        </Item>

        <Item
          title="Hammi"
          href="https://github.com/emilthaudal/hammi"
          details="Rust, React, PWA"
        >
          <p>
            A week-long challenge: a Tamagotchi for my wife. Hammi is a pet
            hamster that lives on her phone. It hatches from an egg, grows up
            over four days and gets hungry, bored and sleepy in real time, with
            push notifications when it needs something. The whole household
            shares the same Hammi.
          </p>
          <p>
            The one hard rule was that it stays gentle: neglect only makes
            Hammi sad, never sick, and it cheers up as soon as someone looks
            after it.
          </p>
        </Item>

        <Item
          title="Relay"
          href="https://github.com/emilthaudal/Relay"
          details="Swift, iOS, HealthKit"
        >
          <p>
            An iOS app that syncs workouts across HealthKit, Strava and
            Intervals.icu, deduplicating as it goes so the same run isn&apos;t
            logged three times.
          </p>
          <Status>
            On the backburner while the Whiteaway work is intense, but
            maintained.
          </Status>
        </Item>
      </Section>
    </Shell>
  )
}
