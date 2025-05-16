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
import { useProductStore } from "@/lib/product-store"

// Export the men's products for use in other components
export const menProducts = [
  {
    id: 1,
    name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
    price: 398,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product1.jpg-fPpnkxGEXHcsGcy1Az3VlQB7PMLxMd.jpeg",
    description:
      "Highlights Of Our Shirt - IDEAL FOR Men's Casual & Party Wear Shirts Men's Party Wear shirts Men's Fullsleeves Shirts Men Casual Shirts Spread Collar Shirts Full collar Slim fit shirts Best Quality Shirts Designer Shirts Latest Shirts.",
    category: "shirts",
    slug: "men-slim-fit-checkered-spread-collar-casual-shirt",
  },
  {
    id: 2,
    name: "Men Slim Fit Striped Spread Collar Casual Shirt",
    price: 395,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product2.jpg-soCxW6zLU4WlzR10ENp7kbOWtpGVyg.jpeg",
    description: "This shirt can be use for clubwear aslo.",
    category: "shirts",
    slug: "men-slim-fit-striped-spread-collar-casual-shirt",
  },
  {
    id: 5,
    name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
    price: 398,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product5.jpg-3Syk9SC4RxS5DxMgHRX7V5CkMfCjZm.jpeg",
    description:
      "Casual Shirt has a Speard collar , long sleeves with button cuffs , full buttoned placket on the front, Curved. Pair this along with a good pair of denim or chinos and loafers / Espadrilles for a Sharp and Dapper look .",
    category: "shirts",
    slug: "beige-checkered-shirt",
  },
  {
    id: 6,
    name: "Men Loose Fit Mid Rise Black Jeans",
    price: 489,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product6.jpg-UCtw9jJrWNmIpOSYT1Rtjh1pzU13oW.jpeg",
    description:
      "Denim Solid Baggy Jeans For Men And Boys, You Can Completely Reinvent Your Wardrobe Essentials Thanks To Their Comfort, Relaxed Fit, And Versatility.",
    category: "pants",
    slug: "black-wide-leg-jeans",
  },
  {
    id: 7,
    name: "Black Side-Stripe Trousers",
    price: 317,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product7.jpg-rX4y5jRJuSZFKcGmh7BROf0Z3tMtHc.jpeg",
    description: "Elegant black trousers with white side stripe. Perfect for casual and semi-formal occasions.",
    category: "pants",
    slug: "black-side-stripe-trousers",
  },
  {
    id: 9,
    name: "Men's Premium Cotton T-Shirt",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product3.jpg-1jqDGSia1aWgpmNcCvCpsNw5B38OdY.jpeg",
    description: "Ultra-soft premium cotton t-shirt with a relaxed fit. Perfect for everyday wear.",
    category: "tees",
    slug: "mens-premium-cotton-tshirt",
  },
  {
    id: 10,
    name: "Men's Casual Bomber Jacket",
    price: 899,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product4.jpg-ohx9ZVxs9QPvNk4ZqHp15Jybxsd0V0.jpeg",
    description: "Stylish bomber jacket with ribbed cuffs and hem. Perfect for layering in cooler weather.",
    category: "outerwear",
    slug: "mens-casual-bomber-jacket",
  },
]

export default function MenShopPage() {
  // Get products from store
  const storeProducts = useProductStore((state) => state.products)

  // Get men's products by filtering relevant categories
  const menStoreProducts = storeProducts.filter(
    (p) => p.category === "shirts" || p.category === "pants" || p.category === "outerwear" || p.category === "tees",
  )

  // Combine hardcoded products with store products
  const allMenProducts = [...menProducts, ...menStoreProducts.filter((p) => !menProducts.some((mp) => mp.id === p.id))]

  const [products, setProducts] = useState(allMenProducts)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["outerwear", "shirts", "tees", "pants"]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  useEffect(() => {
    let filtered = allMenProducts

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
            <h1 className="text-3xl font-bold">Men's Collection</h1>
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
