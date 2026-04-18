"use client"

import { useEffect, useState, useRef } from "react"
import { Nav } from "@/components/nav"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Mail, ExternalLink, ChevronDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// ─── Brand icons (lucide removed Github) ─────────────────────────────────────

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

// ─── Typewriter hook ──────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 55, startDelay = 600) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(delay)
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const work = [
  {
    company: "Whiteaway",
    period: "2024 — now",
    role: "Backend Engineer",
    description:
      "Migrating the fulfillment pipeline off legacy Navision onto a cloud-native event-driven architecture. Replacing a monolithic ERP integration with domain-owned event streams and async processing.",
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
    name: "WoW Addons",
    description:
      "A collection of World of Warcraft addons — UI tweaks, cooldown tracking, and Resto Druid healing tooling. Lua-based and thoroughly over-engineered.",
    url: "https://github.com/emilthaudal",
    tags: ["Lua", "World of Warcraft"],
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function WorkCard({
  company,
  period,
  role,
  description,
}: (typeof work)[number]) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="group border-t border-border cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between py-5 gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="font-heading text-xl font-semibold">{company}</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {role}
            </span>
          </div>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              expanded ? "max-h-48 mt-3 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="text-sm text-muted-foreground leading-relaxed pr-8">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 pt-0.5">
          <span className="text-xs text-muted-foreground tabular-nums">
            {period}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </div>
      </div>
    </div>
  )
}

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

export default function Home() {
  const { displayed, done } = useTypewriter("Emil Thaudal Bønnerup")
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="min-h-screen flex flex-col justify-center px-6 max-w-4xl mx-auto pt-16">
          <div
            className={cn(
              "transition-opacity duration-700",
              heroVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Terminal-style prefix */}
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
              <span className="text-primary">›</span> thaudal.com
            </p>

            {/* Name — typewriter */}
            <h1 className="font-heading text-5xl sm:text-7xl font-semibold leading-tight tracking-tight mb-2 min-h-[1.2em]">
              {displayed}
              <span
                className={cn(
                  "inline-block w-0.5 h-[0.85em] bg-foreground ml-1 align-middle",
                  done ? "animate-pulse" : "opacity-100"
                )}
              />
            </h1>

            {/* Tagline */}
            <div
              className={cn(
                "transition-all duration-700 delay-200",
                done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              <p className="text-lg sm:text-xl text-muted-foreground mt-6 max-w-xl leading-relaxed">
                Backend engineer building event-driven systems, cloud migrations,
                and payment infrastructure.{" "}
                <span className="text-foreground">Based in Aalborg, Denmark.</span>
              </p>

              {/* Links */}
              <div className="flex items-center gap-4 mt-8">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="https://github.com/emilthaudal"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>


                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="mailto:emil@thaudal.com"
                      aria-label="Email"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>emil@thaudal.com</TooltipContent>
                </Tooltip>

                <Separator orientation="vertical" className="h-4" />

                <Link
                  href="#work"
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  See my work ↓
                </Link>
              </div>
            </div>
          </div>
        </section>

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
            Aalborg, Denmark
          </span>
        </div>
      </footer>
    </>
  )
}
