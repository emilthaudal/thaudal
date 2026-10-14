import Link from "next/link"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { ActivityGrid } from "@/components/github-activity"
import {
  Entry,
  EntryList,
  Footer,
  Section,
  bodyText,
  textLink,
} from "@/components/section"
import { getGithubActivity } from "@/lib/github-activity"

// ─── Data ─────────────────────────────────────────────────────────────────────

const work = [
  {
    company: "Whiteaway",
    period: "2024 — now",
    role: "Tech Lead & Senior Engineer",
    description:
      "Migrating the fulfillment pipeline off legacy Navision onto a cloud-native event-driven architecture, split across several 2-3 person teams. Working with our architect and project owner to break business capabilities into scoped team work. Working agent-first: 680+ merged PRs across ~50 services since April 2026, and I built our Claude Code plugin, now in pilot ahead of a department-wide rollout.",
  },
  {
    company: "Lunar",
    period: "2022 — 2024",
    role: "Senior Software Engineer",
    description:
      "Built a payment service provider platform for business customers — signups, CRM flows, and large-scale payment APIs, all event sourced. Worked across core banking infrastructure serving thousands of merchants.",
  },
  {
    company: "Beierholm",
    period: "2020 — 2022",
    role: "Software Engineer",
    description:
      "Internal tooling for accountants. Led a stateful CRM migration from on-prem to Azure and SharePoint using event sourcing. First time taking a legacy system apart end-to-end.",
  },
  {
    company: "SSI Schäfer",
    period: "2017 — 2020",
    role: "Java Developer",
    description:
      "Java development on WMS systems for automated warehouse logistics. Learned distributed systems the hard way — real conveyors, real consequences.",
  },
]

const agenticStats = [
  { value: "680+", label: "merged PRs since April 2026" },
  { value: "~50", label: "services shipped to" },
  { value: "13", label: "skills in the team plugin" },
  { value: "3", label: "agent CLIs it runs in" },
]

const agenticWork = [
  {
    title: "A Claude Code plugin for my team",
    description:
      "Skills for planning, implementing, verifying, fixing CI and investigating production, plus implementer and reviewer subagents. A guard hook blocks risky git and cloud operations, and every skill change has to pass an eval suite graded by an LLM judge. Runs in Claude Code, Copilot CLI and Codex.",
  },
  {
    title: "From epic to green PRs",
    description:
      "Builds a task graph from ticket dependencies, runs implementer agents in parallel, each in its own git worktree, and gives every PR a reviewer with none of the author's context. New tickets start as soon as their blockers merge.",
  },
  {
    title: "Multi-agent orchestration",
    description:
      "One coordinator session drives several worker sessions in terminal tabs: it starts them with a brief, tells me which ones need a decision, relays my answers and watches for completion.",
  },
  {
    title: "Open-source Claude Code mods",
    description:
      "agent-progress shows running commands, context use, CI status and live multi-agent progress above the prompt. readable restyles the transcript, and gh-account picks the right GitHub account per repo.",
    url: "https://github.com/emilthaudal/claude-plugins",
  },
]

const stack = {
  Agentic: [
    "Claude Code",
    "Skills, hooks & subagents",
    "MCP",
    "LLM evals",
    "Multi-agent orchestration",
  ],
  Languages: ["Java", "Go", "C#", "TypeScript", "Rust", "Swift"],
  Patterns: [
    "Event Sourcing",
    "CQRS",
    "Event-Driven Architecture",
    "Domain-Driven Design",
  ],
  "Cloud / Infra": ["Azure", "Docker", "SharePoint", "Distributed Systems"],
}

// Every project here was built agent-first with Claude Code.
const projects = [
  {
    name: "Claude Code mods",
    description:
      "My public Claude Code plugins: a live progress band for long and multi-agent runs, a readable transcript, and per-repo GitHub accounts. TypeScript, with tests.",
    url: "https://github.com/emilthaudal/claude-plugins",
    tags: ["Claude Code", "TypeScript", "Hooks"],
  },
  {
    name: "Drivetrain",
    description:
      "Bicycle component wear tracker. Imports rides from Intervals.icu, adjusts wear for the weather, and warns before a part is worn out. Rust API and Next.js frontend, live on Railway.",
    url: "https://drivetrain.thaudal.com",
    tags: ["Rust", "Next.js", "Railway"],
  },
  {
    name: "Hammi",
    description:
      "A Tamagotchi-style pet hamster I built for my wife in a week. It hatches, grows up over four days and gets hungry and sleepy in real time, with push notifications. Gentle by design: neglect only makes it sad.",
    url: "https://github.com/emilthaudal/hammi",
    tags: ["Rust", "React", "PWA"],
  },
  {
    name: "Relay",
    description:
      "iOS workout sync hub that deduplicates and syncs workouts across HealthKit, Strava and Intervals.icu. Built in Swift.",
    url: "https://github.com/emilthaudal/Relay",
    tags: ["Swift", "iOS", "HealthKit"],
  },
]

const contact = [
  { label: "Email", href: "mailto:emil@thaudal.com", text: "emil@thaudal.com" },
  {
    label: "GitHub",
    href: "https://github.com/emilthaudal",
    text: "github.com/emilthaudal",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/emil-tb",
    text: "linkedin.com/in/emil-tb",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
// Server Component: only Nav's theme/scroll state and the activity grid's
// tooltip ship as client JS. Everything else renders once on the server.

export default async function Home() {
  const activity = await getGithubActivity()

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        <div className="mx-auto max-w-4xl space-y-24 px-6 pb-32">
          <Section id="agentic" label="agentic engineering">
            <div className="max-w-2xl space-y-4">
              <p className="text-xl leading-snug">
                I work agent-first. I scope the work, agents implement it, and
                I spend my time on review and on the harness that makes their
                output safe to merge.
              </p>
              <p className={bodyText}>
                Agents are only as good as the task they&apos;re given and the
                checks around them. So most of what I build is that layer:
                dependency-aware task breakdown, isolated worktrees,
                independent review, guardrails on dangerous commands, and
                evidence before anything is called done.
              </p>
            </div>

            <dl className="my-10 grid grid-cols-2 gap-y-6 border-y border-border py-6 sm:grid-cols-4">
              {agenticStats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse justify-end gap-1 pr-4">
                  <dt className="font-mono text-xs text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="font-heading text-4xl font-semibold tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <EntryList>
              {agenticWork.map((item) => (
                <Entry key={item.title} title={item.title} href={item.url}>
                  <p>{item.description}</p>
                </Entry>
              ))}
            </EntryList>
          </Section>

          <Section id="work" label="work">
            <EntryList>
              {work.map((job) => (
                <Entry
                  key={job.company}
                  title={job.company}
                  meta={job.period}
                  subtitle={job.role}
                >
                  <p>{job.description}</p>
                </Entry>
              ))}
            </EntryList>
          </Section>

          <Section id="projects" label="projects">
            <EntryList>
              {projects.map((project) => (
                <Entry
                  key={project.name}
                  title={project.name}
                  href={project.url}
                  tags={project.tags}
                >
                  <p>{project.description}</p>
                </Entry>
              ))}
            </EntryList>
          </Section>

          <Section id="stack" label="stack">
            <dl className="space-y-4">
              {Object.entries(stack).map(([category, items]) => (
                <div
                  key={category}
                  className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4"
                >
                  <dt className="font-mono text-xs text-muted-foreground sm:pt-1">
                    {category}
                  </dt>
                  <dd className={bodyText}>{items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="activity" label="activity">
            {activity ? (
              <ActivityGrid data={activity} />
            ) : (
              <p className="text-sm text-muted-foreground">
                Activity unavailable right now.
              </p>
            )}
          </Section>

          <Section id="contact" label="contact">
            <p className={`${bodyText} max-w-2xl`}>
              I&apos;m always open to interesting conversations — about
              agentic engineering, distributed systems, side projects, or
              anything else.
            </p>
            <dl className="mt-6 space-y-2">
              {contact.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4"
                >
                  <dt className="font-mono text-xs text-muted-foreground sm:pt-1">
                    {item.label}
                  </dt>
                  <dd className="text-[15px]">
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={textLink}
                    >
                      {item.text}
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        </div>
      </main>

      <Footer>
        <span>© {new Date().getFullYear()} Emil Thaudal Bønnerup</span>
        <span>Ugelbølle, Denmark</span>
      </Footer>
    </>
  )
}
