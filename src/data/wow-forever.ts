// Field journal for the WoW Forever playthrough on /wow.
// To add a screenshot: resize it to 1920px wide, drop it in public/wow/forever/
// named after the in-game timestamp (MMDDYY_HHMMSS.jpg), and add an entry below.

export type Shot = { file: string; alt: string }

export type Chip = { label: string; tone?: "lvl" | "fel" }

export type Entry = {
  shots: Shot[]
  time: string
  title: string
  place: string
  body: string[]
  chips?: Chip[]
  quote?: { text: string; by: string }
  // "flip" puts the note on the left. Two shots always render as a pair.
  flip?: boolean
}

export type Day = {
  id: string
  numeral: string
  title: string
  meta: string
  entries: Entry[]
}

export const character = {
  name: "Jetskis Demondawg",
  className: "warlock",
  levelFrom: 19,
  levelTo: 28,
  played: "1d 3h 56m",
  playedAt: "Sat 22:55",
  companions: ["Tarpad", "Belzazt", "Betanda"],
}

// Level and progress into it, as read off the XP bar. Levels in between are full.
export const levelTrack = { from: 19, fromPct: 97, to: 28, toPct: 4 }

export const days: Day[] = [
  {
    id: "day-1",
    numeral: "I",
    title: "Rain over Hillsbrad, ruins of Dalaran, and the road into Duskwood",
    meta: "Friday 6 November 2026 · 10 shots · 16:53 to 22:22",
    entries: [
      {
        shots: [
          {
            file: "110626_165307.jpg",
            alt: "Watchtower in fog, lantern and fence in foreground",
          },
          {
            file: "110626_165324.jpg",
            alt: "The same tower seen from the grass below, pines on either side",
          },
        ],
        time: "Fri 16:53",
        title: "The tower that lost its top",
        place: "Hillsbrad Foothills",
        body: [
          "Fog so thick the battlements fade into the sky. A single lantern by the fence, the gryphon master waiting under the awning.",
          "Took the second shot sixteen seconds later from lower down. Still could not see the top.",
        ],
      },
      {
        shots: [
          {
            file: "110626_165513.jpg",
            alt: "Town hall with a blue-roofed clock tower in heavy rain",
          },
        ],
        time: "Fri 16:55",
        title: "The clock says ten to four",
        place: "Hillsbrad Foothills",
        body: [
          "Real time was five to five. The town hall clock has opinions. Rain coming down in sheets, one lamp on the path.",
        ],
      },
      {
        shots: [
          {
            file: "110626_165800.jpg",
            alt: "Violet spires of Dalaran rising behind scaffolding and red autumn trees",
          },
        ],
        time: "Fri 16:58",
        title: "Scaffolding at the city of mages",
        place: "Dalaran's walls",
        flip: true,
        body: [
          "Rain turns to snow. Purple domes and pale spires behind ladders and timber, and one tree burning red in front of it all.",
        ],
      },
      {
        shots: [
          {
            file: "110626_170007.jpg",
            alt: "Dalaran's towers rising beside a still lake under falling snow",
          },
        ],
        time: "Fri 17:00",
        title: "Spires on the water",
        place: "Lordamere shore",
        body: [
          "The towers from the lakeside. Snowflakes, gold pines, and a ripple on the water where something just surfaced.",
        ],
      },
      {
        shots: [
          {
            file: "110626_171604.jpg",
            alt: "A party gathered on dim stone steps before a dungeon gate, a glowing green imp nearby",
          },
          {
            file: "110626_171607.jpg",
            alt: "The same scene seconds later, one party member running toward the gate",
          },
        ],
        time: "Fri 17:16",
        title: "Waiting at the gate",
        place: "Dungeon run",
        body: [
          "Only Fails, Yamatta Licka and Huguette Petitpas on the steps. Three seconds later Only Fails is already at the gate.",
        ],
        chips: [{ label: "Tarpad the imp", tone: "fel" }],
      },
      {
        shots: [
          {
            file: "110626_195825.jpg",
            alt: "Group gathered in Moonbrook at dusk with a voidwalker, quest tracker and chat visible",
          },
        ],
        time: "Fri 19:58",
        title: "Moonbrook, with Big Numbers",
        place: "Westfall",
        flip: true,
        body: [
          "Grouped with Big Numbers, Sap Happy and Hog Rider to hunt the Defias Messenger. Belzazt the voidwalker holding the line.",
        ],
        quote: { text: "HOGGGGG RIIIDERRR", by: "Hog Rider, 19:58" },
        chips: [
          { label: "Lv 19 · 97.2%", tone: "lvl" },
          { label: "14.8k xp/hr" },
        ],
      },
      {
        shots: [
          {
            file: "110626_221731.jpg",
            alt: "Cobblestone road through dark twisted trees with light rays breaking through mist",
          },
          {
            file: "110626_222217.jpg",
            alt: "Winding cobblestone path at night toward a lantern-lit tent under hanging moss",
          },
        ],
        time: "Fri 22:17 – 22:22",
        title: "Light through the dead trees",
        place: "Duskwood",
        body: [
          "The best two shots of the night had nothing in them but a road. God rays cutting through the canopy, then a lone tent glowing orange where the path bends.",
        ],
      },
    ],
  },
  {
    id: "day-2",
    numeral: "II",
    title: "Graveyards, Stormwind, Redridge, and a campfire to end it",
    meta: "Saturday 7 November 2026 · 6 shots · 16:11 to 23:50",
    entries: [
      {
        shots: [
          {
            file: "110726_161128.jpg",
            alt: "Teal-lit graveyard with weathered headstones, an iron gate and tall grass",
          },
        ],
        time: "Sat 16:11",
        title: "Blue hour among the graves",
        place: "Duskwood",
        body: [
          "Back in the cemetery. Everything goes teal in here. Jane Mary of <Dungeoneers> passing through with a pet in tow.",
        ],
      },
      {
        shots: [
          {
            file: "110726_194148.jpg",
            alt: "Torchlit stone tunnel in Stormwind with a succubus companion and fel-green trail",
          },
        ],
        time: "Sat 19:41",
        title: "Up to the Keep",
        place: "Stormwind City",
        flip: true,
        body: [
          "Torches, a fel-green trail, and Betanda the succubus at heel. Two Stockade quests ready to turn in, and one called Infiltrating the Castle waiting at the Keep.",
        ],
        chips: [
          { label: "Lv 26 · 49.3%", tone: "lvl" },
          { label: "Betanda", tone: "fel" },
        ],
      },
      {
        shots: [
          {
            file: "110726_202641.jpg",
            alt: "Grave robbers by a lantern in deep blue fog among wooden grave markers",
          },
        ],
        time: "Sat 20:26",
        title: "Robbers by lantern light",
        place: "Duskwood",
        body: [
          "Two Grave Robbers working by one lantern in the blue fog. They did not see me coming.",
        ],
      },
      {
        shots: [
          {
            file: "110726_221021.jpg",
            alt: "Fighting a Shadowhide Brute in Redridge with succubus, quest tracker visible",
          },
        ],
        time: "Sat 22:10",
        title: "Pendants off the Shadowhides",
        place: "Redridge Mountains",
        flip: true,
        body: [
          "Eight of ten Shadowhide Pendants. Betanda and a Shadowhide Brute going at it while plans for Shadowfang Keep come together in whispers.",
        ],
        chips: [
          { label: "Lv 27 · 71.8%", tone: "lvl" },
          { label: "21.3k xp/hr" },
        ],
      },
      {
        shots: [
          {
            file: "110726_225532.jpg",
            alt: "A violet ritual of summoning portal on a bridge in Silverpine, warlocks gathered around it",
          },
        ],
        time: "Sat 22:55",
        title: "The summoning circle",
        place: "Silverpine Forest",
        body: [
          "Just dinged 28. Mickey Mouse of <The G Boyz> opened a Ritual of Summoning on the bridge, and the portal looked like a small purple sun.",
        ],
        chips: [
          { label: "Lv 28 · 4.0%", tone: "lvl" },
          { label: "/played 1d 3h 56m" },
        ],
      },
      {
        shots: [
          {
            file: "110726_235018.jpg",
            alt: "A crowd of players around a campfire under a huge tree in the rain at night",
          },
        ],
        time: "Sat 23:50",
        title: "Everyone at the fire",
        place: "Lakeshire",
        flip: true,
        body: [
          "Midnight, rain, and half the server around one campfire under the big tree. Dragon Russer, Critnéy Spéars, Roger Rabiit, the <MOOMIN> crew, demons and all.",
          "Nobody was questing. That was the point.",
        ],
      },
    ],
  },
]

// The closing full-width shot.
export const finale = {
  id: "day-3",
  shot: {
    file: "110826_120825.jpg",
    alt: "View from a ship's deck with a tattered sail toward another galleon on a misty sea",
  },
  eyebrow: "III · Sunday 8 November · 12:08",
  title: "A sail on the horizon",
  place: "At sea",
  body: [
    "Sunday starts at sea. Tattered canvas overhead, a galleon in the haze, and nothing else for miles.",
    "This is the latest page in the journal. More to come.",
  ],
}

export const hero = {
  file: "110626_165307.jpg",
  alt: "A stone watchtower dissolving into fog among autumn pines, a lantern glowing by a wooden fence",
}

export const shotCount =
  days.reduce(
    (n, d) => n + d.entries.reduce((m, e) => m + e.shots.length, 0),
    0
  ) + 1
