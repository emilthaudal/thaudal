import type { Metadata } from "next"
import Link from "next/link"
import { Hero, Item, Muted, Section, Shell, textLink } from "@/components/section"

export const metadata: Metadata = {
  title: "Now — Emil Thaudal Bønnerup",
  description: "What I'm currently working on, building, and thinking about.",
}

const LAST_UPDATED = "November 2026"

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
        <Item title="Whiteaway, tech lead" details="2024 – now">
          <p>
            Event-driven fulfilment services, built with several small teams.
            Much of my role is domain modelling and breaking the work into
            pieces each team can run with.
          </p>
        </Item>

        <Item title="Whiteaway, agentic engineering" details="2026 – now">
          <p>
            Bringing agentic development to the wider engineering team: how to
            scope work so an agent can run it well, how to review what agents
            write, and where it pays off and where it doesn&apos;t.
          </p>
        </Item>
      </Section>

      <Section label="Side projects">
        <Item
          title="Prism"
          href="https://github.com/emilthaudal/prism"
          details="Go, Swift, macOS"
        >
          <p>
            My main side project. I run many Claude Code sessions
            at once, and two weeks of steering them by hand showed that about a
            third of my typing was avoidable: go-aheads, news from outside the
            session, and asking where things stand.
          </p>
          <p>
            Prism removes those. I talk to one agent, the desk. It starts
            sessions in the background, watches them, and brings me only what
            is mine to decide: a question with options, the evidence behind it
            and a recommendation. Everything else runs under standing orders.
          </p>
          <Status>
            Open source and in daily use. Current focus: a native Mac app next
            to the terminal UI.
          </Status>
        </Item>

        <Item title="Meridian" details="Swift, SwiftUI, macOS">
          <p>
            A native Mac app that puts my workday in one window: the calendar,
            reminders, code reviews and what my agents are waiting on, ranked
            so the next thing is obvious. Free gaps in the day suggest what
            fits in them.
          </p>
          <Status>In daily use since November. Private for now.</Status>
        </Item>

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
            Rather than just counting kilometres, it pulls rides from
            Intervals.icu and cross-references them with the weather: a wet
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
            On the back burner, but maintained.
          </Status>
        </Item>
      </Section>
    </Shell>
  )
}
