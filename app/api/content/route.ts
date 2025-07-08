import { type NextRequest, NextResponse } from "next/server"

// Mock database
const content: any[] = [
  {
    id: "1",
    type: "video",
    title: "My coding journey from zero to hero 🚀",
    description: "Sharing my entire coding journey and the mistakes I made so you don't have to!",
    videoUrl: "/placeholder-video.mp4",
    thumbnailUrl: "/placeholder.svg?height=200&width=350",
    author: {
      name: "TechVlogger",
      avatar: "/placeholder.svg",
      username: "@techvlogger",
      isVerified: true,
    },
    category: "vlog",
    likes: 2847,
    shares: 156,
    comments: 234,
    views: 12500,
    earned: 45.2,
    timeAgo: "2h ago",
    tags: ["coding", "journey", "motivation", "tech"],
    trending: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "video",
    title: "Building a Web3 app that's absolutely bussin 💎",
    description: "Step-by-step tutorial on creating a decentralized app that actually works!",
    videoUrl: "/placeholder-video.mp4",
    thumbnailUrl: "/placeholder.svg?height=200&width=350",
    author: {
      name: "Web3Builder",
      avatar: "/placeholder.svg",
      username: "@web3builder",
      isVerified: false,
    },
    category: "tutorial",
    likes: 1923,
    shares: 89,
    comments: 167,
    views: 8900,
    earned: 32.1,
    timeAgo: "4h ago",
    tags: ["web3", "tutorial", "blockchain", "dapp"],
    trending: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const sortBy = searchParams.get("sortBy") || "recent"
    const filter = searchParams.get("filter") || "all"
    const search = searchParams.get("search")

    let filteredContent = [...content]

    // Filter by content type
    if (filter && filter !== "all") {
      filteredContent = filteredContent.filter((item) => item.type === filter)
    }

    // Filter by search
    if (search) {
      filteredContent = filteredContent.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase())),
      )
    }

    // Sort content
    switch (sortBy) {
      case "trending":
        filteredContent.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        break
      case "popular":
        filteredContent.sort((a, b) => b.likes - a.likes)
        break
      case "earnings":
        filteredContent.sort((a, b) => b.earned - a.earned)
        break
      default: // recent
        filteredContent.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // Paginate
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedContent = filteredContent.slice(startIndex, endIndex)

    return NextResponse.json({
      content: paginatedContent,
      pagination: {
        page,
        limit,
        total: filteredContent.length,
        totalPages: Math.ceil(filteredContent.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
