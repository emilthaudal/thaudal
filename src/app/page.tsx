import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { WorkCard } from "@/components/work-card"
import { ActivityGrid } from "@/components/github-activity"
import { GithubIcon } from "@/components/github-icon"
import { LinkedinIcon } from "@/components/linkedin-icon"
import { Badge } from "@/components/ui/badge"
import { Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
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

// ─── Components ───────────────────────────────────────────────────────────────
// Static markup — no client state needed, so these stay server-rendered.

function AgenticSection() {
  return (
    <div className="space-y-10">
      <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
        <p className="text-lg text-foreground">
          I work agent-first. I scope the work, agents implement it, and I
          spend my time on review and on the harness that makes their output
          safe to merge.
        </p>
        <p className="text-sm">
          Agents are only as good as the task they&apos;re given and the checks
          around them. So most of what I build is that layer: dependency-aware
          task breakdown, isolated worktrees, independent review, guardrails on
          dangerous commands, and evidence before anything is called done.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
        {agenticStats.map((stat) => (
          <div key={stat.label} className="bg-background p-5">
            <p className="font-heading text-3xl font-semibold tabular-nums">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {agenticWork.map((item) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-heading text-lg font-semibold">
                  {item.title}
                </span>
                {item.url && (
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </>
          )
          return item.url ? (
            <Link
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-border p-6 hover:border-foreground/30 transition-colors duration-200"
            >
              {body}
            </Link>
          ) : (
            <div key={item.title} className="border border-border p-6">
              {body}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StackSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Object.entries(stack).map(([category, items]) => (
        <div key={category}>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            {category}
          </p>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="text-xs font-normal"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({
  name,
  description,
  url,
  tags,
}: (typeof projects)[number]) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border p-6 hover:border-foreground/30 transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="font-heading text-lg font-semibold">{name}</span>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs font-normal">
            {tag}
          </Badge>
        ))}
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// Server Component: only the pieces that actually need interactivity (Hero's
// typewriter/reveal, WorkCard's expand toggle, the activity grid's tooltip,
// and Nav's theme/scroll state) ship as client JS. Everything else — the
// work list, stack badges, project cards, contact section — renders once on
// the server with no hydration cost.

export default async function Home() {
  const activity = await getGithubActivity()

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        <div className="max-w-4xl mx-auto px-6 space-y-24 pb-24">
          {/* ── Agentic engineering ── */}
          <section id="agentic">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Agentic engineering
            </p>
            <AgenticSection />
          </section>

          {/* ── Work ── */}
          <section id="work">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Work
            </p>
            <div>
              {work.map((job) => (
                <WorkCard key={job.company} {...job} />
              ))}
              <div className="border-t border-border" />
            </div>
          </section>

          {/* ── Stack ── */}
          <section id="stack">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Stack
            </p>
            <StackSection />
          </section>

          {/* ── Projects ── */}
          <section id="projects">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Projects
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
          </section>

          {/* ── Activity ── */}
          <section id="activity">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Activity
            </p>
            {activity ? (
              <ActivityGrid data={activity} />
            ) : (
              <p className="text-sm text-muted-foreground">
                Activity unavailable right now.
              </p>
            )}
          </section>

          {/* ── Contact ── */}
          <section id="contact">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Contact
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                I&apos;m always open to interesting conversations — about
                agentic engineering, distributed systems, side projects, or
                anything else.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <Link
                  href="mailto:emil@thaudal.com"
                  className="text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  emil@thaudal.com
                </Link>
                <Link
                  href="https://github.com/emilthaudal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  github.com/emilthaudal
                </Link>
                <Link
                  href="https://www.linkedin.com/in/emil-tb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  linkedin.com/in/emil-tb
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Emil Thaudal Bønnerup
          </span>
          <span className="text-xs text-muted-foreground">
            Ugelbølle, Denmark
          </span>
        </div>
      </footer>
    </>
  )
}
