"use client"

import type React from "react"

import { useRef } from "react"
import { Card } from "@/components/ui/card"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export default function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = value.substring(0, start) + "  " + value.substring(end)
      onChange(newValue)

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-700 overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm ml-4">{language || "plaintext"} • Ready to code? 🚀</span>
        </div>
      </div>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={`// Drop your ${language || "code"} here and watch the magic happen ✨
// Example:
function amazingCode() {
  return "This will get you mad likes! 🔥";
}`}
          className="w-full h-64 bg-transparent text-white font-mono text-sm p-4 resize-none outline-none placeholder-gray-500"
          spellCheck={false}
        />
        <div className="absolute top-4 right-4 text-xs text-gray-500">Lines: {value.split("\n").length}</div>
      </div>
    </Card>
  )
}
