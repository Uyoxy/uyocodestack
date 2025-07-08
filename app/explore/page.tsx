"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, TrendingUp, Play, Heart, Share2, MessageCircle, Eye, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("trending")
  const [filterBy, setFilterBy] = useState("all")
  const [content, setContent] = useState<any[]>([])

  useEffect(() => {
    fetchContent()
  }, [sortBy, filterBy, searchQuery])

  const fetchContent = async () => {
    try {
      const params = new URLSearchParams({
        sortBy,
        filter: filterBy,
        search: searchQuery,
      })

      const response = await fetch(`/api/content?${params}`)
      const data = await response.json()
      setContent(data.content || mockContent)
    } catch (error) {
      console.error("Failed to fetch content:", error)
      setContent(mockContent)
    }
  }

  const handleLike = async (contentId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/content/${contentId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setContent((prev) =>
          prev.map((item) =>
            item.id === contentId ? { ...item, likes: item.likes + 1, isLiked: !item.isLiked } : item,
          ),
        )
      }
    } catch (error) {
      console.error("Failed to like content:", error)
    }
  }

  const mockContent = [
    {
      id: "1",
      type: "video",
      title: "My coding journey from zero to hero 🚀",
      description: "Sharing my entire coding journey and the mistakes I made so you don't have to!",
      videoUrl: "/placeholder-video.mp4",
      thumbnail: "/placeholder.svg?height=200&width=350",
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
      earned: "45.2 STRK",
      timeAgo: "2h ago",
      tags: ["coding", "journey", "motivation", "tech"],
      trending: true,
    },
    {
      id: "2",
      type: "video",
      title: "Building a Web3 app that's absolutely bussin 💎",
      description: "Step-by-step tutorial on creating a decentralized app that actually works!",
      videoUrl: "/placeholder-video.mp4",
      thumbnail: "/placeholder.svg?height=200&width=350",
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
      earned: "32.1 STRK",
      timeAgo: "4h ago",
      tags: ["web3", "tutorial", "blockchain", "dapp"],
      trending: false,
    },
    {
      id: "3",
      type: "image",
      title: "My setup that's giving main character energy ✨",
      description: "Finally got my dream setup! Here's everything I use for content creation.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      author: {
        name: "SetupGuru",
        avatar: "/placeholder.svg",
        username: "@setupguru",
        isVerified: true,
      },
      category: "lifestyle",
      likes: 3456,
      shares: 234,
      comments: 189,
      views: 15600,
      earned: "58.7 STRK",
      timeAgo: "6h ago",
      tags: ["setup", "workspace", "productivity", "aesthetic"],
      trending: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Amazing Content
              </span>
            </h1>
            <p className="text-xl text-gray-300">Discover the most fire content from our creator community 🔥</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for amazing content..."
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800/50 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="trending">🔥 Trending</SelectItem>
                <SelectItem value="recent">⏰ Recent</SelectItem>
                <SelectItem value="popular">❤️ Most Liked</SelectItem>
                <SelectItem value="earnings">💰 Top Earners</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800/50 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="text">Text Posts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm overflow-hidden group">
                  <CardContent className="p-0">
                    {/* Content Media */}
                    <div className="relative">
                      {item.type === "video" ? (
                        <div className="relative">
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors cursor-pointer">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            {Math.floor(Math.random() * 10) + 1}:
                            {Math.floor(Math.random() * 60)
                              .toString()
                              .padStart(2, "0")}
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.imageUrl || item.thumbnail}
                          alt={item.title}
                          className="w-full h-48 object-cover cursor-pointer"
                        />
                      )}

                      {item.trending && (
                        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Content Info */}
                    <div className="p-4">
                      {/* Author */}
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-8 h-8 border border-cyan-500">
                          <AvatarImage src={item.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs">
                            {item.author.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-white text-sm font-medium">{item.author.name}</span>
                            {item.author.isVerified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <span className="text-gray-400 text-xs">{item.author.username}</span>
                        </div>
                        <span className="text-gray-400 text-xs">{item.timeAgo}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-white font-bold mb-2 line-clamp-2 hover:text-cyan-400 cursor-pointer transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-cyan-500/20 text-cyan-300 text-xs hover:bg-cyan-500/30 cursor-pointer"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleLike(item.id)}
                            className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{item.likes.toLocaleString()}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                            <span>{item.shares}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{item.comments}</span>
                          </motion.button>
                        </div>
                        <div className="flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 py-1 rounded-full border border-green-500/30">
                          <Coins className="w-3 h-3 text-green-400" />
                          <span className="text-green-400 font-semibold text-xs">{item.earned}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Load More Amazing Content 🚀
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
