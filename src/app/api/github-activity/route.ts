import { NextResponse } from "next/server"

const GRAPHQL_URL = "https://api.github.com/graphql"

const CONTRIBUTION_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

export type ContributionDay = {
  date: string
  count: number
}

export type ActivityResponse = {
  weeks: ContributionDay[][]
  total: number
}

async function fetchContributions(
  login: string,
  token: string,
  from: string,
  to: string
): Promise<ContributionDay[][]> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: { login, from, to },
    }),
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`GitHub GraphQL error for ${login}: ${res.status}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(
      `GitHub GraphQL errors for ${login}: ${JSON.stringify(json.errors)}`
    )
  }

  const weeks: { contributionDays: { date: string; contributionCount: number }[] }[] =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []

  return weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
    }))
  )
}

function mergeWeeks(
  a: ContributionDay[][],
  b: ContributionDay[][]
): ContributionDay[][] {
  // Use the longer array as base and merge counts by date
  const map = new Map<string, number>()

  for (const weeks of [a, b]) {
    for (const week of weeks) {
      for (const day of week) {
        map.set(day.date, (map.get(day.date) ?? 0) + day.count)
      }
    }
  }

  // Reconstruct using structure of array a (or b if a is empty)
  const base = a.length > 0 ? a : b
  return base.map((week) =>
    week.map((day) => ({
      date: day.date,
      count: map.get(day.date) ?? 0,
    }))
  )
}

export async function GET() {
  const personalToken = process.env.GITHUB_TOKEN_PERSONAL
  const workToken = process.env.GITHUB_TOKEN_WORK

  if (!personalToken && !workToken) {
    return NextResponse.json(
      { error: "No GitHub tokens configured" },
      { status: 500 }
    )
  }

  // Last 52 weeks
  const to = new Date()
  const from = new Date()
  from.setFullYear(from.getFullYear() - 1)

  const fromISO = from.toISOString()
  const toISO = to.toISOString()

  try {
    const [personalWeeks, workWeeks] = await Promise.all([
      personalToken
        ? fetchContributions("emilthaudal", personalToken, fromISO, toISO)
        : Promise.resolve([]),
      workToken
        ? fetchContributions("emilthaudalwg", workToken, fromISO, toISO)
        : Promise.resolve([]),
    ])

    const weeks = mergeWeeks(personalWeeks, workWeeks)
    const total = weeks
      .flat()
      .reduce((sum, day) => sum + day.count, 0)

    const response: ActivityResponse = { weeks, total }

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (err) {
    console.error("GitHub activity fetch failed:", err)
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 }
    )
  }
}
