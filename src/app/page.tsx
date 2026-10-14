import Link from "next/link"
import { ActivityGrid } from "@/components/github-activity"
import {
  Hero,
  Item,
  Muted,
  Section,
  Shell,
  Steps,
  textLink,
} from "@/components/section"
import { getGithubActivity } from "@/lib/github-activity"

// ─── Data ─────────────────────────────────────────────────────────────────────

const agenticWork = [
  {
    title: "A Claude Code plugin for my team.",
    description:
      "Skills for planning, implementing, verifying, fixing CI and investigating production, plus implementer and reviewer subagents. A guard hook blocks risky git and cloud operations, and every skill change has to pass an eval suite graded by an LLM judge. Runs in Claude Code, Copilot CLI and Codex.",
  },
  {
    title: "From epic to green PRs.",
    description:
      "A task graph built from ticket dependencies, implementer agents running in parallel in their own git worktrees, and a reviewer with none of the author's context on every PR. New tickets start as soon as their blockers merge.",
  },
  {
    title: "Multi-agent orchestration.",
    description:
      "One coordinator session drives several workers in terminal tabs: it starts them with a brief, tells me which ones need a decision, relays my answers and watches for completion.",
  },
  {
    title: "Open-source Claude Code mods.",
    description:
      "A live progress band for long and multi-agent runs, a readable transcript, and the right GitHub account per repo.",
  },
]

const work = [
  {
    company: "Whiteaway",
    details: "Tech Lead & Senior Engineer, 2024 – now",
    description:
      "Taking the fulfillment pipeline off a legacy Navision ERP and onto event-driven services, across several 2–3 person teams. I work with our architect and project owner to break business capabilities into scoped team work, and I lead our move to agentic development.",
  },
  {
    company: "Lunar",
    details: "Senior Software Engineer, 2022 – 2024",
    description:
      "Built a payment service provider platform for business customers: signups, CRM flows and large-scale payment APIs, all event sourced, serving thousands of merchants.",
  },
  {
    company: "Beierholm",
    details: "Software Engineer, 2020 – 2022",
    description:
      "Internal tooling for accountants. Led a stateful CRM migration from on-prem to Azure and SharePoint using event sourcing. The first legacy system I took apart end to end.",
  },
  {
    company: "SSI Schäfer",
    details: "Java Developer, 2017 – 2020",
    description:
      "Warehouse management systems for automated logistics. Distributed systems the hard way: real conveyors, real consequences.",
  },
]

// Every project here was built agent-first with Claude Code.
const projects = [
  {
    name: "Claude Code mods",
    details: "TypeScript, Claude Code hooks",
    description:
      "My public Claude Code plugins: a live progress band for long and multi-agent runs, a readable transcript, and per-repo GitHub accounts.",
    url: "https://github.com/emilthaudal/claude-plugins",
  },
  {
    name: "Drivetrain",
    details: "Rust, Next.js, Railway",
    description:
      "Bicycle component wear tracker. Imports rides from Intervals.icu, adjusts wear for the weather, and warns before a part is worn out.",
    url: "https://drivetrain.thaudal.com",
  },
  {
    name: "Hammi",
    details: "Rust, React, PWA",
    description:
      "A Tamagotchi-style pet hamster I built for my wife in a week. It hatches, grows up over four days and gets hungry and sleepy in real time. Gentle by design: neglect only makes it sad.",
    url: "https://github.com/emilthaudal/hammi",
  },
  {
    name: "Relay",
    details: "Swift, iOS, HealthKit",
    description:
      "Syncs workouts across HealthKit, Strava and Intervals.icu, deduplicating as it goes.",
    url: "https://github.com/emilthaudal/Relay",
  },
]

const stack = {
  Agentic:
    "Claude Code, skills, hooks and subagents, MCP, LLM evals, multi-agent orchestration",
  Languages: "Java, Go, C#, TypeScript, Rust, Swift",
  Patterns:
    "Event sourcing, CQRS, event-driven architecture, domain-driven design",
  Infrastructure: "Azure, AWS, Docker, distributed systems",
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// Server Component: only the activity grid's tooltip ships as client JS.

export default async function Home() {
  const activity = await getGithubActivity()

  return (
    <Shell>
      <Hero>
        I build event-driven backends, and the agent tooling that ships them{" "}
        <span className="text-brand">safely.</span>
      </Hero>

      <Link
        href="https://github.com/emilthaudal/claude-plugins"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl border border-border bg-background px-6 py-5 transition-colors hover:border-foreground/20"
      >
        <span>My Claude Code mods are open source.</span>
        <span className="text-brand">See them on GitHub</span>
      </Link>

      <div className="mt-16 space-y-5">
        <p>
          I&apos;m a tech lead at Whiteaway in Denmark, where I take a legacy
          ERP apart into event-driven services across several small teams.
        </p>
        <p>
          I work agent-first. I scope the work, agents implement it, and I
          spend my time on review and on the harness that makes their output
          safe to merge. Since April 2026 that&apos;s meant 680+ merged PRs
          across about 50 services.
        </p>
        <p>
          Agents are only as good as the task they&apos;re given and the checks
          around them. So most of what I build is that layer: dependency-aware
          task breakdown, isolated worktrees, independent review, guardrails on
          dangerous commands, and evidence before anything is called done.
        </p>
      </div>

      <Section id="agentic" label="What I've built for agents">
        <Steps
          items={agenticWork.map((item) => (
            <>
              {item.title} <Muted>{item.description}</Muted>
            </>
          ))}
        />
      </Section>

      <Section id="work" label="Work">
        {work.map((job) => (
          <Item key={job.company} title={job.company} details={job.details}>
            <p>{job.description}</p>
          </Item>
        ))}
      </Section>

      <Section id="projects" label="Projects">
        {projects.map((project) => (
          <Item
            key={project.name}
            title={project.name}
            href={project.url}
            details={project.details}
          >
            <p>{project.description}</p>
          </Item>
        ))}
      </Section>

      <Section id="stack" label="Stack">
        <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {Object.entries(stack).map(([category, items]) => (
            <div key={category}>
              <dt className="text-muted-foreground">{category}</dt>
              <dd>{items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="activity" label="Activity">
        {activity ? (
          <ActivityGrid data={activity} />
        ) : (
          <p className="text-muted-foreground">Activity unavailable right now.</p>
        )}
      </Section>

      <Section id="contact" label="Contact">
        <p>
          I&apos;m always up for a conversation about agentic engineering,
          distributed systems or side projects. Write to{" "}
          <Link href="mailto:emil@thaudal.com" className={textLink}>
            emil@thaudal.com
          </Link>
          , or find me on{" "}
          <Link
            href="https://www.linkedin.com/in/emil-tb"
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            LinkedIn
          </Link>{" "}
          and{" "}
          <Link
            href="https://github.com/emilthaudal"
            target="_blank"
            rel="noopener noreferrer"
            className={textLink}
          >
            GitHub
          </Link>
          . What I&apos;m focused on right now is on my{" "}
          <Link href="/now" className={textLink}>
            now page
          </Link>
          .
        </p>
      </Section>
    </Shell>
  )
}
