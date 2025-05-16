"use client"
import Image from "next/image"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div className="absolute inset-0 bg-black/70 z-10" />
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Background%20video%20Homepage-hQvg5zHaEwcDDwGf6Z7xpZK25eWZwu.mp4"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
