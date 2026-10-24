import schedule from "@/data/worlds-2026.json"

// The same data the page is built with, so an open /vods tab can pick up a
// newer deploy without a reload.
export const dynamic = "force-static"

export function GET() {
  return Response.json(schedule)
}
