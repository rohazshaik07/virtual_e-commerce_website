"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import CustomCursor from "@/components/custom-cursor"
import ProductCard from "@/components/product-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import CustomLoader from "@/components/custom-loader"
import GifBackground from "@/components/gif-background"
import AdUnit from "@/components/ad-unit"
import EnhancedThreeJsViewer from "@/components/enhanced-three-js-viewer"

// Product data
const products = [
  {
    id: 1,
    name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
    price: 398,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product1.jpg-fPpnkxGEXHcsGcy1Az3VlQB7PMLxMd.jpeg",
    description:
      "Highlights Of Our Shirt - IDEAL FOR Men's Casual & Party Wear Shirts Men's Party Wear shirts Men's Fullsleeves Shirts Men Casual Shirts Spread Collar Shirts Full collar Slim fit shirts Best Quality Shirts Designer Shirts Latest Shirts.",
    slug: "Men Slim Fit Checkered Spread Collar Casual Shirt",
  },
  {
    id: 2,
    name: "Men Slim Fit Striped Spread Collar Casual Shirt",
    price: 395,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product2.jpg-soCxW6zLU4WlzR10ENp7kbOWtpGVyg.jpeg",
    description: "This shirt can be use for clubwear aslo.",
    slug: "runaway-premium-gray",
  },
  {
    id: 3,
    name: "Men Solid Polo Neck Polyester White T-Shirt",
    price: 275,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product3.jpg-1jqDGSia1aWgpmNcCvCpsNw5B38OdY.jpeg",
    description: "Mens Collar Tshirt With Zippers Premium Quality Tshirt Casual Wear Party Wear Tshirt",
    slug: "runaway-signature-navy",
  },
  {
    id: 4,
    name: "RUNAWAY Brown Linen Overshirt",
    price: 289,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product4.jpg-ohx9ZVxs9QPvNk4ZqHp15Jybxsd0V0.jpeg",
    description:
      "The RUNAWAY Limited Edition Overshirt is a collector's item featuring exclusive design elements. Crafted from premium materials for exceptional comfort and style. Features a relaxed fit with ribbed cuffs and hem, a drawstring hood, and a kangaroo pocket. Made from 80% cotton and 20% polyester.",
    slug: "runaway-limited-edition",
  },
]

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { cartCount } = useCart()
  const productsRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const animatedElements = useRef<HTMLElement[]>([])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

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

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <CustomCursor />

      {isLoading ? (
        <CustomLoader onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <GifBackground />

          <div className="relative z-10">
            <Header />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-4 kanit-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Timeless Elegance
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Old Money Aesthetic at Accessible Prices
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2 rounded-lg"
                  onClick={scrollToProducts}
                >
                  SHOP
                </Button>
              </motion.div>
            </section>

            {/* Categories Section */}
            <section className="py-16 px-4 bg-background">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-on-scroll kanit-bold">
                  Shop by Category
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    className="relative h-80 rounded-xl overflow-hidden group cursor-pointer animate-on-scroll"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => router.push("/shop/men")}
                  >
                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute inset-0">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rayul-_M6gy9oHgII-unsplash.jpg-7Irgo1CxWd0MpNSWHKCNXnHByufTSh.jpeg"
                        alt="Men's Collection"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <h3 className="text-3xl font-bold text-white kanit-bold">MEN</h3>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative h-80 rounded-xl overflow-hidden group cursor-pointer animate-on-scroll"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    style={{ transitionDelay: "0.1s" }}
                    onClick={() => router.push("/shop/women")}
                  >
                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute inset-0">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mike-von-V4cl7_0N2mc-unsplash.jpg-T8mE2tZGzG2DyVb6bB8QVorxZwjS1a.jpeg"
                        alt="Women's Collection"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <h3 className="text-3xl font-bold text-white kanit-bold">WOMEN</h3>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative h-80 rounded-xl overflow-hidden group cursor-pointer animate-on-scroll"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    style={{ transitionDelay: "0.2s" }}
                    onClick={() => router.push("/shop/footwear")}
                  >
                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute inset-0">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maria-fernanda-pissioli-sd-VmUUrdrw-unsplash.jpg-GpLoo4L2nziVOVjv3NzlOyh7BmfRUn.jpeg"
                        alt="Footwear Collection"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <h3 className="text-3xl font-bold text-white kanit-bold">FOOTWEAR</h3>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Products Section */}
            <section ref={productsRef} id="latest-collection" className="py-20 px-4 bg-background">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll kanit-bold">
                  Timeless Collection
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.map((product, index) => (
                    <div key={product.id} className="animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Ad Unit after Products Section */}
            <div className="py-10 px-4 bg-background">
              <div className="max-w-7xl mx-auto">
                <AdUnit
                  slot="1234567890"
                  style={{ minHeight: "250px", width: "100%" }}
                  className="bg-muted/30 rounded-lg overflow-hidden"
                />
              </div>
            </div>

            {/* 3D Visualization Section with Gradient Background */}
            <section className="py-20 px-4 relative overflow-hidden gradient-showroom-new">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-slow-spin">
                  <div className="absolute top-[40%] left-[45%] w-[30%] h-[30%] rounded-full bg-white/5 blur-3xl"></div>
                  <div className="absolute top-[30%] left-[25%] w-[20%] h-[20%] rounded-full bg-white/10 blur-2xl"></div>
                  <div className="absolute top-[70%] left-[65%] w-[25%] h-[25%] rounded-full bg-white/5 blur-3xl"></div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-on-scroll kanit-bold">Virtual Showroom</h2>
                <p className="text-lg mb-12 max-w-2xl mx-auto animate-on-scroll">
                  Experience our premium quality garments with timeless designs that embody the Old Money aesthetic.
                </p>
                <div className="h-[400px] bg-background/20 backdrop-blur-md rounded-xl border border-border/50 overflow-hidden relative animate-on-scroll">
                  <EnhancedThreeJsViewer modelPath="/models/hoodie.glb" autoRotate={true} />
                </div>
              </div>
            </section>

            {/* Sustainability Section */}
            <section className="py-20 px-4 bg-background">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-on-scroll kanit-bold">
                  Our Commitment to Quality
                </h2>
                <p className="text-lg mb-12 max-w-2xl mx-auto animate-on-scroll">
                  We believe that luxury shouldn't be exclusive. Our garments combine premium materials and
                  craftsmanship at prices accessible to all, bringing the timeless Old Money aesthetic to a wider
                  audience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="p-6 border border-border/20 rounded-xl bg-card/30 backdrop-blur-sm animate-on-scroll">
                    <h3 className="text-xl font-bold mb-4 kanit-bold">Premium Materials</h3>
                    <p>Carefully selected fabrics that stand the test of time while providing exceptional comfort</p>
                  </div>
                  <div
                    className="p-6 border border-border/20 rounded-xl bg-card/30 backdrop-blur-sm animate-on-scroll"
                    style={{ transitionDelay: "0.1s" }}
                  >
                    <h3 className="text-xl font-bold mb-4 kanit-bold">Ethical Production</h3>
                    <p>Fair wages and safe working conditions for all our artisans and production partners</p>
                  </div>
                  <div
                    className="p-6 border border-border/20 rounded-xl bg-card/30 backdrop-blur-sm animate-on-scroll"
                    style={{ transitionDelay: "0.2s" }}
                  >
                    <h3 className="text-xl font-bold mb-4 kanit-bold">Timeless Design</h3>
                    <p>Classic silhouettes and enduring styles that transcend seasonal trends</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Ad Unit before Footer */}
            <div className="py-10 px-4 bg-background">
              <div className="max-w-7xl mx-auto">
                <AdUnit
                  slot="0987654321"
                  style={{ minHeight: "90px", width: "100%" }}
                  className="bg-muted/30 rounded-lg overflow-hidden"
                />
              </div>
            </div>

            <Footer />
          </div>
        </>
      )}

      {/* Floating Cart Button */}
      {cartCount > 0 && !isLoading && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => router.push("/cart")}
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center relative"
          >
            <ShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {cartCount}
            </span>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
