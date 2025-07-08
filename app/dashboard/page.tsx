"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Coins, TrendingUp, Users, Code, Award, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    strkBalance: 127.5,
    totalEarned: 342.8,
    postsCount: 23,
    totalLikes: 1847,
    totalShares: 234,
    rank: 42,
    nextRankProgress: 75,
  })

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleConvertToUsdt = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/starknet/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: 50 }), // Convert 50 STRK
      })

      const data = await response.json()
      if (response.ok) {
        alert(`Successfully converted! Transaction: ${data.transactionHash}`)
        // Update balance
        setStats((prev) => ({ ...prev, strkBalance: prev.strkBalance - 50 }))
      } else {
        alert(data.error)
      }
    } catch (error) {
      alert("Conversion failed")
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {user.username}
              </span>
              ! 🚀
            </h1>
            <p className="text-xl text-gray-300">Ready to drop some fire code and earn more STRK? 💎</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">STRK Balance</p>
                    <p className="text-3xl font-bold text-white">{stats.strkBalance}</p>
                  </div>
                  <Coins className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Total Earned</p>
                    <p className="text-3xl font-bold text-white">{stats.totalEarned}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Posts Created</p>
                    <p className="text-3xl font-bold text-white">{stats.postsCount}</p>
                  </div>
                  <Code className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm font-medium">Community Rank</p>
                    <p className="text-3xl font-bold text-white">#{stats.rank}</p>
                  </div>
                  <Award className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Earnings Overview */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Earnings Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Likes ({stats.totalLikes})</span>
                    </div>
                    <span className="text-blue-400 font-bold">{(stats.totalLikes * 0.1).toFixed(1)} STRK</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Shares ({stats.totalShares})</span>
                    </div>
                    <span className="text-green-400 font-bold">{(stats.totalShares * 0.5).toFixed(1)} STRK</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Trending Bonuses</span>
                    </div>
                    <span className="text-purple-400 font-bold">58.2 STRK</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity 🔥</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Your React hook post got 50 new likes!", time: "2h ago", reward: "+5.0 STRK" },
                      { action: "Post shared 12 times on Twitter", time: "4h ago", reward: "+6.0 STRK" },
                      { action: "Reached trending #3 with Cairo contract", time: "1d ago", reward: "+10.0 STRK" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{activity.action}</p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                        </div>
                        <span className="text-green-400 font-bold">{activity.reward}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Rank Progress */}
              <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-700">
                <CardHeader>
                  <CardTitle className="text-white">Rank Progress 📈</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">Code Ninja</div>
                    <div className="text-indigo-300">Rank #{stats.rank}</div>
                  </div>
                  <Progress value={stats.nextRankProgress} className="w-full" />
                  <p className="text-sm text-gray-300 text-center">{100 - stats.nextRankProgress}% to Code Samurai</p>
                </CardContent>
              </Card>

              {/* Convert STRK */}
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-700">
                <CardHeader>
                  <CardTitle className="text-white">Convert to USDT 💰</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-lg text-green-300 mb-2">Current Rate</div>
                    <div className="text-2xl font-bold text-white">1 STRK = 0.5 USDT</div>
                  </div>
                  <Button
                    onClick={handleConvertToUsdt}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Convert 50 STRK → 25 USDT
                  </Button>
                  <p className="text-xs text-gray-400 text-center">Instant conversion via Starknet smart contracts</p>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions ⚡</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Create New Post
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white bg-transparent"
                  >
                    View My Posts
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                  >
                    Explore Trending
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
