import type { Metadata } from "next"
import { Hero, Shell } from "@/components/section"
import { VodTracker, type Schedule } from "@/components/vod-tracker"
import schedule from "@/data/worlds-2026.json"

export const metadata: Metadata = {
  title: "Worlds 2026 VODs — Emil Thaudal Bønnerup",
  description: "Every Worlds 2026 game in Caedrel's co-stream, without spoilers.",
}

// src/data/worlds-2026.json is updated by a daily Claude Code task that
// commits straight to main.
export default function VodsPage() {
  return (
    <Shell>
      <Hero>
        Worlds 2026, game by game with <span className="text-brand">Caedrel.</span>
      </Hero>
      <VodTracker schedule={schedule as Schedule} />
    </Shell>
  )
}
