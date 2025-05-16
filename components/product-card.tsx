"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description?: string
  slug?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      className="bg-card/50 backdrop-blur-sm group rounded-xl overflow-hidden border border-border/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug || product.id}`} passHref>
        <div className="relative overflow-hidden">
          <div className="aspect-square bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? "scale-125" : "scale-100"
              }`}
            />
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug || product.id}`}>
          <h3 className="text-lg font-medium hover:underline">
            <span className="rowdies-regular">{product.name.includes("RUNAWAY") ? product.name : product.name}</span>
          </h3>
        </Link>
        <p className="text-lg mt-1">₹{product.price.toLocaleString("en-IN")}</p>

        <Button
          className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  )
}
