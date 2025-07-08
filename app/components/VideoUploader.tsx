"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, Video, ImageIcon, X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void
  onThumbnailSelect: (file: File) => void
}

export default function VideoUploader({ onVideoSelect, onThumbnailSelect }: VideoUploaderProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const videoInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  const handleVideoSelect = (file: File) => {
    if (file.size > 500 * 1024 * 1024) {
      // 500MB limit
      alert("Video file too large. Please select a file under 500MB.")
      return
    }

    setVideoFile(file)
    setVideoPreview(URL.createObjectURL(file))
    onVideoSelect(file)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 200)
  }

  const handleThumbnailSelect = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("Thumbnail file too large. Please select a file under 5MB.")
      return
    }

    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
    onThumbnailSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find((file) => file.type.startsWith("video/"))
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (videoFile) {
      handleVideoSelect(videoFile)
    }
    if (imageFile) {
      handleThumbnailSelect(imageFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <div className="space-y-6">
      {/* Video Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Video Upload</label>
        <Card
          className={`border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? "border-cyan-400 bg-cyan-400/10"
              : videoFile
                ? "border-green-500 bg-green-500/10"
                : "border-gray-600 bg-gray-800/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="p-8">
            {videoPreview ? (
              <div className="space-y-4">
                <div className="relative">
                  <video src={videoPreview} className="w-full h-48 object-cover rounded-lg" controls />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                    onClick={() => {
                      setVideoFile(null)
                      setVideoPreview(null)
                      setUploadProgress(0)
                    }}
                  >
                    <X className="w-4 h-4 text-white" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{videoFile?.name}</span>
                    <span className="text-green-400">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">Upload Your Video</h3>
                <p className="text-gray-300 mb-4">Drag and drop your video here, or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">MP4, MOV, AVI up to 500MB</p>
                <Button
                  onClick={() => videoInputRef.current?.click()}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Video
                </Button>
              </div>
            )}
          </div>
        </Card>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleVideoSelect(e.target.files[0])
            }
          }}
        />
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Thumbnail <span className="text-gray-500">(Optional but recommended)</span>
        </label>
        <Card className="border-2 border-dashed border-gray-600 bg-gray-800/50">
          <div className="p-6">
            {thumbnailPreview ? (
              <div className="relative">
                <img
                  src={thumbnailPreview || "/placeholder.svg"}
                  alt="Thumbnail preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                  onClick={() => {
                    setThumbnailFile(null)
                    setThumbnailPreview(null)
                  }}
                >
                  <X className="w-4 h-4 text-white" />
                </Button>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white bg-black/50 rounded-full p-2" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-2">Add a custom thumbnail</p>
                <p className="text-sm text-gray-500 mb-3">PNG, JPG up to 5MB</p>
                <Button
                  variant="outline"
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Thumbnail
                </Button>
              </div>
            )}
          </div>
        </Card>
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleThumbnailSelect(e.target.files[0])
            }
          }}
        />
      </div>

      {/* Upload Tips */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50">
        <div className="p-4">
          <h4 className="text-white font-semibold mb-2">📹 Video Tips for Maximum Engagement:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Keep videos under 10 minutes for better retention</li>
            <li>• Use good lighting and clear audio</li>
            <li>• Create eye-catching thumbnails</li>
            <li>• Start with a hook in the first 15 seconds</li>
            <li>• Add captions for accessibility</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
