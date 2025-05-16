"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export default function GifBackground() {
  const [currentGif, setCurrentGif] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // GIF URLs
  const gifs = [
    "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
    "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
  ]

  // Estimated duration for each GIF in milliseconds
  const gifDurations = [5000, 5000] // Adjust these values based on the actual GIF durations

  useEffect(() => {
    // Track which GIF is currently showing
    let currentIndex = 0

    // Function to cycle to the next GIF
    const cycleToNextGif = () => {
      // Add a small black screen transition between GIFs
      setCurrentGif(-1) // -1 represents black screen

      // After a short black screen, show the next GIF
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % gifs.length
        setCurrentGif(currentIndex)

        // Schedule the next transition after this GIF's duration
        timeoutRef.current = setTimeout(cycleToNextGif, gifDurations[currentIndex])
      }, 500) // 500ms black screen transition
    }

    // Start with the first GIF
    setCurrentGif(0)

    // Schedule first transition after the first GIF's duration
    timeoutRef.current = setTimeout(cycleToNextGif, gifDurations[0])

    // Cleanup function
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Update the render section to include a black screen state
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Black screen transition */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          currentGif === -1 ? "opacity-100" : "opacity-0"
        }`}
      />

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
