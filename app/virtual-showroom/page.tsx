"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
// Make sure the import path is correct
import EnhancedThreeJsViewer from "@/components/enhanced-three-js-viewer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Info, RotateCcw, ZoomIn } from "lucide-react"

// Sample product for the 3D viewer
const product = {
  id: 101,
  name: "Premium Hoodie",
  price: 899,
  description:
    "Experience our premium quality hoodie with timeless design that embodies the Old Money aesthetic. Crafted from the finest materials for exceptional comfort and durability.",
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Black", "Navy", "Gray", "White"],
  features: ["Premium cotton blend", "Relaxed fit", "Ribbed cuffs and hem", "Drawstring hood", "Kangaroo pocket"],
}

export default function VirtualShowroomPage() {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>("Black")
  const [quantity, setQuantity] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const [currentModel, setCurrentModel] = useState("/models/hoodie.glb") // Default model
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading the 3D environment
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    addToCart({
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedColor}, ${selectedSize}) has been added to your cart.`,
    })
  }

  const changeColor = (color: string) => {
    setSelectedColor(color)
    // In a real implementation, we would load different models or textures based on color
    // For this demo, we'll just show a toast
    toast({
      title: "Color changed",
      description: `Viewing ${product.name} in ${color}`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Virtual Showroom</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 3D Viewer */}
            <div className="bg-gradient-to-b from-black/50 to-black/80 rounded-xl overflow-hidden border border-border/20">
              <div className="aspect-square relative">
                {isLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground">Loading 3D Model...</p>
                  </div>
                ) : (
                  <EnhancedThreeJsViewer autoRotate={autoRotate} />
                )}
              </div>
              <div className="p-4 flex justify-between">
                <Button variant="outline" size="sm" className="rounded-lg" onClick={() => setAutoRotate(!autoRotate)}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {autoRotate ? "Stop Rotation" : "Auto Rotate"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() =>
                    toast({
                      title: "Zoom Feature",
                      description: "Use mouse wheel to zoom in and out. Click and drag to rotate the view.",
                    })
                  }
                >
                  <ZoomIn className="mr-2 h-4 w-4" />
                  Zoom Controls
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-2xl font-semibold mb-6">₹{product.price.toLocaleString("en-IN")}</p>

              <p className="text-muted-foreground mb-8">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className="rounded-lg px-4"
                      onClick={() => changeColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
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

              {/* Add to Cart Button */}
              <Button className="w-full mb-8 rounded-lg" size="lg" onClick={handleAddToCart}>
                Add to Cart - ₹{product.price.toLocaleString("en-IN")}
              </Button>

              {/* Product Information Tabs */}
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-lg">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="help">3D Help</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="pt-4">
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <p>
                      Our premium hoodie is crafted from a blend of 80% cotton and 20% polyester for the perfect balance
                      of comfort and durability.
                    </p>
                    <p>
                      The relaxed fit provides a comfortable, laid-back style while maintaining a refined silhouette
                      that embodies the Old Money aesthetic.
                    </p>
                    <p>
                      Available in multiple colors, each hoodie is carefully dyed to achieve rich, long-lasting color
                      that won't fade with washing.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="help" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <p>Use your mouse to interact with the 3D model:</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Click and drag to rotate the view</li>
                      <li>Scroll to zoom in and out</li>
                      <li>Use the Auto Rotate button to toggle automatic rotation</li>
                    </ul>
                    <p className="text-muted-foreground text-sm mt-4">
                      Note: 3D viewing experience may vary based on your device performance.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">About Our 3D Showroom</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/20">
                <h3 className="text-xl font-bold mb-4">Immersive Experience</h3>
                <p className="text-muted-foreground">
                  Our 3D showroom allows you to examine products from every angle, giving you a better understanding of
                  the design, texture, and details before making a purchase.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/20">
                <h3 className="text-xl font-bold mb-4">Accurate Representation</h3>
                <p className="text-muted-foreground">
                  Each 3D model is created with precision to accurately represent the actual product, ensuring what you
                  see is what you'll get when your order arrives.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/20">
                <h3 className="text-xl font-bold mb-4">Virtual Try-On</h3>
                <p className="text-muted-foreground">
                  Coming soon: Virtual try-on technology that will allow you to see how our products look on a
                  customizable avatar with your measurements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
