import Link from "next/link"
import { ActivityGrid } from "@/components/github-activity"
import {
  Item,
  Muted,
  Section,
  Shell,
  Steps,
  textLink,
} from "@/components/section"
import { getGithubActivity } from "@/lib/github-activity"
import { Projects, media } from "@/components/projects"

// ─── Data ─────────────────────────────────────────────────────────────────────

const agenticWork = [
  {
    title: "Prism.",
    description:
      "A desk for running many Claude Code sessions at once. I talk to one agent; it starts the others, watches them, and brings me only the decisions that are mine.",
  },
  {
    title: "From epic to green PRs.",
    description:
      "A task graph built from ticket dependencies, implementer agents in their own git worktrees, and a reviewer with none of the author's context on every PR.",
  },
  {
    title: "Guardrails and evidence.",
    description:
      "A guard hook on risky git and cloud commands, proof before anything is called done, and an LLM-graded eval suite that every skill change has to pass.",
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
      "Event-driven fulfilment services across several small teams, the move to agentic development, and the group's claims platform, which I started as a side project.",
  },
  {
    company: "Lunar",
    details: "Senior Software Engineer, 2022 – 2024",
    description:
      "A payment platform for business customers, event sourced end to end.",
  },
  {
    company: "Beierholm",
    details: "Software Engineer, 2020 – 2022",
    description:
      "Internal tooling for accountants, and a CRM migration from on-prem to Azure.",
  },
  {
    company: "SSI Schäfer",
    details: "Java Developer, 2017 – 2020",
    description:
      "Warehouse management for automated logistics: real conveyors, real consequences.",
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

// The hero's card: where I work now and three things I've made there.
const now = [
  {
    title: "Claims platform",
    description: "A weekend project that became the group's own platform.",
    when: "2026",
    href: "#projects",
  },
  {
    title: "Fulfilment services",
    description: "Event-driven backends across several small teams.",
    when: "2024 –",
    href: "#work",
  },
  {
    title: "Prism",
    description: "The desk I run my coding agents from. Open source.",
    when: "2026",
    href: "#projects",
  },
]

export default async function Home() {
  const activity = await getGithubActivity()

  return (
    <Shell wide>
      <div className="breakout grid items-start gap-x-16 gap-y-12 pt-14 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_28.5rem]">
        <div>
          <h1 className="text-[34px] leading-[1.08] tracking-[-0.03em] text-balance sm:text-[52px]">
            Tech lead, backend engineer.{" "}
            <span className="text-brand">I build with agents.</span>
          </h1>
          <p className="mt-6 max-w-[30rem] text-muted-foreground">
            Nine years of warehouses, payments and fulfilment. Today I lead
            teams at Whiteaway, where agents write my code and I build the
            tools that make that safe.
          </p>
        </div>

        <div className="relative">
          <div aria-hidden className="halo" />
          <div className="glass p-5 pb-4 text-[15px] leading-[1.45]">
            <p className="flex justify-between text-[13px] text-muted-foreground">
              <span>Now</span>
              <span>Ugelbølle, Denmark</span>
            </p>
            <p className="mt-2.5 text-[19px] font-medium tracking-tight">
              Tech Lead, Whiteaway
            </p>
            <ul className="mt-3 -mx-1 space-y-1">
              {now.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-3 rounded-[11px] px-3 py-2 transition-colors hover:bg-foreground/5"
                  >
                    <span>{item.title}</span>
                    <span className="row-span-2 text-[13px] text-muted-foreground tabular-nums">
                      {item.when}
                    </span>
                    <span className="text-[13px] text-muted-foreground">
                      {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 px-2 text-[13px] text-muted-foreground">
              Before: Lunar, Beierholm, SSI Schäfer
            </p>
          </div>
        </div>
      </div>

      {/* The page's first pictures; Projects leaves both out. */}
      <div className="breakout mt-16 grid gap-x-7 gap-y-10 *:min-w-0 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-base">
            Claims platform{" "}
            <span className="text-muted-foreground">· Whiteaway</span>
          </p>
          {media.claims("w-full")}
        </div>
        <div>
          <p className="mb-3 text-base">
            Prism{" "}
            <span className="text-muted-foreground">
              ·{" "}
              <Link
                href="https://github.com/emilthaudal/prism"
                target="_blank"
                rel="noopener noreferrer"
                className={textLink}
              >
                open source
              </Link>
            </span>
          </p>
          {media.prism()}
        </div>
      </div>

      <div className="mt-20 space-y-5">
        <p>
          I&apos;m a tech lead at Whiteaway in Denmark, building event-driven
          backend services with several small teams.
        </p>
        <p>
          I work agent-first. I scope the work, agents implement it, and I
          spend my time on review and on the harness that makes their output
          safe to merge.
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

      <Projects />

      <Section id="work" label="Work">
        {work.map((job) => (
          <Item key={job.company} title={job.company} details={job.details}>
            <p>{job.description}</p>
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
