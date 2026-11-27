"use client"

import Image, { type StaticImageData } from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// A screenshot that opens large on click: the image lifts out of the page and
// settles centred over a dimmed backdrop. Closes on click, Escape or the back
// button, and hands focus back to the image. With reduced motion it only
// fades. Built on <dialog>, so focus stays inside while it is open.

export type Variant = {
  src: StaticImageData
  // Which theme shows this variant, such as "dark:hidden".
  className?: string
}

const ease = "cubic-bezier(0.2, 0.8, 0.2, 1)"
const openMs = 380
const closeMs = 260

// Inline images: the page is about 44rem wide.
const inlineSizes = "(min-width: 768px) 704px, 100vw"

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// The transform that puts the large box exactly over the thumbnail.
function fromThumb(thumb: Element | null, box: Element | null) {
  const t = thumb?.getBoundingClientRect()
  const b = box?.getBoundingClientRect()
  if (!t || !b || b.width === 0) return "none"
  return `translate(${t.left - b.left}px, ${t.top - b.top}px) scale(${t.width / b.width})`
}

export function ZoomImage({
  variants,
  alt,
  frame,
}: {
  variants: Variant[]
  alt: string
  frame: string
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  // The inline image the reader clicked, so the large view starts from its
  // pixels while the full-size file loads.
  const [placeholder, setPlaceholder] = useState<string>()
  const pushed = useRef(false)
  const closing = useRef(false)

  const { width, height } = variants[0].src

  const visibleThumb = () =>
    Array.from(buttonRef.current?.querySelectorAll("img") ?? []).find(
      (img) => img.offsetParent !== null,
    )

  const finish = useCallback(() => {
    dialogRef.current?.close()
    setOpen(false)
    closing.current = false
    if (buttonRef.current) buttonRef.current.style.visibility = ""
    buttonRef.current?.focus({ preventScroll: true })
  }, [])

  const animateClose = useCallback(() => {
    const dialog = dialogRef.current
    const box = boxRef.current
    if (!dialog?.open || !box || closing.current) return
    closing.current = true
    const timing = { duration: reduced() ? 150 : closeMs, easing: ease, fill: "forwards" as const }
    dialog.animate({ opacity: [1, 0] }, { ...timing, pseudoElement: "::backdrop" })
    const anim = reduced()
      ? box.animate({ opacity: [1, 0] }, timing)
      : box.animate({ transform: ["none", fromThumb(buttonRef.current, box)] }, timing)
    // Show the inline image again just before the box lands on it.
    if (!reduced()) {
      setTimeout(() => {
        if (buttonRef.current) buttonRef.current.style.visibility = ""
      }, closeMs - 20)
    }
    anim.onfinish = finish
  }, [finish])

  const close = useCallback(() => {
    // Opening added a history entry so back closes the view; take it off
    // again, and let the popstate handler run the animation.
    if (pushed.current && history.state?.lightbox) {
      history.back()
    } else {
      animateClose()
    }
  }, [animateClose])

  useEffect(() => {
    if (!open) return
    const onPop = () => {
      pushed.current = false
      animateClose()
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [open, animateClose])

  // Runs once the dialog content has rendered.
  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const box = boxRef.current
    if (!dialog || !box || dialog.open) return
    dialog.showModal()
    history.pushState({ lightbox: true }, "")
    pushed.current = true
    const timing = { duration: reduced() ? 150 : openMs, easing: ease }
    dialog.animate({ opacity: [0, 1] }, { ...timing, pseudoElement: "::backdrop" })
    if (reduced()) {
      box.animate({ opacity: [0, 1] }, timing)
    } else {
      box.animate({ transform: [fromThumb(buttonRef.current, box), "none"] }, timing)
      if (buttonRef.current) buttonRef.current.style.visibility = "hidden"
    }
  }, [open])

  const onOpen = () => {
    setPlaceholder(visibleThumb()?.currentSrc)
    setOpen(true)
  }

  return (
    <>
      <figure className={frame}>
        <button
          ref={buttonRef}
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          className="block w-full cursor-zoom-in"
        >
          {variants.map((v) => (
            <Image
              key={v.src.src}
              src={v.src}
              alt={alt}
              sizes={inlineSizes}
              quality={90}
              className={cn("block h-auto w-full", v.className)}
            />
          ))}
          <span className="sr-only">(enlarge)</span>
        </button>
      </figure>

      {open && (
        // A click anywhere closes, as a convenience; keyboard users have
        // Escape (the dialog's cancel) and the focused close button.
        // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <dialog
          ref={dialogRef}
          aria-label={alt}
          className="lightbox"
          onClick={close}
          onCancel={(e) => {
            e.preventDefault()
            close()
          }}
        >
          <div
            ref={boxRef}
            className="lightbox-box"
            style={{ aspectRatio: `${width} / ${height}`, "--ratio": width / height } as React.CSSProperties}
          >
            {placeholder && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={placeholder} alt="" className="absolute inset-0 h-full w-full" />
            )}
            {variants.map((v) => (
              <Image
                key={v.src.src}
                src={v.src}
                alt={alt}
                sizes="100vw"
                quality={90}
                className={cn("relative block h-full w-full", v.className)}
              />
            ))}
          </div>
          <button
            type="button"
            autoFocus
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
          >
            <span aria-hidden>×</span>
            <span className="sr-only">Close</span>
          </button>
        </dialog>
      )}
    </>
  )
}
