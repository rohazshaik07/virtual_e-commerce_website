"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AdUnitProps {
  slot: string
  format?: "auto" | "fluid" | "rectangle" | "vertical"
  responsive?: boolean
  style?: React.CSSProperties
  className?: string
}

export default function AdUnit({ slot, format = "auto", responsive = true, style = {}, className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current && adRef.current.innerHTML === "") {
      try {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error("AdSense error:", error)
      }
    }
  }, [])

  return (
    <div className={className} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client="ca-pub-1536417792282976"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  )
}
