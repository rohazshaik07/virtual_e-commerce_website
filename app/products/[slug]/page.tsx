"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Heart, Minus, Plus, Share2 } from "lucide-react"
import ProductCard from "@/components/product-card"

// Mock product data
const products = [
  {
    id: 1,
    name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
    price: 398,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product1.jpg-fPpnkxGEXHcsGcy1Az3VlQB7PMLxMd.jpeg",
    description:
      "Highlights Of Our Shirt - IDEAL FOR Men's Casual & Party Wear Shirts Men's Party Wear shirts Men's Fullsleeves Shirts Men Casual Shirts Spread Collar Shirts Full collar Slim fit shirts Best Quality Shirts Designer Shirts Latest Shirts.",
    category: "Shirt",
    slug: "Men Slim Fit Checkered Spread Collar Casual Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue"],
    features: ["Premium cotton blend", "Relaxed fit", "Ribbed cuffs and hem", "Drawstring hood", "Kangaroo pocket"],
    care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Do not iron print"],
  },
  {
    id: 2,
    name: "Men Slim Fit Striped Spread Collar Casual Shirt",
    price: 395,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product2.jpg-soCxW6zLU4WlzR10ENp7kbOWtpGVyg.jpeg",
    description:
      "This shirt can be use for clubwear aslo.",
    category: "Shirt",
    slug: "runaway-premium-gray",
    sizes: ["M", "XL"],
    colors: ["Blue"],
    features: ["Premium cotton blend", "Modern fit", "Ribbed cuffs and hem", "Adjustable hood", "Front pocket"],
    care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Do not iron print"],
  },
  {
    id: 3,
    name: "Men Solid Polo Neck Polyester White T-Shirt",
    price: 275,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product3.jpg-1jqDGSia1aWgpmNcCvCpsNw5B38OdY.jpeg",
    description:
      "Mens Collar Tshirt With Zippers Premium Quality Tshirt Casual Wear Party Wear Tshirt",
    category: "T-shirt",
    slug: "runaway-signature-navy",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White,Blue,Navy Blue, Dark Pista, Dark Wine"],
    features: ["Premium cotton blend", "Contemporary fit", "Ribbed details", "Adjustable hood", "Kangaroo pocket"],
    care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Do not iron print"],
  },
  {
    id: 4,
    name: "RUNAWAY Brown Linen Overshirt",
    price: 289,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product4.jpg-ohx9ZVxs9QPvNk4ZqHp15Jybxsd0V0.jpeg",
    description:
      "The RUNAWAY Limited Edition Overshirt is a collector's item featuring exclusive design elements. Crafted from premium materials for exceptional comfort and style. Features a relaxed fit with ribbed cuffs and hem, a drawstring hood, and a kangaroo pocket. Made from 80% cotton and 20% polyester.",
    category: "Overshirt",
    slug: "runaway-limited-edition",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray"],
    features: [
      "Limited edition design",
      "Premium cotton blend",
      "Relaxed fit",
      "Ribbed cuffs and hem",
      "Drawstring hood",
      "Kangaroo pocket",
    ],
    care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Do not iron print"],
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [showViewer, setShowViewer] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Element[]>([])

  // Find product by slug or id, with fallback to first product
  const product = products.find((p) => p.slug === params.slug || p.id.toString() === params.slug) || products[0]

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      // Get all elements with the animate-on-scroll class
      const elements = document.querySelectorAll(".animate-on-scroll")

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("visible")
        } else {
          element.classList.remove("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    if (product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      })
      return
    }

    addToCart({
      ...product,
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="animate-on-scroll">
              <div className="bg-muted rounded-xl overflow-hidden mb-4">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={600}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      showViewer ? "scale-150" : "scale-100"
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" className="rounded-lg" onClick={() => setShowViewer(!showViewer)}>
                  {showViewer ? "Normal View" : "Zoom In"}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <h1 className="text-3xl font-bold mb-2 font-signature">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">₹{product.price.toLocaleString("en-IN")}</p>

              <p className="text-muted-foreground mb-8">{product.description}</p>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="rounded-lg w-12 h-12"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        className="rounded-lg px-4"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-lg rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} />
                  </Button>
                  <div className="w-16 h-10 flex items-center justify-center border-y border-border">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-lg rounded-l-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button className="w-full mb-8 rounded-lg" size="lg" onClick={handleAddToCart}>
                Add to Cart - ₹{(product.price * quantity).toLocaleString("en-IN")}
              </Button>

              {/* Product Information Tabs */}
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-lg">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="care">Care</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="care" className="pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {product.care.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="pt-4">
                  <div className="space-y-4">
                    <p>Free standard shipping on all orders over ₹5,000.</p>
                    <p>Standard shipping (3-5 business days): ₹299</p>
                    <p>Express shipping (1-2 business days): ₹599</p>
                    <p>International shipping available to select countries.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Similar Products */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 animate-on-scroll">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct, index) => (
                  <div
                    key={relatedProduct.id}
                    className="animate-on-scroll"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={relatedProduct} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
