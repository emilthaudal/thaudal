"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// A muted, looping demo clip that loads and plays only while it is on screen,
// and not at all for people who ask for reduced motion (they get the poster).
export function LoopVideo({
  src,
  poster,
  label,
  width,
  height,
  className,
}: {
  src: string
  poster: string
  label: string
  width: number
  height: number
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src
          // Autoplay of a muted video can still be refused (low power mode);
          // the poster stays up then, which is fine.
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={ref}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className={cn("block h-auto w-full", className)}
    />
  )
}
