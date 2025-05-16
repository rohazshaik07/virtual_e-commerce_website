"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CustomLoaderProps {
  onLoadingComplete?: () => void
}

export default function CustomLoader({ onLoadingComplete }: CustomLoaderProps) {
  const [randomString, setRandomString] = useState("")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Generate random 8-character string
  const generateRandomString = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  useEffect(() => {
    // Rapidly change the random string
    const stringInterval = setInterval(() => {
      setRandomString(generateRandomString())
    }, 100)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 200)

    // Complete the loading after progress reaches 100%
    const checkCompletion = setInterval(() => {
      if (loadingProgress >= 100) {
        clearInterval(stringInterval)
        clearInterval(checkCompletion)

        // Set final state and trigger callback after a short delay
        setTimeout(() => {
          setIsComplete(true)
          if (onLoadingComplete) {
            onLoadingComplete()
          }
        }, 1000)
      }
    }, 100)

    return () => {
      clearInterval(stringInterval)
      clearInterval(progressInterval)
      clearInterval(checkCompletion)
    }
  }, [loadingProgress, onLoadingComplete])

  if (isComplete) return null

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Large RUNAWAY Text with unique font */}
      <div className="mb-8 text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight rowdies-bold">RUNAWAY</h1>
      </div>

      {/* Loading text */}
      <div className="text-white font-mono text-center mb-6">
        <div className="mb-2">LOADING_SYSTEM: {randomString}</div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/20 mb-2 relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Percentage */}
      <div className="text-white font-mono text-sm">{loadingProgress}%</div>
    </motion.div>
  )
}
