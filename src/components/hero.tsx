import Link from "next/link"
import { textLink } from "@/components/section"

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-40 pb-28 sm:pt-48 animate-in fade-in duration-1000">
      <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
        Emil Thaudal Bønnerup
      </h1>
      <p className="mt-8 max-w-2xl text-xl leading-snug text-foreground/80 sm:text-2xl">
        Tech lead building event-driven backends, and the agent tooling that
        ships them safely.
      </p>
      <p className="mt-4 text-muted-foreground">
        I work agent-first with Claude Code. Based in Ugelbølle, Denmark.
      </p>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href="#agentic" className={textLink}>
          How I work ↓
        </Link>
        <Link
          href="https://github.com/emilthaudal"
          target="_blank"
          rel="noopener noreferrer"
          className={textLink}
        >
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/emil-tb"
          target="_blank"
          rel="noopener noreferrer"
          className={textLink}
        >
          LinkedIn
        </Link>
        <Link href="mailto:emil@thaudal.com" className={textLink}>
          Email
        </Link>
      </div>
    </section>
  )
}
