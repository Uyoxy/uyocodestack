import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock database
const content: any[] = []
const likes: any[] = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const contentId = params.id

    // Find content
    const contentItem = content.find((c) => c.id === contentId)
    if (!contentItem) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    // Check if already liked
    const existingLike = likes.find((l) => l.contentId === contentId && l.userId === decoded.userId)

    if (existingLike) {
      // Unlike
      const likeIndex = likes.findIndex((l) => l.contentId === contentId && l.userId === decoded.userId)
      likes.splice(likeIndex, 1)
      contentItem.likes -= 1

      // Reduce author's earnings (0.1 STRK per like for videos, 0.05 for images)
      const rewardAmount = contentItem.type === "video" ? 0.1 : 0.05
      contentItem.earned = Math.max(0, contentItem.earned - rewardAmount)

      return NextResponse.json({ liked: false, likes: contentItem.likes })
    } else {
      // Like
      likes.push({
        id: Date.now().toString(),
        contentId,
        userId: decoded.userId,
        createdAt: new Date().toISOString(),
      })
      contentItem.likes += 1

      // Increase author's earnings
      const rewardAmount = contentItem.type === "video" ? 0.1 : 0.05
      contentItem.earned += rewardAmount

      // TODO: Call Starknet contract to mint STRK tokens
      await mintStrkTokens(contentItem.authorId, rewardAmount, "like")

      return NextResponse.json({ liked: true, likes: contentItem.likes })
    }
  } catch (error) {
    console.error("Error toggling like:", error)
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}

// Mock function - replace with actual Starknet integration
async function mintStrkTokens(userId: string, amount: number, reason: string) {
  console.log(`Minting ${amount} STRK tokens for user ${userId} (reason: ${reason})`)
  // TODO: Implement actual Starknet contract call
}
