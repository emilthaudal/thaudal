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

// The claims platform's first month, as proof under the headline.
const proof = [
  ["~14 h", "to build Whiteaway's claims platform"],
  ["155", "PRs merged by agents"],
  ["0", "lines written by hand"],
]

export default async function Home() {
  const activity = await getGithubActivity()

  return (
    <Shell>
      <h1 className="pt-20 pb-10 text-[30px] leading-[1.2] tracking-tight sm:pt-24 sm:text-[40px]">
        Agents write my code. I build{" "}
        <span className="text-brand">the desk that runs them.</span>
      </h1>

      <dl className="grid grid-cols-3 gap-x-6 pb-14 sm:gap-x-8">
        {proof.map(([value, label]) => (
          <div key={label} className="flex flex-col-reverse justify-end">
            <dt className="text-sm leading-snug text-muted-foreground sm:text-base">
              {label}
            </dt>
            <dd className="text-[24px] tracking-tight tabular-nums sm:text-[28px]">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* The Prism film is the page's first picture; Projects leaves it out. */}
      <div className="breakout">{media.prism()}</div>
      <p className="mt-4 text-base text-muted-foreground">
        Prism, the desk I run my agents from.{" "}
        <Link
          href="https://github.com/emilthaudal/prism"
          target="_blank"
          rel="noopener noreferrer"
          className={textLink}
        >
          It&apos;s open source
        </Link>
        .
      </p>

      <div className="mt-16 space-y-5">
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
