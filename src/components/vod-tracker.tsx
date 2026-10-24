"use client"

import { useState, useSyncExternalStore } from "react"
import { Muted, Section, textLink } from "@/components/section"
import { cn } from "@/lib/utils"

// Shape of src/data/worlds-2026.json. A game is only listed once it has been
// played; its startUtc is when the game itself started, not the match slot.
export type Game = { n: number; startUtc: string }
export type Match = {
  id: string
  a: string
  b: string
  format: string
  round?: string
  startUtc?: string
  games: Game[]
}
// Twitch and YouTube VOD ids for Caedrel's stream that day. YouTube splits
// streams over 12 hours into parts, each with its own start time.
export type Stream = {
  startUtc?: string
  twitch?: string
  youtube?: string
  youtubeParts?: { id: string; startUtc: string }[]
}
export type Day = {
  id: string
  label: string
  stage: string
  startUtc: string
  note?: string
  stream: Stream
  matches: Match[]
}
export type Schedule = { updatedAt: string; days: Day[] }

type Source = "twitch" | "youtube"
type Prefs = { seen: Record<string, boolean>; src: Source; showAll: boolean }

// Links open this many seconds before a game starts, so the draft isn't cut off.
const LEAD = 90

// What each visitor has watched lives in their own browser, nowhere else.
const KEY = "worlds-2026-vods"
const DEFAULT_PREFS: Prefs = { seen: {}, src: "twitch", showAll: false }
const listeners = new Set<() => void>()
let cachedPrefs: Prefs | null = null

function readPrefs(): Prefs {
  if (cachedPrefs) return cachedPrefs
  let prefs = DEFAULT_PREFS
  try {
    prefs = { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") }
  } catch {
    // Storage blocked or corrupt: start fresh.
  }
  cachedPrefs = prefs
  return prefs
}

function writePrefs(next: Prefs) {
  cachedPrefs = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage blocked: keep the marks for this visit only.
  }
  listeners.forEach((l) => l())
}

function subscribePrefs(listener: () => void) {
  listeners.add(listener)
  // Keep other open tabs in step.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return
    cachedPrefs = null
    listener()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

// The current time, ticking once a minute, for the "Watch live" link.
let cachedNow = 0
function readNow() {
  if (!cachedNow) cachedNow = Date.now()
  return cachedNow
}
function subscribeNow(listener: () => void) {
  const timer = setInterval(() => {
    cachedNow = 0
    listener()
  }, 60_000)
  return () => clearInterval(timer)
}

const fmtDay = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" })
const fmtTime = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" })

function maxGames(format: string) {
  const m = /bo(\d)/i.exec(format)
  return m ? Number(m[1]) : 1
}

function gameKey(m: Match, n: number) {
  return `${m.id}-g${n}`
}

function hasVod(d: Day) {
  return Boolean(d.stream.twitch || ytParts(d.stream).length)
}

function ytParts(s: Stream) {
  if (s.youtubeParts?.length) return s.youtubeParts
  return s.youtube && s.startUtc ? [{ id: s.youtube, startUtc: s.startUtc }] : []
}

// Seconds into the day's stream where a game starts.
function gameOffset(d: Day, g: Game | undefined) {
  if (!g || !d.stream.startUtc) return null
  const off = (Date.parse(g.startUtc) - Date.parse(d.stream.startUtc)) / 1000
  return off >= 0 ? off : null
}

// Offset for any game slot of a match, including series games that were never
// played, so a missing link can't give away how a series ended. Those point at
// the next match, or 45 minutes after the last played game.
function slotOffset(d: Day, mi: number, n: number) {
  const m = d.matches[mi]
  const own = gameOffset(d, m.games.find((g) => g.n === n))
  if (own != null) return own
  const played = m.games.filter((g) => g.n < n && gameOffset(d, g) != null)
  if (!played.length) return null
  for (const later of d.matches.slice(mi + 1)) {
    const offs = later.games.map((g) => gameOffset(d, g)).filter((o): o is number => o != null)
    if (offs.length) return Math.min(...offs)
  }
  return gameOffset(d, played[played.length - 1])! + 45 * 60
}

function vodUrl(d: Day, offset: number, preferred: Source) {
  const s = d.stream
  const parts = ytParts(s)
  const src = preferred === "youtube" && parts.length ? "youtube" : s.twitch ? "twitch" : parts.length ? "youtube" : null
  if (!src) return null
  let t = Math.max(0, Math.round(offset - LEAD))
  if (src === "twitch") {
    const h = Math.floor(t / 3600)
    const m = Math.floor((t % 3600) / 60)
    return `https://www.twitch.tv/videos/${s.twitch}?t=${h}h${m}m${t % 60}s`
  }
  let part = parts[0]
  if (parts.length > 1 && s.startUtc) {
    const at = Date.parse(s.startUtc) + t * 1000
    for (const p of parts) if (Date.parse(p.startUtc) <= at) part = p
    t = Math.max(0, Math.round((at - Date.parse(part.startUtc)) / 1000))
  }
  return `https://www.youtube.com/watch?v=${part.id}&t=${t}s`
}

function dayLabel(d: Day) {
  const name = /^Day \d/.test(d.label) ? `${d.stage}, ${d.label}` : d.label
  return `${fmtDay.format(new Date(d.startUtc))} · ${name}`
}

function Teams({ m }: { m: Match }) {
  return (
    <>
      {m.a} <Muted>vs</Muted> {m.b}
    </>
  )
}

// A ring that fills in with the brand colour once the game is watched.
function WatchedToggle({ seen, label, onClick }: { seen: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={seen}
      aria-label={`${seen ? "Unmark" : "Mark"} ${label} as watched`}
      title={seen ? "Watched" : "Mark as watched"}
      onClick={onClick}
      className={cn(
        "grid size-[1.125rem] shrink-0 place-items-center rounded-full border-[1.5px] transition-colors",
        seen ? "border-brand bg-brand text-background" : "border-muted-foreground/50 hover:border-foreground"
      )}
    >
      {seen && (
        <svg viewBox="0 0 12 12" aria-hidden className="size-2.5">
          <path d="M2.5 6.2l2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

function Choice({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn("transition-colors", pressed ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
    >
      {children}
    </button>
  )
}

export function VodTracker({ schedule }: { schedule: Schedule }) {
  const prefs = useSyncExternalStore(subscribePrefs, readPrefs, () => null)
  const now = useSyncExternalStore(subscribeNow, readNow, () => 0)
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  // Nothing renders on the server: which teams are safe to show depends on
  // what this browser has already watched.
  if (!prefs) return <p className="text-muted-foreground">Loading games…</p>

  const { days } = schedule
  const slots = days.flatMap((d, di) =>
    d.matches.flatMap((m, mi) =>
      Array.from({ length: maxGames(m.format) }, (_, i) => ({
        d,
        di,
        m,
        mi,
        n: i + 1,
        k: gameKey(m, i + 1),
        live: hasVod(d) && m.games.length > 0,
      }))
    )
  )
  const live = slots.filter((s) => s.live)
  const watched = live.filter((s) => prefs.seen[s.k]).length
  const next = live.find((s) => !prefs.seen[s.k])
  const nextUrl = next && slotOffset(next.d, next.mi, next.n) != null ? vodUrl(next.d, slotOffset(next.d, next.mi, next.n)!, prefs.src) : null

  // A later day's matchups give away earlier results, so they stay hidden
  // until every earlier game with a VOD is watched.
  const hidden = (di: number, m: Match) =>
    !prefs.showAll && !revealed[m.id] && live.some((s) => s.di < di && !prefs.seen[s.k])

  const toggle = (k: string) => {
    const seen = { ...prefs.seen }
    if (seen[k]) delete seen[k]
    else seen[k] = true
    writePrefs({ ...prefs, seen })
  }

  return (
    <>
      <p className="text-muted-foreground">
        Every game opens Caedrel&apos;s co-stream a minute and a half before it
        starts. Tick the circle next to a game once you&apos;ve seen it; later
        matchups stay hidden until you&apos;ve watched the games before them.
        What you&apos;ve watched is saved in this browser only.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
        <span>
          {watched} of {live.length} games watched
        </span>
        <span className="text-muted-foreground">
          Open on{" "}
          <Choice pressed={prefs.src === "twitch"} onClick={() => writePrefs({ ...prefs, src: "twitch" })}>
            Twitch
          </Choice>{" "}
          ·{" "}
          <Choice pressed={prefs.src === "youtube"} onClick={() => writePrefs({ ...prefs, src: "youtube" })}>
            YouTube
          </Choice>
        </span>
        <label className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground">
          <input
            type="checkbox"
            className="size-4 accent-brand"
            checked={prefs.showAll}
            onChange={(e) => writePrefs({ ...prefs, showAll: e.target.checked })}
          />
          Show all matchups
        </label>
      </div>

      {next ? (
        <Section label="Up next" className="mt-16">
          <div>
            <p>
              <Teams m={next.m} />
            </p>
            <p className="text-base text-muted-foreground">
              Game {next.n}
              {maxGames(next.m.format) > 1 && ` of the ${next.m.format}`} · {fmtDay.format(new Date(next.d.startUtc))}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-6">
              {nextUrl && (
                <a href={nextUrl} target="_blank" rel="noopener noreferrer" className={cn(textLink, "text-brand")}>
                  Watch game {next.n}
                </a>
              )}
              <button type="button" onClick={() => toggle(next.k)} className={textLink}>
                Mark as watched
              </button>
            </p>
          </div>
        </Section>
      ) : (
        live.length > 0 && (
          <Section label="Up next" className="mt-16">
            <p className="text-muted-foreground">
              All caught up. New games show up here the morning after they&apos;re played.
            </p>
          </Section>
        )
      )}

      {days.map((d, di) => (
        <Section key={d.id} label={dayLabel(d)} className="mt-16">
          {d.note && <p className="text-muted-foreground">{d.note}</p>}
          {!d.matches.length && <p className="text-muted-foreground">Matchups not announced yet.</p>}
          {d.matches.map((m, mi) => {
            const start = m.startUtc ? Date.parse(m.startUtc) : null
            const onAir = !m.games.length && start != null && now > start - 3600_000 && now < start + 6 * 3600_000
            return (
              <div key={m.id} className="pt-4 first:pt-0">
                <p>
                  {hidden(di, m) ? (
                    <>
                      <Muted>Teams hidden</Muted>{" "}
                      <button
                        type="button"
                        onClick={() => setRevealed({ ...revealed, [m.id]: true })}
                        className={cn(textLink, "text-muted-foreground")}
                      >
                        show
                      </button>
                    </>
                  ) : (
                    <Teams m={m} />
                  )}
                </p>
                <p className="text-base text-muted-foreground">
                  {[start != null && fmtTime.format(start), m.format, m.round].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-2 flex flex-wrap gap-x-7 gap-y-2">
                  {onAir && (
                    <a
                      href="https://www.twitch.tv/caedrel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(textLink, "text-brand")}
                    >
                      Watch live
                    </a>
                  )}
                  {Array.from({ length: maxGames(m.format) }, (_, i) => {
                    const n = i + 1
                    const k = gameKey(m, n)
                    const seen = Boolean(prefs.seen[k])
                    const off = hasVod(d) ? slotOffset(d, mi, n) : null
                    const url = off != null ? vodUrl(d, off, prefs.src) : null
                    if (!url) return <Muted key={n}>Game {n}</Muted>
                    return (
                      <span key={n} className="inline-flex items-center gap-2">
                        <WatchedToggle seen={seen} label={`game ${n}`} onClick={() => toggle(k)} />
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(textLink, seen && "text-muted-foreground")}
                        >
                          Game {n}
                        </a>
                      </span>
                    )
                  })}
                </p>
              </div>
            )
          })}
        </Section>
      ))}

      <p className="mt-16 text-base text-muted-foreground">
        Schedule last updated {fmtDay.format(new Date(schedule.updatedAt))}, {fmtTime.format(new Date(schedule.updatedAt))}.
      </p>
    </>
  )
}
