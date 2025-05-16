"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export default function VideoBackground() {
  const [currentGif, setCurrentGif] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // GIF URLs
  const gifs = [
    "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
    "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
  ]

  useEffect(() => {
    // Function to cycle through GIFs
    const cycleGifs = () => {
      setCurrentGif((prev) => {
        // Show black screen (null) after each GIF
        if (prev === 0) return -1 // Black screen
        if (prev === -1) return 1 // Second GIF
        return 0 // Back to first GIF
      })
    }

    // Set up interval to cycle GIFs
    const interval = setInterval(
      () => {
        cycleGifs()
      },
      (prev) => {
        // Different timing for different states
        if (prev === -1) return 500 // Black screen duration
        return 5000 // GIF duration
      },
    )

    return () => {
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* First GIF */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentGif === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={gifs[0] || "/placeholder.svg"}
          alt="Background animation 1"
          fill
          className="object-cover grayscale"
          unoptimized
        />
      </div>

      {/* Black Screen */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          currentGif === -1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Second GIF */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentGif === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={gifs[1] || "/placeholder.svg"}
          alt="Background animation 2"
          fill
          className="object-cover grayscale"
          unoptimized
        />
      </div>
    </div>
  )
}
