import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { writeFile } from "fs/promises"
import path from "path"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock database
const content: any[] = []

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET) as any

    const formData = await request.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const tags = formData.get("tags") as string
    const category = formData.get("category") as string
    const contentType = formData.get("contentType") as string
    const code = formData.get("code") as string
    const language = formData.get("language") as string

    // Handle file uploads
    let videoUrl = null
    let thumbnailUrl = null
    let imageUrl = null

    const videoFile = formData.get("video") as File
    const thumbnailFile = formData.get("thumbnail") as File

    if (videoFile) {
      const bytes = await videoFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${videoFile.name}`
      const filepath = path.join(process.cwd(), "public/uploads/videos", filename)
      await writeFile(filepath, buffer)
      videoUrl = `/uploads/videos/${filename}`
    }

    if (thumbnailFile) {
      const bytes = await thumbnailFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${thumbnailFile.name}`
      const filepath = path.join(process.cwd(), "public/uploads/thumbnails", filename)
      await writeFile(filepath, buffer)
      thumbnailUrl = `/uploads/thumbnails/${filename}`

      if (contentType === "image") {
        imageUrl = thumbnailUrl
      }
    }

    // Validate input
    if (!title || !contentType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create content
    const newContent = {
      id: Date.now().toString(),
      type: contentType,
      title,
      description: description || "",
      code: code || "",
      language: language || "",
      category: category || "general",
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      authorId: decoded.userId,
      author: {
        id: decoded.userId,
        username: decoded.username,
        avatar: "/placeholder.svg",
        isVerified: false,
      },
      videoUrl,
      thumbnailUrl,
      imageUrl,
      likes: 0,
      shares: 0,
      comments: 0,
      views: 0,
      earned: 0,
      createdAt: new Date().toISOString(),
      trending: false,
    }

    content.unshift(newContent)

    return NextResponse.json(newContent, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}
