"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function AnimatedCharacter() {
  const [currentExpression, setCurrentExpression] = useState(0)

  const expressions = ["🎬", "📹", "🎨", "🚀", "💎", "🔥"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExpression((prev) => (prev + 1) % expressions.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [expressions.length])

  return (
    <div className="relative">
      {/* Main Character */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <div className="w-80 h-80 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-8xl shadow-2xl">
          <motion.span
            key={currentExpression}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            {expressions[currentExpression]}
          </motion.span>
        </div>
      </motion.div>

      {/* Floating Content Snippets */}
      {[
        { code: "upload(vlog)", delay: 0, x: -100, y: -50 },
        { code: "earn(STRK)", delay: 1, x: 100, y: -80 },
        { code: "if (viral) { money++ }", delay: 2, x: -80, y: 100 },
        { code: "share.everywhere()", delay: 3, x: 120, y: 80 },
      ].map((snippet, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: snippet.x,
            y: snippet.y,
          }}
          transition={{
            duration: 4,
            delay: snippet.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 4,
          }}
          className="absolute bg-black/80 text-cyan-400 px-3 py-2 rounded-lg text-sm font-mono border border-cyan-500/50"
        >
          {snippet.code}
        </motion.div>
      ))}

      {/* Particle Effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 3,
            }}
            style={{
              left: "50%",
              top: "50%",
            }}
          />
        ))}
      </div>
    </div>
  )
}
