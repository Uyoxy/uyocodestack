import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In production, these would come from your database
    const stats = {
      creators: 25847,
      videos: 156234,
      totalEarned: 4892341,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
