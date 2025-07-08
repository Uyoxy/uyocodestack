import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UYO Blog World - Earn STRK for Your Content",
  description:
    "The ultimate creator community where your content turns into cryptocurrency. Share vlogs, tutorials, and content, get engagement, earn STRK tokens!",
  keywords: "vlog, content creation, blockchain, starknet, cairo, web3, creator community, earn crypto, video sharing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
