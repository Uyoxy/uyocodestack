import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock database
const posts: any[] = []
const likes: any[] = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const postId = params.id

    // Find post
    const post = posts.find((p) => p.id === postId)
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Check if already liked
    const existingLike = likes.find((l) => l.postId === postId && l.userId === decoded.userId)

    if (existingLike) {
      // Unlike
      const likeIndex = likes.findIndex((l) => l.postId === postId && l.userId === decoded.userId)
      likes.splice(likeIndex, 1)
      post.likes -= 1

      // Reduce author's earnings
      post.earned = Math.max(0, post.earned - 0.1)

      return NextResponse.json({ liked: false, likes: post.likes })
    } else {
      // Like
      likes.push({
        id: Date.now().toString(),
        postId,
        userId: decoded.userId,
        createdAt: new Date().toISOString(),
      })
      post.likes += 1

      // Increase author's earnings (0.1 STRK per like)
      post.earned += 0.1

      // TODO: Call Starknet contract to mint STRK tokens
      await mintStrkTokens(post.authorId, 0.1)

      return NextResponse.json({ liked: true, likes: post.likes })
    }
  } catch (error) {
    console.error("Error toggling like:", error)
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}

// Mock function - replace with actual Starknet integration
async function mintStrkTokens(userId: string, amount: number) {
  console.log(`Minting ${amount} STRK tokens for user ${userId}`)
  // TODO: Implement actual Starknet contract call
}
