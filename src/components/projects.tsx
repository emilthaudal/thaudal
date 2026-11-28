import { Item, Section } from "@/components/section"
import { Clip, Shot, ThemedShot, frame } from "@/components/media"
import { PrismDemo } from "@/components/prism-demo"
import { cn } from "@/lib/utils"
import { projectInfo, prismTuiAlt, type ProjectInfo } from "@/data/projects"
import prismTui from "@/assets/projects/prism-tui.webp"
import meridianLight from "@/assets/projects/meridian-focus-light.webp"
import meridianDark from "@/assets/projects/meridian-focus-dark.webp"

const { prism, meridian, drivetrain, hammi, mods, relay } = projectInfo

// Each project's media, sized by the class it is given: "w-full" to fill the
// width, or "h-full" plus its own aspect ratio to fit a height.
const media = {
  prism: (className?: string) => (
    <PrismDemo
      alt={prism.alt}
      className={className}
      frame={cn(frame, "sm:rounded-2xl")}
    />
  ),
  tui: (className?: string) => (
    <Shot src={prismTui} alt={prismTuiAlt} className={className} />
  ),
  meridian: (className?: string) => (
    <ThemedShot
      light={meridianLight}
      dark={meridianDark}
      alt={meridian.alt}
      className={className}
    />
  ),
  drivetrain: (className?: string) => (
    <Clip
      src="/projects/drivetrain.mp4"
      poster="/projects/drivetrain-poster.webp"
      dark={{
        src: "/projects/drivetrain-dark.mp4",
        poster: "/projects/drivetrain-dark-poster.webp",
      }}
      alt={drivetrain.alt}
      width={2048}
      height={1280}
      className={className}
    />
  ),
  hammi: (className?: string) => (
    <Clip
      src="/projects/hammi.mp4"
      poster="/projects/hammi-poster.webp"
      alt={hammi.alt}
      width={780}
      height={1160}
      className={className}
    />
  ),
}

const fit = {
  tui: "w-full",
  meridian: "h-full aspect-[2560/1720]",
  drivetrain: "h-full aspect-[2048/1280]",
  hammi: "h-full aspect-[780/1160]",
}

// A project as a small card: title line, then the description in grey.
function Words({ info, className }: { info: ProjectInfo; className?: string }) {
  return (
    <Item
      title={info.name}
      href={info.url}
      details={info.details}
      className={className}
    >
      <p className="text-base text-muted-foreground">{info.description}</p>
    </Item>
  )
}

// Prism's film wide, then everything else as one grid of small cards.
function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex aspect-[16/10] items-end">
      {children}
    </div>
  )
}

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <Item title={prism.name} href={prism.url} details={prism.details}>
        <p>{prism.description}</p>
      </Item>
      <div className="breakout pt-3">
        {media.prism()}
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Tile>{media.meridian(fit.meridian)}</Tile>
            <Words info={meridian} />
          </div>
          <div>
            <Tile>{media.drivetrain(fit.drivetrain)}</Tile>
            <Words info={drivetrain} />
          </div>
          <div>
            <Tile>{media.hammi(fit.hammi)}</Tile>
            <Words info={hammi} />
          </div>
          <div>
            <Tile>{media.tui(fit.tui)}</Tile>
            <Words
              info={{
                name: "Prism in the terminal",
                details: "Go",
                description:
                  "The same desk as a terminal UI, for when the Mac app is not at hand.",
              }}
            />
          </div>
          <Words info={mods} />
          <Words info={relay} />
        </div>
      </div>
    </Section>
  )
}
