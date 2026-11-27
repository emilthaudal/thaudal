import Image, { type StaticImageData } from "next/image"
import { cn } from "@/lib/utils"
import { LoopVideo } from "@/components/loop-video"

// Project media: real screens of each project, all captured from fixture or
// demo data. The one place the site draws a frame, because a screenshot on the
// page background needs an edge.

const frame =
  "overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 shadow-[0_1px_2px_oklch(0_0_0/0.06),0_8px_24px_-12px_oklch(0_0_0/0.18)]"

// The page is about 44rem wide; images never render wider than that.
const sizes = "(min-width: 768px) 704px, 100vw"

// A screenshot with a light and a dark version, following the OS theme. The
// hidden one is display:none, so the browser never fetches it.
export function ThemedShot({
  light,
  dark,
  alt,
  className,
}: {
  light: StaticImageData
  dark: StaticImageData
  alt: string
  className?: string
}) {
  return (
    <figure className={cn(frame, className)}>
      <Image src={light} alt={alt} sizes={sizes} className="block h-auto w-full dark:hidden" />
      <Image src={dark} alt={alt} sizes={sizes} className="hidden h-auto w-full dark:block" />
    </figure>
  )
}

export function Shot({
  src,
  alt,
  className,
}: {
  src: StaticImageData
  alt: string
  className?: string
}) {
  return (
    <figure className={cn(frame, className)}>
      <Image src={src} alt={alt} sizes={sizes} className="block h-auto w-full" />
    </figure>
  )
}

// A short muted loop. Plays only while on screen. With a dark version, each
// theme gets its own; the hidden one never intersects, so it never loads.
export function Clip({
  src,
  poster,
  dark,
  alt,
  width,
  height,
  className,
}: {
  src: string
  poster: string
  dark?: { src: string; poster: string }
  alt: string
  width: number
  height: number
  className?: string
}) {
  const props = { label: alt, width, height }
  return (
    <figure className={cn(frame, className)}>
      {dark ? (
        <>
          <LoopVideo src={src} poster={poster} className="dark:hidden" {...props} />
          <LoopVideo
            src={dark.src}
            poster={dark.poster}
            className="hidden dark:block"
            {...props}
          />
        </>
      ) : (
        <LoopVideo src={src} poster={poster} {...props} />
      )}
    </figure>
  )
}
