"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// Prism's motion, filmed from the real Mac app at 2x while a script plays on
// the made-up README fixture: a report arrives, a decision opens, one key
// answers it. Under the film, one bar per moment; a bar fills while its moment
// plays, and a click on it jumps there. Loads and plays only while on screen,
// and not by itself for people who ask for reduced motion.

const width = 2640
const height = 1640
const length = 14.8

const film = {
  light: {
    src: "/projects/prism-demo.mp4",
    poster: "/projects/prism-demo-poster.webp",
  },
  dark: {
    src: "/projects/prism-demo-dark.mp4",
    poster: "/projects/prism-demo-dark-poster.webp",
  },
}

// Seconds into the film; each starts just before its change does.
const moments = [
  {
    at: 0,
    label: "Report",
    caption: "A background session reports back: the tests pass on Node 22.",
  },
  {
    at: 2.3,
    label: "Session lands",
    caption: "Its row in the sidebar settles from working to done.",
  },
  {
    at: 3.9,
    label: "Decision",
    caption:
      "The desk turns it into a decision, with the evidence and a recommendation.",
  },
  {
    at: 5.7,
    label: "Composer",
    caption: "The decision loads into the composer, an option on each number key.",
  },
  {
    at: 7.65,
    label: "Answer",
    caption: "One key answers. Five seconds to undo while the ring drains.",
  },
  {
    at: 12.65,
    label: "Sent",
    caption: "The answer goes out, the card leaves and the next decision loads.",
  },
]

const end = (i: number) => moments[i + 1]?.at ?? length

function load(video: HTMLVideoElement) {
  if (!video.getAttribute("src") && video.dataset.src) video.src = video.dataset.src
}

export function PrismDemo({
  alt,
  className,
  frame,
  compact,
}: {
  alt: string
  className?: string
  // Half width: the bars stay, their labels are for screen readers only.
  compact?: boolean
  // The classes of the frame around the film.
  frame: string
}) {
  const lightRef = useRef<HTMLVideoElement>(null)
  const darkRef = useRef<HTMLVideoElement>(null)
  const fills = useRef<(HTMLSpanElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  // Paused by the reader, so scrolling back does not start it again.
  const held = useRef(false)

  // The film of the current theme; the other one is display:none.
  const shown = () =>
    [lightRef.current, darkRef.current].find(
      (v) => v !== null && v.offsetParent !== null,
    ) ?? null

  useEffect(() => {
    const light = lightRef.current
    const dark = darkRef.current
    if (!light || !dark) return
    const videos = [light, dark]
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const paint = (t: number) => {
      let now = 0
      moments.forEach((m, i) => {
        if (t >= m.at) now = i
      })
      setActive(now)
      fills.current.forEach((fill, i) => {
        if (!fill) return
        const share =
          i < now ? 1 : i > now ? 0 : (t - moments[i].at) / (end(i) - moments[i].at)
        fill.style.transform = `scaleX(${Math.min(1, Math.max(0, share))})`
      })
    }

    let raf = 0
    const tick = () => {
      const video = videos.find((v) => !v.paused)
      if (!video) return
      paint(video.currentTime)
      raf = requestAnimationFrame(tick)
    }
    const onPlay = () => {
      setPlaying(true)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }
    const onPause = () => setPlaying(videos.some((v) => !v.paused))
    const onSeeked = (e: Event) => paint((e.target as HTMLVideoElement).currentTime)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement
          if (!entry.isIntersecting) {
            video.pause()
          } else if (!reduced && !held.current) {
            load(video)
            // Autoplay of a muted video can still be refused (low power
            // mode); the poster stays up then, which is fine.
            video.play().catch(() => {})
          }
        }
      },
      { rootMargin: "200px 0px" },
    )
    for (const video of videos) {
      video.addEventListener("play", onPlay)
      video.addEventListener("pause", onPause)
      video.addEventListener("seeked", onSeeked)
      observer.observe(video)
    }
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      for (const video of videos) {
        video.removeEventListener("play", onPlay)
        video.removeEventListener("pause", onPause)
        video.removeEventListener("seeked", onSeeked)
      }
    }
  }, [lightRef, darkRef])

  const jump = (i: number) => {
    const video = shown()
    if (!video) return
    load(video)
    const go = () => {
      video.currentTime = moments[i].at
      // With reduced motion a jump shows that moment's first frame and waits.
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        held.current = false
        video.play().catch(() => {})
      }
    }
    if (video.readyState >= 1) go()
    else video.addEventListener("loadedmetadata", go, { once: true })
  }

  const toggle = () => {
    const video = shown()
    if (!video) return
    if (video.paused) {
      held.current = false
      load(video)
      video.play().catch(() => {})
    } else {
      held.current = true
      video.pause()
    }
  }

  // On a phone the film's text is too small to read, so it opens full screen.
  const enlarge = () => {
    const video = shown() as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null
    if (!video) return
    load(video)
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {})
    else video.webkitEnterFullscreen?.()
    held.current = false
    video.play().catch(() => {})
  }

  const shared = {
    width,
    height,
    "aria-label": alt,
    loop: true,
    playsInline: true,
    preload: "none",
  } as const

  return (
    <figure className={className}>
      <div className={frame}>
        <video
          ref={lightRef}
          data-src={film.light.src}
          poster={film.light.poster}
          className="block h-auto w-full dark:hidden"
          muted
          {...shared}
        />
        <video
          ref={darkRef}
          data-src={film.dark.src}
          poster={film.dark.poster}
          className="hidden h-auto w-full dark:block"
          muted
          {...shared}
        />
      </div>

      <figcaption className={cn("mt-3", !compact && "sm:min-h-[4.75rem]")}>
        <ol className="grid grid-cols-6 gap-1.5">
          {moments.map((m, i) => (
            <li key={m.label}>
              <button
                type="button"
                onClick={() => jump(i)}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "group block w-full pt-2 pb-1 text-left text-sm transition-colors",
                  i === active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="block h-0.5 overflow-hidden rounded-full bg-foreground/15 transition-colors group-hover:bg-foreground/30">
                  <span
                    ref={(el) => {
                      fills.current[i] = el
                    }}
                    className="block h-full origin-left scale-x-0 bg-foreground"
                  />
                </span>
                <span className={cn("mt-2 block", compact ? "sr-only" : "max-sm:sr-only")}>
                  {m.label}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-1 flex items-baseline justify-between gap-6 text-sm text-muted-foreground">
          <p>{moments[active].caption}</p>
          <button
            type="button"
            onClick={enlarge}
            className="shrink-0 transition-colors hover:text-foreground sm:hidden"
          >
            Full screen
          </button>
          <button
            type="button"
            onClick={toggle}
            className="shrink-0 transition-colors hover:text-foreground"
          >
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </figcaption>
    </figure>
  )
}
