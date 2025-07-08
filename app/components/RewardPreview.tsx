"use client"

import { motion } from "framer-motion"
import { Coins, TrendingUp, Users, Zap, Eye, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RewardPreview() {
  const rewardMetrics = [
    { icon: Eye, label: "Per View", value: "0.01 STRK", color: "text-blue-400" },
    { icon: Users, label: "Per Like", value: "0.1 STRK", color: "text-red-400" },
    { icon: Share2, label: "Per Share", value: "0.5 STRK", color: "text-green-400" },
    { icon: TrendingUp, label: "Viral Bonus", value: "50 STRK", color: "text-purple-400" },
    { icon: Zap, label: "Creator Boost", value: "2x Multiplier", color: "text-yellow-400" },
    { icon: Coins, label: "Daily Max", value: "500 STRK", color: "text-cyan-400" },
  ]

  return (
    <Card className="bg-gradient-to-br from-cyan-900/50 to-purple-900/50 border-cyan-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Coins className="w-5 h-5" />
          Earning Potential 💰
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewardMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-gray-300">{metric.label}</span>
            </div>
            <span className={`font-bold ${metric.color}`}>{metric.value}</span>
          </motion.div>
        ))}

        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">~$200-1000</div>
            <div className="text-sm text-green-300">Potential monthly earnings</div>
            <div className="text-xs text-gray-400 mt-2">Based on average creator engagement rates 📊</div>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center">💡 Quality content + engagement = more STRK!</div>
      </CardContent>
    </Card>
  )
}
