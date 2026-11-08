"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  character,
  days,
  finale,
  hero,
  levelTrack,
  shotCount,
  type Entry,
  type Shot,
} from "@/data/wow-forever"
import s from "./journal.module.css"

const src = (file: string) => `/wow/forever/${file}`

type ViewerItem = Shot & { title: string; meta: string }

// Every clickable shot in page order, so the viewer can step through them.
const viewerItems: ViewerItem[] = [
  ...days.flatMap((d) =>
    d.entries.flatMap((e) =>
      e.shots.map((shot) => ({
        ...shot,
        title: e.title,
        meta: `${e.time} · ${e.place}`,
      }))
    )
  ),
  {
    ...finale.shot,
    title: finale.title,
    meta: `${finale.eyebrow} · ${finale.place}`,
  },
]
const indexOf = (file: string) => viewerItems.findIndex((v) => v.file === file)

function ShotButton({
  shot,
  sizes,
  onOpen,
}: {
  shot: Shot
  sizes: string
  onOpen: (i: number) => void
}) {
  return (
    <button
      type="button"
      className={s.shot}
      onClick={() => onOpen(indexOf(shot.file))}
      aria-label={`Open screenshot: ${shot.alt}`}
    >
      <Image src={src(shot.file)} alt={shot.alt} fill sizes={sizes} />
    </button>
  )
}

function EntryView({
  entry,
  onOpen,
}: {
  entry: Entry
  onOpen: (i: number) => void
}) {
  const isPair = entry.shots.length > 1
  const layout = isPair ? s.pair : entry.flip ? s.flip : ""
  const sizes = isPair
    ? "(max-width: 820px) 100vw, 420px"
    : "(max-width: 820px) 100vw, 780px"
  return (
    <article className={`${s.entry} ${layout}`}>
      {entry.shots.map((shot) => (
        <ShotButton key={shot.file} shot={shot} sizes={sizes} onOpen={onOpen} />
      ))}
      <div className={s.note}>
        <time className={s.time}>{entry.time}</time>
        <h3 className={s.noteTitle}>{entry.title}</h3>
        <span className={s.place}>{entry.place}</span>
        {entry.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {entry.quote && (
          <blockquote className={s.quote}>
            &ldquo;{entry.quote.text}&rdquo;
            <footer>{entry.quote.by}</footer>
          </blockquote>
        )}
        {entry.chips && (
          <div className={s.chips}>
            {entry.chips.map((c) => (
              <span
                key={c.label}
                className={`${s.chip} ${c.tone ? s[c.tone] : ""}`}
              >
                {c.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function Viewer({
  index,
  onClose,
  onStep,
}: {
  index: number
  onClose: () => void
  onStep: (delta: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const item = viewerItems[index]

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") onStep(-1)
      else if (e.key === "ArrowRight") onStep(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, onStep])

  return (
    <div
      className={s.viewer}
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className={s.viewerStage}>
        <span className={s.vcount}>
          {index + 1} / {viewerItems.length}
        </span>
        <Image
          key={item.file}
          src={src(item.file)}
          alt={item.alt}
          fill
          sizes="100vw"
        />
        <button
          type="button"
          className={`${s.vbtn} ${s.vprev}`}
          onClick={() => onStep(-1)}
          aria-label="Previous screenshot"
        >
          ‹
        </button>
        <button
          type="button"
          className={`${s.vbtn} ${s.vnext}`}
          onClick={() => onStep(1)}
          aria-label="Next screenshot"
        >
          ›
        </button>
        <button
          ref={closeRef}
          type="button"
          className={`${s.vbtn} ${s.vclose}`}
          onClick={onClose}
          aria-label="Close viewer"
        >
          ✕
        </button>
      </div>
      <div className={s.viewerCap}>
        <strong>{item.title}</strong>
        <span>{item.meta}</span>
      </div>
    </div>
  )
}

export function Journal({ fontClassName }: { fontClassName: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + viewerItems.length) % viewerItems.length
      ),
    []
  )

  const levels = Array.from(
    { length: levelTrack.to - levelTrack.from + 1 },
    (_, i) => levelTrack.from + i
  )
  const fill = (lvl: number) =>
    lvl === levelTrack.from
      ? levelTrack.fromPct
      : lvl === levelTrack.to
        ? levelTrack.toPct
        : 100

  return (
    <div className={`${s.root} ${fontClassName}`}>
      <div className={s.topbar}>
        <div className={s.wrap}>
          <Link href="/">← thaudal.com</Link>
        </div>
      </div>

      <header className={s.hero}>
        <Image
          className={s.heroImg}
          src={src(hero.file)}
          alt={hero.alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
        <div className={s.fog} />
        <div className={`${s.wrap} ${s.heroInner}`}>
          <div className={s.eyebrow}>WoW Forever · a field journal</div>
          <h1 className={s.title}>
            The road from <em>fog</em> to open sea
          </h1>
          <p className={s.lede}>
            Three days in the life of {character.name}, {character.className},
            kept in screenshots. Rain in Hillsbrad, lanterns in Duskwood, a
            campfire crowd in Lakeshire, and a ship on the horizon.
          </p>
        </div>
      </header>

      <main>
        <div className={s.wrap}>
          <dl className={s.ledger}>
            <div>
              <dt>Level</dt>
              <dd>
                {character.levelFrom}
                <span className={s.arrow}>→</span>
                {character.levelTo}
              </dd>
            </div>
            <div>
              <dt>Screenshots</dt>
              <dd>
                {shotCount} <small>in {days.length + 1} days</small>
              </dd>
            </div>
            <div>
              <dt>/played</dt>
              <dd>
                {character.played} <small>by {character.playedAt}</small>
              </dd>
            </div>
            <div>
              <dt>Companions</dt>
              <dd>
                {character.companions.length}{" "}
                <small>{character.companions.join(", ")}</small>
              </dd>
            </div>
          </dl>

          <section className={s.track} aria-label="Level progress">
            <h2 className={s.trackLabel}>Levels seen in the screenshots</h2>
            <div className={s.bars}>
              {levels.map((lvl) => (
                <div key={lvl} className={s.bar}>
                  <i style={{ width: `${fill(lvl)}%` }} />
                </div>
              ))}
            </div>
            <div className={s.barLabels}>
              {levels.map((lvl) => (
                <span key={lvl}>{lvl}</span>
              ))}
            </div>
            <p className={s.trackNote}>
              Level 19 at 97.2% in Moonbrook on Friday evening. Level 28 at 4.0%
              in Silverpine late on Saturday.
            </p>
          </section>

          <nav className={s.chaptersNav} aria-label="Chapters">
            <a href="#day-1">I · Friday, rain &amp; ruins</a>
            <a href="#day-2">II · Saturday, the long night</a>
            <a href={`#${finale.id}`}>III · Sunday, at sea</a>
          </nav>

          {days.map((day) => (
            <section key={day.id} id={day.id} className={s.chapter}>
              <div className={s.chapterHead}>
                <div className={s.dayNum}>{day.numeral}</div>
                <div>
                  <h2 className={s.chapterTitle}>{day.title}</h2>
                  <div className={s.chapterMeta}>{day.meta}</div>
                </div>
              </div>
              <div className={s.entries}>
                {day.entries.map((entry) => (
                  <EntryView
                    key={entry.shots[0].file}
                    entry={entry}
                    onOpen={setOpen}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section id={finale.id} className={s.finale}>
          <ShotButton shot={finale.shot} sizes="100vw" onOpen={setOpen} />
          <div className={`${s.wrap} ${s.finaleText}`}>
            <div>
              <div className={s.eyebrow}>{finale.eyebrow}</div>
              <h2 className={s.finaleTitle}>{finale.title}</h2>
            </div>
            <div>
              {finale.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          Screenshots by {character.name} · World of Warcraft, Forever ·{" "}
          <Link href="/">thaudal.com</Link>
        </div>
      </footer>

      {open !== null && <Viewer index={open} onClose={close} onStep={step} />}
    </div>
  )
}
