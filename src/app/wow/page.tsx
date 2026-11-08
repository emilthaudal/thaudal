import type { Metadata } from "next"
import { Alegreya_Sans, IM_Fell_English, JetBrains_Mono } from "next/font/google"
import { Journal } from "./journal"

const fell = IM_Fell_English({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fell",
})

const alegreya = Alegreya_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-alegreya",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
})

const title = "The road from fog to open sea"
const description =
  "A WoW Forever field journal: three days of screenshots from Jetskis Demondawg, warlock, level 19 to 28."

// openGraph and twitter replace the layout's objects rather than merging
// with them, so the shared fields are repeated here.
export const metadata: Metadata = {
  title: "WoW Forever journal — Emil Thaudal Bønnerup",
  description,
  openGraph: {
    title,
    description,
    url: "https://thaudal.com/wow",
    siteName: "thaudal.com",
    locale: "en_US",
    type: "website",
    images: [{ url: "/wow/forever/110626_165307.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@emilthaudal",
    images: ["/wow/forever/110626_165307.jpg"],
  },
}

export default function WowPage() {
  return (
    <Journal
      fontClassName={`${fell.variable} ${alegreya.variable} ${mono.variable}`}
    />
  )
}
