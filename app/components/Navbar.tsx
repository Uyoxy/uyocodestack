"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Video, Menu, X, Coins, User, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center"
            >
              <Video className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              UYO Blog World
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-gray-300 hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="/create" className="text-gray-300 hover:text-white transition-colors">
              Create
            </Link>
            <Link href="/trending" className="text-gray-300 hover:text-white transition-colors">
              Trending
            </Link>
            <Link href="/rewards" className="text-gray-300 hover:text-white transition-colors">
              Rewards
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-full border border-green-500/30">
              <Coins className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold">127.5 STRK</span>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="flex flex-col gap-4">
              <Link href="/explore" className="text-gray-300 hover:text-white transition-colors">
                Explore
              </Link>
              <Link href="/create" className="text-gray-300 hover:text-white transition-colors">
                Create
              </Link>
              <Link href="/trending" className="text-gray-300 hover:text-white transition-colors">
                Trending
              </Link>
              <Link href="/rewards" className="text-gray-300 hover:text-white transition-colors">
                Rewards
              </Link>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-2 rounded-full border border-green-500/30 w-fit">
                <Coins className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">127.5 STRK</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
