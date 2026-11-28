// The words for each project, shared by every layout of the home page's
// Projects section. All screens are captured from fixture or demo data, never
// from real accounts.

export type ProjectInfo = {
  name: string
  details: string
  description: string
  url?: string
  // What the project's picture or clip shows.
  alt?: string
}

export const projectInfo = {
  claims: {
    name: "Claims platform",
    details: "Rust, React, Postgres, AWS",
    description:
      "Claims and returns for webshops, from the customer's first message to the refund. A claim form on the shop's own site, a workspace where agents work each case with one thread per party, a warehouse screen for returns, rules that handle the routine cases, and an MCP server so AI agents can work cases with a person approving every change. API first: the workspace uses only the public API.",
    url: "https://site-staging-46a8.up.railway.app",
    alt: "A warranty claim for a leaking dishwasher in the agent workspace: the claimed item and order on the left, the customer's thread in the middle, and the next steps the workflow allows on the right.",
  },
  prism: {
    name: "Prism",
    details: "Go, Swift, macOS",
    description:
      "A desk for running many Claude Code sessions without reading their scrollback. One agent starts sessions in the background and watches them; what reaches me is a question with options, the evidence and a recommendation. A native Mac app and a terminal UI.",
    url: "https://github.com/emilthaudal/prism",
    alt: "Prism on macOS: sessions on the left, the conversation with the desk in the middle, and the board of decisions on the right.",
  },
  meridian: {
    name: "Meridian",
    details: "Swift, SwiftUI, macOS",
    description:
      "My workday in one native Mac window: calendar, reminders, code reviews and what my agents are waiting on, ranked so the next thing is obvious. Free gaps in the day suggest what fits in them.",
    alt: "Meridian: the next thing to do, a ranked list of what waits on me, and today's calendar with free slots.",
  },
  drivetrain: {
    name: "Drivetrain",
    details: "Rust, Next.js, Railway",
    description:
      "Bicycle component wear tracker. Imports rides from Intervals.icu, adjusts wear for the weather, and warns before a part is worn out.",
    url: "https://drivetrain.thaudal.com",
    alt: "Drivetrain's dashboard with upcoming maintenance, then the gravel bike's component wear, where the chain is close to its limit.",
  },
  hammi: {
    name: "Hammi",
    details: "Rust, React, PWA",
    description:
      "A Tamagotchi-style pet hamster I built for my wife in a week. It hatches, grows up over four days and gets hungry and sleepy in real time. Gentle by design: neglect only makes it sad.",
    url: "https://github.com/emilthaudal/hammi",
    alt: "Hammi hatching from its egg, eating seeds and getting a cuddle.",
  },
  mods: {
    name: "Claude Code mods",
    details: "TypeScript, Claude Code hooks",
    description:
      "My public Claude Code plugins: a live progress band for long and multi-agent runs, a readable transcript, and per-repo GitHub accounts.",
    url: "https://github.com/emilthaudal/claude-plugins",
    alt: "A Claude Code reply drawn as styled Markdown with a code block, a table and a quote, and the live band below it timing a running command.",
  },
  relay: {
    name: "Relay",
    details: "Swift, iOS, HealthKit",
    description:
      "Syncs workouts across HealthKit, Strava and Intervals.icu, deduplicating as it goes.",
    url: "https://github.com/emilthaudal/Relay",
    alt: "Relay's workout list: rides, runs and a swim by month, each with a badge for whether it has synced.",
  },
} satisfies Record<string, ProjectInfo>

export const prismTuiAlt = "The same desk in the terminal UI."
