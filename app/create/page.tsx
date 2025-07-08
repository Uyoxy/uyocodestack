"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Video, Upload, Send, Sparkles, ImageIcon, FileText, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VideoUploader from "../components/VideoUploader"
import CodeEditor from "../components/CodeEditor"
import RewardPreview from "../components/RewardPreview"

export default function CreatePage() {
  const [contentType, setContentType] = useState("video")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
    thumbnail: null as File | null,
    video: null as File | null,
    code: "",
    language: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submitData = new FormData()
    submitData.append("title", formData.title)
    submitData.append("description", formData.description)
    submitData.append("tags", formData.tags)
    submitData.append("category", formData.category)
    submitData.append("contentType", contentType)

    if (contentType === "video" && formData.video) {
      submitData.append("video", formData.video)
    }
    if (formData.thumbnail) {
      submitData.append("thumbnail", formData.thumbnail)
    }
    if (contentType === "code") {
      submitData.append("code", formData.code)
      submitData.append("language", formData.language)
    }

    try {
      const response = await fetch("/api/content/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: submitData,
      })

      if (response.ok) {
        alert("Content uploaded successfully! 🚀")
        // Reset form or redirect
      } else {
        alert("Upload failed. Please try again.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Epic Content</span>
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Share Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Creative Vision
              </span>
            </h1>
            <p className="text-xl text-gray-300">Upload vlogs, tutorials, code, and content that gets you paid! 🚀</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Create Your Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Content Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Content Type</label>
                      <Tabs value={contentType} onValueChange={setContentType} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                          <TabsTrigger value="video" className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Video
                          </TabsTrigger>
                          <TabsTrigger value="image" className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Image
                          </TabsTrigger>
                          <TabsTrigger value="code" className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Code
                          </TabsTrigger>
                          <TabsTrigger value="text" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Text
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="video" className="mt-6">
                          <VideoUploader
                            onVideoSelect={(file) => handleInputChange("video", file)}
                            onThumbnailSelect={(file) => handleInputChange("thumbnail", file)}
                          />
                        </TabsContent>

                        <TabsContent value="image" className="mt-6">
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-300 mb-2">Upload your images</p>
                            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              id="image-upload"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleInputChange("thumbnail", e.target.files[0])
                                }
                              }}
                            />
                            <Button
                              type="button"
                              onClick={() => document.getElementById("image-upload")?.click()}
                              className="mt-4"
                            >
                              Choose Images
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="code" className="mt-6">
                          <div className="space-y-4">
                            <Select
                              value={formData.language}
                              onValueChange={(value) => handleInputChange("language", value)}
                            >
                              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                                <SelectValue placeholder="Select programming language" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="typescript">TypeScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="cairo">Cairo</SelectItem>
                                <SelectItem value="rust">Rust</SelectItem>
                                <SelectItem value="solidity">Solidity</SelectItem>
                                <SelectItem value="go">Go</SelectItem>
                                <SelectItem value="cpp">C++</SelectItem>
                              </SelectContent>
                            </Select>
                            <CodeEditor
                              value={formData.code}
                              onChange={(value) => handleInputChange("code", value)}
                              language={formData.language}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="text" className="mt-6">
                          <Textarea
                            placeholder="Write your amazing content here... Share your thoughts, tutorials, or stories! ✨"
                            rows={10}
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title (Make it catchy! 🎯)</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="e.g., This vlog will change your perspective 🤯"
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    {/* Description */}
                    {contentType !== "text" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description (Tell us what's special about it)
                        </label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Describe your content, share the story behind it, or just flex 💪"
                          rows={3}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    )}

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="vlog">Vlog</SelectItem>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="coding">Coding</SelectItem>
                          <SelectItem value="web3">Web3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags (Separate with commas)
                      </label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => handleInputChange("tags", e.target.value)}
                        placeholder="vlog, lifestyle, tech, web3, tutorial"
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Upload & Start Earning! 🚀
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RewardPreview />

              {/* Tips Card */}
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Creator Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-green-100 space-y-3">
                  <p>• Use trending hashtags for max visibility 📈</p>
                  <p>• High-quality content gets more engagement 💯</p>
                  <p>• Respond to comments to boost your content 🔥</p>
                  <p>• Post during peak hours (6-9 PM UTC) ⏰</p>
                  <p>• Create eye-catching thumbnails 🎨</p>
                </CardContent>
              </Card>

              {/* Trending Tags */}
              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-700">
                <CardHeader>
                  <CardTitle className="text-white">🔥 Trending Now</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["#VlogLife", "#TechTutorial", "#Web3Vibes", "#CodingTips", "#LifestyleContent"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-orange-500/30 transition-colors"
                        onClick={() =>
                          handleInputChange("tags", formData.tags + (formData.tags ? ", " : "") + tag.slice(1))
                        }
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
