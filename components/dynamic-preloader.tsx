"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function DynamicPreloader() {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [randomString, setRandomString] = useState("")
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
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsImageLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isImageLoaded) return

    // Rapidly change the random string
    const interval = setInterval(() => {
      setRandomString(generateRandomString())
    }, 50)

    // Complete the preloader after some time
    const completeTimer = setTimeout(() => {
      setIsComplete(true)
      clearInterval(interval)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(completeTimer)
    }
  }, [isImageLoaded])

  if (isComplete) return null

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isImageLoaded ? (
        // Placeholder for the image (since no specific image was provided)
        <div className="w-32 h-32 relative">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="SDFM Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      ) : (
        // Random string animation
        <motion.div
          className="text-4xl font-mono font-bold tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {randomString}
        </motion.div>
      )}
    </motion.div>
  )
}
