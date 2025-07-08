"use client"

import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock database
const posts: any[] = [
  {
    id: "1",
    title: "This React hook will absolutely send you to the moon 🚀",
    description: "A custom hook that manages state with superpowers",
    code: `const useAwesome = () => {
  const [isAwesome, setAwesome] = useState(true)
  return { 
    isAwesome, 
    makeMoreAwesome: () => setAwesome(prev => !prev) 
  }
}`,
    language: "javascript",
    tags: ["react", "hooks", "javascript"],
    authorId: "1",
    author: {
      id: "1",
      username: "CodeWizard",
      avatar: "/placeholder.svg",
    },
    likes: 1247,
    shares: 89,
    comments: 156,
    earned: 23.5,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    trending: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "recent"
    const language = searchParams.get("language")
    const search = searchParams.get("search")

    let filteredPosts = [...posts]

    // Filter by language
    if (language && language !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.language === language)
    }

    // Filter by search
    if (search) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase()) ||
          post.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Sort posts
    switch (sortBy) {
      case "trending":
        filteredPosts.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        break
      case "popular":
        filteredPosts.sort((a, b) => b.likes - a.likes)
        break
      case "earnings":
        filteredPosts.sort((a, b) => b.earned - a.earned)
        break
      default: // recent
        filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // Paginate
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET) as any

    const { title, description, code, language, tags } = await request.json()

    // Validate input
    if (!title || !code || !language) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create post
    const post = {
      id: Date.now().toString(),
      title,
      description: description || "",
      code,
      language,
      tags: tags || [],
      authorId: decoded.userId,
      author: {
        id: decoded.userId,
        username: decoded.username,
        avatar: "/placeholder.svg",
      },
      likes: 0,
      shares: 0,
      comments: 0,
      earned: 0,
      createdAt: new Date().toISOString(),
      trending: false,
    }

    posts.unshift(post)

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
