"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Video, Zap, Coins, TrendingUp, Users, Sparkles, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import AnimatedCharacter from "./components/AnimatedCharacter"
import TrendingTopics from "./components/TrendingTopics"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    creators: 0,
    videos: 0,
    totalEarned: 0,
  })

  useEffect(() => {
    setMounted(true)
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Web3 Creator Community 🚀</span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Create, Share,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Earn STRK
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  Drop your sickest vlogs, tutorials, and content! Get mad engagement and stack that crypto! The dopest
                  creator community where your content = your wealth 💎
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Start Creating 🔥
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    variant="outline"
                    className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                  >
                    Explore Content
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stats.creators.toLocaleString()}+</div>
                  <div className="text-gray-400">Creators</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{stats.videos.toLocaleString()}+</div>
                  <div className="text-gray-400">Videos & Posts</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                  <div className="text-3xl font-bold text-green-400">${stats.totalEarned.toLocaleString()}+</div>
                  <div className="text-gray-400">Earned</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <AnimatedCharacter />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Creators Are Going{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Absolutely Viral
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              This ain't your typical content platform. We're serving up the future of creator rewards! 🌟
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "Upload Like a Pro",
                description: "Drop your vlogs, tutorials, and content with HD quality that hits different",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Zap,
                title: "Instant Rewards",
                description: "Every view, like and share = STRK tokens straight to your wallet. No cap! 💰",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Coins,
                title: "STRK → USDT",
                description: "Convert your earned tokens to USDT whenever you want. Secure the bag! 💎",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: TrendingUp,
                title: "Viral Algorithm",
                description: "Our AI knows what's bussin. Get discovered by the right audience 📈",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Users,
                title: "Creator Community",
                description: "Connect with creators who speak your language and vibe with your content",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: Camera,
                title: "Multi-Format Support",
                description: "Upload videos, images, code, tutorials - we support all content types ✨",
                color: "from-pink-500 to-rose-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <TrendingTopics />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Go Viral and Get Paid? 🌱</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the most based creator community and start earning while you create. Your future self will thank you
              (and your wallet will too)!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Join UYO World 🚀
                </Button>
              </Link>
              <Link href="/learn-more">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
