"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, SlidersHorizontal } from "lucide-react"

// Update the women's products data with proper images
export const womenProducts = [
  {
    id: 11,
    name: "Women's Linen Crop Top",
    price: 299,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mike-von-V4cl7_0N2mc-unsplash.jpg-aWQ1WLIdph9WapIty6yqYeHpowO8X9.jpeg",
    description: "Elegant linen crop top with adjustable straps. Perfect for summer days.",
    category: "tops",
    slug: "womens-linen-crop-top",
  },
  {
    id: 12,
    name: "Women's Linen Midi Skirt",
    price: 349,
    image: "https://images.unsplash.com/photo-1551163943-3f7253a97449?q=80&w=1470&fit=crop",
    description: "Stylish linen midi skirt with button-down front. Pairs perfectly with our linen crop top.",
    category: "bottoms",
    slug: "womens-linen-midi-skirt",
  },
  {
    id: 13,
    name: "Women's Summer Dress",
    price: 599,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1446&fit=crop",
    description: "Light and airy summer dress in a flattering silhouette. Perfect for warm days.",
    category: "dresses",
    slug: "womens-summer-dress",
  },
  {
    id: 14,
    name: "Women's Casual Blazer",
    price: 899,
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1470&fit=crop",
    description: "Versatile casual blazer that elevates any outfit. Perfect for work or evening outings.",
    category: "outerwear",
    slug: "womens-casual-blazer",
  },
  {
    id: 15,
    name: "Women's High-Waisted Jeans",
    price: 499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1374&fit=crop",
    description: "Classic high-waisted jeans with a comfortable stretch fit. A wardrobe essential.",
    category: "bottoms",
    slug: "womens-high-waisted-jeans",
  },
  {
    id: 16,
    name: "Women's Silk Blouse",
    price: 649,
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1470&fit=crop",
    description: "Luxurious silk blouse with a relaxed fit. Elevates any outfit with effortless elegance.",
    category: "tops",
    slug: "womens-silk-blouse",
  },
]

export default function WomenShopPage() {
  const [products, setProducts] = useState(womenProducts)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["tops", "bottoms", "dresses", "outerwear"]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  useEffect(() => {
    let filtered = womenProducts

    // Filter by price
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    setProducts(filtered)
  }, [priceRange, selectedCategories])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Women's Collection</h1>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-lg"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24 bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20">
                <h2 className="text-xl font-semibold mb-6">Filters</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={category} className="capitalize">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Mobile Filters */}
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 mb-8"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                      <SlidersHorizontal size={16} />
                    </Button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Price Range</h3>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Categories</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <Label htmlFor={`mobile-${category}`} className="capitalize">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
