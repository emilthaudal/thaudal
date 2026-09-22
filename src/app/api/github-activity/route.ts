import { NextResponse } from "next/server"
import { getGithubActivity } from "@/lib/github-activity"

export async function GET() {
  const data = await getGithubActivity()

  if (!data) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 }
    )
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
