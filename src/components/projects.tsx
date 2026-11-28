import { Item, Section } from "@/components/section"
import { Clip, Shot, ThemedShot, frame } from "@/components/media"
import { PrismDemo } from "@/components/prism-demo"
import { cn } from "@/lib/utils"
import { projectInfo, prismTuiAlt, type ProjectInfo } from "@/data/projects"
import prismTui from "@/assets/projects/prism-tui.webp"
import meridianLight from "@/assets/projects/meridian-focus-light.webp"
import meridianDark from "@/assets/projects/meridian-focus-dark.webp"
import modsReadable from "@/assets/projects/mods-readable.webp"
import relayWorkouts from "@/assets/projects/relay-workouts.webp"
import claimsLight from "@/assets/projects/claims-case-light.webp"
import claimsDark from "@/assets/projects/claims-case-dark.webp"

const { claims, prism, meridian, drivetrain, hammi, mods, relay } = projectInfo

// Each project's media, sized by the class it is given: "w-full" to fill the
// width, or "h-full" plus its own aspect ratio to fit a height.
const media = {
  claims: (className?: string) => (
    <ThemedShot
      light={claimsLight}
      dark={claimsDark}
      alt={claims.alt}
      className={className}
    />
  ),
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
  mods: (className?: string) => (
    <Shot src={modsReadable} alt={mods.alt} className={className} />
  ),
  relay: (className?: string) => (
    <Shot src={relayWorkouts} alt={relay.alt} className={className} />
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
  mods: "h-full aspect-[1280/1000]",
  // A phone is too narrow to read at tile height, so it fills the width and
  // runs off the bottom of the tile.
  relay: "mt-[6%] w-[46%] self-start",
}

// A faint tint of each project, so the fill around a picture belongs to it.
const tint = {
  meridian: "bg-sky-500/10",
  drivetrain: "bg-emerald-500/10",
  hammi: "bg-pink-400/15",
  tui: "bg-indigo-500/10",
  mods: "bg-orange-500/10",
  relay: "bg-blue-500/10",
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

// The claims platform and Prism wide, then everything else as one grid of small cards. Every
// card's picture sits in a tile of the same 16:10 shape, centred on a tinted
// fill, so a tall phone or a wide terminal lines up with the rest.
function Tile({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "mb-4 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl p-[4%]",
        className,
      )}
    >
      {children}
    </div>
  )
}

// The claims platform's first month.
const claimsStats = [
  ["~14 h", "to the first version"],
  ["155", "PRs merged"],
  ["1,300", "automated tests"],
  ["0", "lines by hand"],
]

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <Item title={claims.name} href={claims.url} details={claims.details}>
        <p>{claims.description}</p>
        <p>
          I started it on my own time in October 2026, as a weekend experiment
          while we were setting up a SaaS for claims. After one weekend, about 14 hours of work, most of the product
          existed, and Whiteaway chose it instead. It is now the group's own
          claims platform, running on our AWS. Agents wrote every line; I
          reviewed evidence, not code.
        </p>
      </Item>
      <dl className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-4">
        {claimsStats.map(([value, label]) => (
          <div key={label} className="flex flex-col-reverse">
            <dt className="text-base text-muted-foreground">{label}</dt>
            <dd className="tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="breakout pt-3">{media.claims("w-full sm:rounded-2xl")}</div>
      <Item title={prism.name} href={prism.url} details={prism.details}>
        <p>{prism.description}</p>
      </Item>
      <div className="breakout pt-3">
        {media.prism()}
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Tile className={tint.meridian}>{media.meridian(fit.meridian)}</Tile>
            <Words info={meridian} />
          </div>
          <div>
            <Tile className={tint.drivetrain}>{media.drivetrain(fit.drivetrain)}</Tile>
            <Words info={drivetrain} />
          </div>
          <div>
            <Tile className={tint.hammi}>{media.hammi(fit.hammi)}</Tile>
            <Words info={hammi} />
          </div>
          <div>
            <Tile className={tint.tui}>{media.tui(fit.tui)}</Tile>
            <Words
              info={{
                name: "Prism in the terminal",
                details: "Go",
                description:
                  "The same desk as a terminal UI, for when the Mac app is not at hand.",
              }}
            />
          </div>
          <div>
            <Tile className={tint.mods}>{media.mods(fit.mods)}</Tile>
            <Words info={mods} />
          </div>
          <div>
            <Tile className={tint.relay}>{media.relay(fit.relay)}</Tile>
            <Words info={relay} />
          </div>
        </div>
      </div>
    </Section>
  )
}
