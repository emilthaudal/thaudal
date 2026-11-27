import Link from "next/link"
import { Suspense } from "react"
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
import { Clip, Shot, ThemedShot } from "@/components/media"
import { getGithubActivity } from "@/lib/github-activity"
import { LayoutSwitch } from "@/components/layout-switch"
import {
  ProjectsFeatureGrid,
  ProjectsShelf,
  ProjectsStage,
} from "@/components/project-layouts"
import { projectInfo, prismTuiAlt, type ProjectInfo } from "@/data/projects"
import prismLight from "@/assets/projects/prism-light.webp"
import prismDark from "@/assets/projects/prism-dark.webp"
import prismTui from "@/assets/projects/prism-tui.webp"
import meridianLight from "@/assets/projects/meridian-focus-light.webp"
import meridianDark from "@/assets/projects/meridian-focus-dark.webp"

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
      "Event-driven fulfilment services across several small teams, and the move to agentic development.",
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

// Every project here was built agent-first with Claude Code. All screens are
// captured from fixture or demo data, never from real accounts. The words are
// in data/projects.ts, shared with the layouts under comparison (EMI-492).
const projects: (ProjectInfo & { media?: React.ReactNode })[] = [
  {
    ...projectInfo.prism,
    media: (
      <>
        <ThemedShot
          light={prismLight}
          dark={prismDark}
          alt={projectInfo.prism.alt}
        />
        <Shot src={prismTui} alt={prismTuiAlt} className="mt-4" />
      </>
    ),
  },
  {
    ...projectInfo.meridian,
    media: (
      <ThemedShot
        light={meridianLight}
        dark={meridianDark}
        alt={projectInfo.meridian.alt}
      />
    ),
  },
  {
    ...projectInfo.drivetrain,
    media: (
      <Clip
        src="/projects/drivetrain.mp4"
        poster="/projects/drivetrain-poster.webp"
        dark={{
          src: "/projects/drivetrain-dark.mp4",
          poster: "/projects/drivetrain-dark-poster.webp",
        }}
        alt={projectInfo.drivetrain.alt}
        width={2048}
        height={1280}
      />
    ),
  },
  {
    ...projectInfo.hammi,
    media: (
      <Clip
        src="/projects/hammi.mp4"
        poster="/projects/hammi-poster.webp"
        alt={projectInfo.hammi.alt}
        width={780}
        height={1160}
        className="max-w-[17rem]"
      />
    ),
  },
  projectInfo.mods,
  projectInfo.relay,
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

  const currentProjects = (
    <Section id="projects" label="Projects">
      {projects.map((project) => (
        <Item
          key={project.name}
          title={project.name}
          href={project.url}
          details={project.details}
          className={project.media ? "pb-8 last:pb-0" : undefined}
        >
          <p>{project.description}</p>
          {project.media && <div className="pt-3">{project.media}</div>}
        </Item>
      ))}
    </Section>
  )

  return (
    <Shell>
      <Hero>
        I run many coding agents at once, and build the tools that make
        their work <span className="text-brand">safe to merge.</span>
      </Hero>

      <Link
        href="https://github.com/emilthaudal/prism"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl border border-border px-6 py-5 transition-colors hover:border-foreground/25"
      >
        <span>Prism, my desk for running many agents, is open source.</span>
        <span className="text-brand">
          See it on GitHub{" "}
          <span
            aria-hidden
            className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </Link>

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

      {/* EMI-492: ?layout=a|b|c shows a shorter Projects section for comparison;
          without it, and in the prerendered page, this is today's. */}
      <Suspense fallback={currentProjects}>
        <LayoutSwitch
          current={currentProjects}
          a={<ProjectsFeatureGrid />}
          b={<ProjectsStage />}
          c={<ProjectsShelf />}
        />
      </Suspense>

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
