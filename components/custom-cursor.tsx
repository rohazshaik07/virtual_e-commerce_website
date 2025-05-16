"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isOverDarkBg, setIsOverDarkBg] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })

      // Check if cursor is over a dark or light element to change color
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor
        // Simple check - if the background has high RGB values, it's likely light
        if (bgColor.includes("rgb")) {
          const rgbValues = bgColor.match(/\d+/g)
          if (rgbValues && rgbValues.length >= 3) {
            const [r, g, b] = rgbValues.map(Number)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000
            setIsOverDarkBg(brightness < 128)
          }
        } else {
          // Default to theme-based color if we can't determine
          setIsOverDarkBg(theme === "dark")
        }
      }
    }

    window.addEventListener("mousemove", mouseMove)

    // Add event listeners for cursor states
    const links = document.querySelectorAll("a, button")

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => setCursorVariant("hover"))
      link.addEventListener("mouseleave", () => setCursorVariant("default"))
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => setCursorVariant("hover"))
        link.removeEventListener("mouseleave", () => setCursorVariant("default"))
      })
    }
  }, [theme])

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: `2px solid ${isOverDarkBg ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"}`,
      transition: { type: "tween", ease: "backOut", duration: 0.1 }, // Faster cursor response
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: `2px solid ${isOverDarkBg ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"}`,
      transition: { type: "tween", ease: "backOut", duration: 0.1 }, // Faster cursor response
    },
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
      />
    </>
  )
}
