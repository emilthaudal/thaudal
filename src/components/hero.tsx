"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { GithubIcon } from "@/components/github-icon"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

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

export function Hero() {
  const { displayed, done } = useTypewriter("Emil Thaudal Bønnerup")
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
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
            <span className="text-foreground">Based in Ugelbølle, Denmark.</span>
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
  )
}
