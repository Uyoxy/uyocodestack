"use client"

import { motion } from "framer-motion"
import { TrendingUp, Hash, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TrendingTopics() {
  const trendingTopics = [
    { tag: "#VlogLife", content: "3.2K", trend: "+25%", color: "from-blue-500 to-cyan-500" },
    { tag: "#CodingJourney", content: "2.8K", trend: "+18%", color: "from-purple-500 to-pink-500" },
    { tag: "#Web3Gaming", content: "1.8K", trend: "+42%", color: "from-orange-500 to-red-500" },
    { tag: "#LifestyleVibes", content: "1.5K", trend: "+28%", color: "from-green-500 to-emerald-500" },
    { tag: "#TechTutorial", content: "1.8K", trend: "+22%", color: "from-indigo-500 to-purple-500" },
    { tag: "#DigitalArt", content: "1.3K", trend: "+31%", color: "from-pink-500 to-rose-500" },
  ]

  const slangPhrases = [
    "This content is absolutely sending me 🚀",
    "No cap, this vlog hits different 💯",
    "The creativity is giving main character energy ✨",
    "This tutorial is chef's kiss 👨‍🍳💋",
    "Touch grass? Nah, touch that subscribe button 🌱",
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            <span>What's Trending RN</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The Hottest{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Creator Topics
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what's got the community absolutely losing their minds (in the best way) 🤯
          </p>
        </motion.div>

        {/* Trending Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${topic.color} flex items-center justify-center`}
                    >
                      <Hash className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {topic.trend}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{topic.tag}</h3>
                  <p className="text-gray-400">{topic.content} posts this week</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Slang Phrases Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Community Vibes 💬</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {slangPhrases.map((phrase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-6 py-3 text-white font-medium backdrop-blur-sm"
              >
                {phrase}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
