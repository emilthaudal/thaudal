import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { WorkCard } from "@/components/work-card"
import { ActivityGrid } from "@/components/github-activity"
import { GithubIcon } from "@/components/github-icon"
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
      "Migrating the fulfillment pipeline off legacy Navision onto a cloud-native event-driven architecture, split across several 2-3 person teams. Working with our architect and project owner to break business capabilities into scoped team work, and rolling out agentic development (Claude Code) across the engineering department.",
  },
  {
    company: "Lunar",
    period: "2022 — 2024",
    role: "Backend Engineer",
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

const stack = {
  Languages: ["Java", "Go", "C#", "TypeScript", "Swift"],
  Patterns: [
    "Event Sourcing",
    "CQRS",
    "Event-Driven Architecture",
    "Domain-Driven Design",
  ],
  "Cloud / Infra": ["Azure", "Docker", "SharePoint", "Distributed Systems"],
}

const projects = [
  {
    name: "Relay",
    description:
      "iOS workout sync hub that deduplicates and syncs workouts across HealthKit, Strava and Intervals.icu. Built in Swift.",
    url: "https://github.com/emilthaudal/Relay",
    tags: ["Swift", "iOS", "HealthKit"],
  },
  {
    name: "Drivetrain",
    description:
      "Bicycle maintenance and component wear tracker. Logs service intervals, mileage, and part replacement schedules so nothing on the bike is a surprise. Built in Rust.",
    url: "https://github.com/emilthaudal/drivetrain",
    tags: ["Rust", "Clerk", "sqlx"],
  },
]

// ─── Components ───────────────────────────────────────────────────────────────
// Static markup — no client state needed, so these stay server-rendered.

function StackSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
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
                distributed systems, side projects, or anything else.
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
