import { Item, Section } from "@/components/section"
import { Clip, Shot, ThemedShot, frame } from "@/components/media"
import { PrismDemo } from "@/components/prism-demo"
import { ProjectTabs } from "@/components/project-tabs"
import { Shelf } from "@/components/project-shelf"
import { cn } from "@/lib/utils"
import { projectInfo, prismTuiAlt, type ProjectInfo } from "@/data/projects"
import prismTui from "@/assets/projects/prism-tui.webp"
import meridianLight from "@/assets/projects/meridian-focus-light.webp"
import meridianDark from "@/assets/projects/meridian-focus-dark.webp"

// EMI-492: three shorter forms of the Projects section, next to the current
// one in page.tsx (see layout-switch.tsx). All three open with Prism's film
// (prism-demo.tsx) and show every project.

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

// ─── A: feature and grid ──────────────────────────────────────────────────────
// Prism's film wide, then everything else as one grid of small cards.

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex aspect-[16/10] items-end">
      {children}
    </div>
  )
}

export function ProjectsFeatureGrid() {
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

// ─── B: stage ─────────────────────────────────────────────────────────────────
// One stage, a row of names. The shortest of the three.

// Everything on the stage takes the height of Prism's film and its bars, so
// the page below does not move when the project changes.
function Stage({ alt, children }: { alt: string; children: React.ReactNode }) {
  return (
    <figure>
      <div className="flex aspect-[2640/1640] items-center justify-center">
        {children}
      </div>
      <figcaption className="mt-3 pt-2 text-center text-sm text-muted-foreground sm:min-h-[4.75rem]">
        {alt}
      </figcaption>
    </figure>
  )
}

function TabWords({ info }: { info: ProjectInfo }) {
  return (
    <>
      <p className="text-muted-foreground">
        {info.details}
        {info.url && (
          <>
            {" · "}
            <a
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/25 underline-offset-[5px] transition-colors hover:text-brand hover:decoration-brand/50"
            >
              {new URL(info.url).hostname.replace(/^www\./, "")}
            </a>
          </>
        )}
      </p>
      <p>{info.description}</p>
    </>
  )
}

export function ProjectsStage() {
  return (
    <Section id="projects" label="Projects">
      <ProjectTabs
        tabs={[
          {
            name: prism.name,
            text: <TabWords info={prism} />,
            stage: media.prism(),
          },
          {
            name: meridian.name,
            text: <TabWords info={meridian} />,
            stage: <Stage alt={meridian.alt}>{media.meridian(fit.meridian)}</Stage>,
          },
          {
            name: drivetrain.name,
            text: <TabWords info={drivetrain} />,
            stage: (
              <Stage alt={drivetrain.alt}>{media.drivetrain(fit.drivetrain)}</Stage>
            ),
          },
          {
            name: hammi.name,
            text: <TabWords info={hammi} />,
            stage: <Stage alt={hammi.alt}>{media.hammi(fit.hammi)}</Stage>,
          },
        ]}
      />
      <div className="grid gap-x-10 gap-y-6 pt-10 sm:grid-cols-2">
        <Words info={mods} className="pt-0" />
        <Words info={relay} className="pt-0" />
      </div>
    </Section>
  )
}

// ─── C: shelf ─────────────────────────────────────────────────────────────────
// Every project at the same height on one sideways shelf, Prism's film first.

// A card as wide as its media is at the shelf's height (--h, see .shelf).
function Card({
  ratio,
  info,
  children,
}: {
  ratio: number
  info: ProjectInfo
  children: React.ReactNode
}) {
  return (
    <article className="min-w-[17rem]" style={{ width: `calc(var(--h) * ${ratio})` }}>
      <div className="mb-4">{children}</div>
      <Words info={info} className="max-w-[34rem]" />
    </article>
  )
}

const shelfFit = "h-(--h) w-fit"

export function ProjectsShelf() {
  return (
    <Section id="projects" label="Projects">
      <Shelf>
        <Card ratio={2640 / 1640} info={prism}>
          {media.prism()}
        </Card>
        <Card ratio={2560 / 1720} info={meridian}>
          {media.meridian(cn(fit.meridian, shelfFit))}
        </Card>
        <Card
          ratio={3000 / 1640}
          info={{
            name: "Prism in the terminal",
            details: "Go",
            description:
              "The same desk as a terminal UI, for when the Mac app is not at hand.",
          }}
        >
          {media.tui()}
        </Card>
        <Card ratio={2048 / 1280} info={drivetrain}>
          {media.drivetrain(cn(fit.drivetrain, shelfFit))}
        </Card>
        <Card ratio={780 / 1160} info={hammi}>
          {media.hammi(cn(fit.hammi, shelfFit))}
        </Card>
        <article className="w-[19rem] space-y-8">
          <Words info={mods} />
          <Words info={relay} className="pt-0" />
        </article>
      </Shelf>
    </Section>
  )
}
