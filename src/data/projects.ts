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
  },
  relay: {
    name: "Relay",
    details: "Swift, iOS, HealthKit",
    description:
      "Syncs workouts across HealthKit, Strava and Intervals.icu, deduplicating as it goes.",
    url: "https://github.com/emilthaudal/Relay",
  },
} satisfies Record<string, ProjectInfo>

export const prismTuiAlt = "The same desk in the terminal UI."
