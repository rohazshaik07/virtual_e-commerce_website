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

// Export the footwear products for use in other components
export const footwearProducts = [
  {
    id: 8,
    name: "Classic White Sneakers",
    price: 464,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product8.jpg-NimEIUG0TxNmqQFl1X2ohSaS6dptp4.jpeg",
    description: "Minimalist white sneakers crafted from premium leather. Versatile footwear for any outfit.",
    category: "casual",
    slug: "classic-white-sneakers",
  },
  {
    id: 17,
    name: "Converse High Top Sneakers",
    price: 599,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maria-fernanda-pissioli-sd-VmUUrdrw-unsplash.jpg-wla4N0LfBPnVomErcVuZZSnBZBBjhM.jpeg",
    description:
      "Iconic high-top sneakers with classic canvas construction. A timeless style that goes with everything.",
    category: "casual",
    slug: "converse-high-top-sneakers",
  },
  {
    id: 18,
    name: "Leather Oxford Shoes",
    price: 899,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1470&fit=crop",
    description: "Classic leather oxford shoes with a polished finish. Perfect for formal occasions.",
    category: "formal",
    slug: "leather-oxford-shoes",
  },
  {
    id: 19,
    name: "Suede Chelsea Boots",
    price: 1299,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1635&fit=crop",
    description: "Stylish suede chelsea boots with elastic side panels. Versatile footwear for any season.",
    category: "boots",
    slug: "suede-chelsea-boots",
  },
  {
    id: 20,
    name: "Running Shoes",
    price: 799,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&fit=crop",
    description: "Lightweight running shoes with responsive cushioning. Perfect for your daily run or workout.",
    category: "athletic",
    slug: "running-shoes",
  },
  {
    id: 21,
    name: "Leather Loafers",
    price: 749,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1469&fit=crop",
    description:
      "Classic leather loafers with a comfortable fit. Effortlessly elevate any casual or semi-formal outfit.",
    category: "casual",
    slug: "leather-loafers",
  },
]

export default function FootwearShopPage() {
  // Get products from store
  const storeProducts = useProductStore((state) => state.products)

  // Get footwear products by filtering relevant categories
  const footwearStoreProducts = storeProducts.filter(
    (p) =>
      p.category === "footwear" ||
      p.category === "casual" ||
      p.category === "formal" ||
      p.category === "athletic" ||
      p.category === "boots",
  )

  // Combine hardcoded products with store products
  const allFootwearProducts = [
    ...footwearProducts,
    ...footwearStoreProducts.filter((p) => !footwearProducts.some((fp) => fp.id === p.id)),
  ]

  const [products, setProducts] = useState(allFootwearProducts)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["casual", "formal", "boots", "athletic"]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  useEffect(() => {
    let filtered = allFootwearProducts

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
            <h1 className="text-3xl font-bold">Footwear Collection</h1>
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
                    defaultValue={[0, 1500]}
                    max={1500}
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
                      defaultValue={[0, 1500]}
                      max={1500}
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
