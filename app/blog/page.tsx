"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { toast } from "sonner"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Fashion",
    excerpt: "Discover how SDFM is leading the way in sustainable fashion practices and ethical manufacturing.",
    date: "April 15, 2023",
    author: "Alex Johnson",
    category: "Sustainability",
    image: "/placeholder.svg?height=600&width=800", // Comment: Replace with your actual blog post image
    slug: "future-of-sustainable-fashion",
  },
  {
    id: 2,
    title: "Streetwear Trends for 2023",
    excerpt: "Explore the latest streetwear trends and how to incorporate them into your personal style.",
    date: "March 22, 2023",
    author: "Jamie Smith",
    category: "Trends",
    image: "/placeholder.svg?height=600&width=800", // Comment: Replace with your actual blog post image
    slug: "streetwear-trends-2023",
  },
  {
    id: 3,
    title: "Behind the Scenes: SDFM Design Process",
    excerpt: "Get an exclusive look at how our design team creates each piece in our collection.",
    date: "February 10, 2023",
    author: "Taylor Wong",
    category: "Design",
    image: "/placeholder.svg?height=600&width=800", // Comment: Replace with your actual blog post image
    slug: "behind-the-scenes-design-process",
  },
  {
    id: 4,
    title: "How to Style Your SDFM Hoodie",
    excerpt: "Creative ways to style your SDFM hoodie for different occasions and seasons.",
    date: "January 5, 2023",
    author: "Morgan Lee",
    category: "Style Guide",
    image: "/placeholder.svg?height=600&width=800", // Comment: Replace with your actual blog post image
    slug: "how-to-style-sdfm-hoodie",
  },
  {
    id: 5,
    title: "The History of Streetwear",
    excerpt: "A deep dive into the origins and evolution of streetwear fashion over the decades.",
    date: "December 12, 2022",
    author: "Alex Johnson",
    category: "History",
    image: "/placeholder.svg?height=600&width=800", // Comment: Replace with your actual blog post image
    slug: "history-of-streetwear",
  },
  {
    id: 6,
    title: "Collaborations: The Future of Fashion",
    excerpt: "How brand collaborations are reshaping the fashion industry and creating unique products.",
    date: "November 8, 2022",
    author: "Jamie Smith",
    category: "Industry",
    image: "/placeholder.svg?height=600&width=800", // Comment: Replace with your actual blog post image
    slug: "collaborations-future-of-fashion",
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">SDFM Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, trends, and stories from the world of premium streetwear.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10 rounded-lg w-full md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                className="rounded-lg"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="rounded-lg"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Post with Animated GIF Background */}
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <div className="group relative rounded-xl overflow-hidden">
                <div className="aspect-[2/1] bg-muted relative">
                  {/* Comment: Replace with your actual featured blog post image */}
                  <Image
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Animated GIF overlay */}
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                    <img
                      src="https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif"
                      alt="Blog Animation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                    {blogPosts[0].category}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{blogPosts[0].title}</h2>
                  <p className="text-white/80 mb-4 max-w-3xl">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center text-white/60 text-sm">
                    <span>{blogPosts[0].date}</span>
                    <span className="mx-2">•</span>
                    <span>By {blogPosts[0].author}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-card/30 backdrop-blur-sm rounded-xl overflow-hidden border border-border/20"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-[3/2] bg-muted relative overflow-hidden">
                      {/* Comment: Replace with your actual blog post image */}
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold mb-2 hover:underline">{post.title}</h3>
                    </Link>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>By {post.author}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-16">
            <div className="flex space-x-2">
              <Button variant="outline" className="rounded-lg" disabled>
                Previous
              </Button>
              <Button variant="outline" className="rounded-lg bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" className="rounded-lg">
                2
              </Button>
              <Button variant="outline" className="rounded-lg">
                3
              </Button>
              <Button variant="outline" className="rounded-lg">
                Next
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-20 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/20 p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-8">
                Stay updated with the latest trends, new releases, and exclusive content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Your email address" className="rounded-lg" name="email" />
                <Button
                  className="rounded-lg"
                  onClick={() => {
                    console.log("Newsletter subscription to be sent to: shaikrohaz@gmail.com")
                    toast({
                      title: "Subscribed!",
                      description: "Thank you for subscribing to our newsletter.",
                    })
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
