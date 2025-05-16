"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, FileCode, Layout, Palette, Smartphone, Zap, CuboidIcon as Cube, FileText, Folder } from "lucide-react"
import FolderTree from "@/components/folder-tree"
import { Button } from "@/components/ui/button"

// Sample folder structure data
const folderStructure = {
  name: "app",
  type: "folder",
  path: "app",
  children: [
    {
      name: "about",
      type: "folder",
      path: "app/about",
      children: [
        {
          name: "page.tsx",
          type: "file",
          path: "app/about/page.tsx",
          content: `"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="RUNAWAY Team"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4 font-signature"
            >
              Our Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl"
            >
              Crafting premium streetwear since 2018
            </motion.p>
          </div>
        </section>

        {/* Rest of the page content... */}
      </main>

      <Footer />
    </div>
  )
}`,
          explanation: [
            "This file defines the About page of the RUNAWAY website.",
            "Line 1: The 'use client' directive indicates this is a client component that runs in the browser.",
            "Lines 3-6: Import necessary components and libraries.",
            "Lines 8-67: The AboutPage component renders the entire about page structure.",
            "Lines 12-36: The hero section with a background image and animated text.",
            "Lines 14-15: Create a semi-transparent overlay on the background image.",
            "Lines 16-23: Display a background image using Next.js Image component with fill property.",
            "Lines 24-35: The content of the hero section with animated heading and subheading.",
            "Lines 27-31: Use Framer Motion to animate the heading with a fade-in and slide-up effect.",
            "Line 30: Apply the custom signature font to the heading.",
            "Lines 63-65: Include the Footer component at the bottom of the page.",
          ],
        },
      ],
    },
    {
      name: "admin",
      type: "folder",
      path: "app/admin",
      children: [
        {
          name: "orders",
          type: "folder",
          path: "app/admin/orders",
          children: [
            {
              name: "loading.tsx",
              type: "file",
              path: "app/admin/orders/loading.tsx",
              content: `export default function Loading() {
  return null
}`,
              explanation: [
                "This is a loading component for the orders page in the admin section.",
                "Line 1-3: Defines a simple Loading component that returns null.",
                "In Next.js, this file is automatically used as a loading state while the page is being generated.",
              ],
            },
            {
              name: "page.tsx",
              type: "file",
              path: "app/admin/orders/page.tsx",
              content: `"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2023-04-15",
    total: 149.99,
    status: "Delivered",
    items: 1,
  },
  // More orders...
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Filter and sort orders
  useEffect(() => {
    let filteredOrders = [...mockOrders]

    // Apply search filter
    if (searchQuery) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    filteredOrders.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof a]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number)
      }
    })

    setOrders(filteredOrders)
  }, [searchQuery, sortField, sortDirection])

  // Rest of the component...
}`,
              explanation: [
                "This file defines the Orders page in the admin section.",
                "Line 1: The 'use client' directive indicates this is a client component.",
                "Lines 3-9: Import necessary components and icons.",
                "Lines 12-22: Mock order data for demonstration purposes.",
                "Lines 24-69: The OrdersPage component that displays a list of orders with filtering and sorting functionality.",
                "Lines 25-28: State variables for orders, search query, and sorting.",
                "Lines 31-63: useEffect hook that filters and sorts orders based on search query and sort settings.",
                "Lines 34-41: Filter orders based on search query.",
                "Lines 44-58: Sort orders based on the selected field and direction.",
              ],
            },
          ],
        },
        {
          name: "products",
          type: "folder",
          path: "app/admin/products",
          children: [
            {
              name: "new",
              type: "folder",
              path: "app/admin/products/new",
              children: [
                {
                  name: "page.tsx",
                  type: "file",
                  path: "app/admin/products/new/page.tsx",
                  content: "// New product form page",
                  explanation: ["This file contains the form for adding new products in the admin section."],
                },
              ],
            },
            {
              name: "loading.tsx",
              type: "file",
              path: "app/admin/products/loading.tsx",
              content: "// Loading component",
              explanation: ["Loading component for the products page in the admin section."],
            },
            {
              name: "page.tsx",
              type: "file",
              path: "app/admin/products/page.tsx",
              content: "// Products management page",
              explanation: ["This file contains the products management interface in the admin section."],
            },
          ],
        },
        {
          name: "layout.tsx",
          type: "file",
          path: "app/admin/layout.tsx",
          content: "// Admin layout with sidebar",
          explanation: ["This file defines the layout for all admin pages, including the sidebar navigation."],
        },
        {
          name: "page.tsx",
          type: "file",
          path: "app/admin/page.tsx",
          content: "// Admin dashboard page",
          explanation: ["This file contains the main admin dashboard with statistics and overview information."],
        },
      ],
    },
    {
      name: "api",
      type: "folder",
      path: "app/api",
      children: [
        {
          name: "auth",
          type: "folder",
          path: "app/api/auth",
          children: [
            {
              name: "[...nextauth]",
              type: "folder",
              path: "app/api/auth/[...nextauth]",
              children: [
                {
                  name: "route.ts",
                  type: "file",
                  path: "app/api/auth/[...nextauth]/route.ts",
                  content: "// NextAuth configuration",
                  explanation: ["This file configures NextAuth.js for authentication."],
                },
              ],
            },
          ],
        },
        {
          name: "checkout",
          type: "folder",
          path: "app/api/checkout",
          children: [
            {
              name: "route.ts",
              type: "file",
              path: "app/api/checkout/route.ts",
              content: "// Checkout API endpoint",
              explanation: ["This file handles checkout requests and integrates with payment processors."],
            },
          ],
        },
        {
          name: "db",
          type: "folder",
          path: "app/api/db",
          children: [
            {
              name: "models",
              type: "folder",
              path: "app/api/db/models",
              children: [
                {
                  name: "BlogPost.ts",
                  type: "file",
                  path: "app/api/db/models/BlogPost.ts",
                  content: "// Blog post model",
                  explanation: ["This file defines the MongoDB schema for blog posts."],
                },
                {
                  name: "Order.ts",
                  type: "file",
                  path: "app/api/db/models/Order.ts",
                  content: "// Order model",
                  explanation: ["This file defines the MongoDB schema for orders."],
                },
                {
                  name: "Product.ts",
                  type: "file",
                  path: "app/api/db/models/Product.ts",
                  content: "// Product model",
                  explanation: ["This file defines the MongoDB schema for products."],
                },
              ],
            },
            {
              name: "connect.ts",
              type: "file",
              path: "app/api/db/connect.ts",
              content: "// Database connection utility",
              explanation: ["This file handles the connection to MongoDB."],
            },
          ],
        },
        {
          name: "products",
          type: "folder",
          path: "app/api/products",
          children: [
            {
              name: "route.ts",
              type: "file",
              path: "app/api/products/route.ts",
              content: "// Products API endpoint",
              explanation: ["This file handles CRUD operations for products."],
            },
          ],
        },
      ],
    },
    {
      name: "layout.tsx",
      type: "file",
      path: "app/layout.tsx",
      content: "// Root layout",
      explanation: ["This is the root layout that wraps all pages in the application."],
    },
    {
      name: "page.tsx",
      type: "file",
      path: "app/page.tsx",
      content: "// Homepage",
      explanation: ["This is the main homepage of the website."],
    },
  ],
}

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [animatedElements, setAnimatedElements] = useState<Element[]>([])

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 animate-on-scroll">Project Documentation</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-on-scroll">
              An in-depth look at the development process, technologies, and features of the
              <span className="inline-block mx-2 font-signature">RUNAWAY</span>
              e-commerce platform.
            </p>
          </div>

          <Tabs defaultValue="overview" className="mb-12" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
              <TabsTrigger value="features">Key Features</TabsTrigger>
              <TabsTrigger value="code-overview">Code Overview</TabsTrigger>
              <TabsTrigger value="3d-showroom">3D Showroom</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>A comprehensive look at the RUNAWAY e-commerce platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Project Vision</h3>
                    <p className="text-muted-foreground mb-4">
                      The RUNAWAY e-commerce platform was designed to bring timeless, high-quality fashion to a wider
                      audience at accessible prices. The project aims to bridge the gap between luxury aesthetics and
                      affordability, creating a premium shopping experience without the premium price tag.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Design Philosophy</h3>
                    <p className="text-muted-foreground mb-4">
                      The design follows minimalist principles with a focus on typography, whitespace, and subtle
                      animations to create an elegant, sophisticated user experience that reflects the Old Money
                      aesthetic. The color palette consists primarily of neutral tones with strategic accent colors to
                      highlight important elements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Target Audience</h3>
                    <p className="text-muted-foreground">
                      The platform caters to fashion-conscious individuals who appreciate timeless style and quality
                      craftsmanship but seek more accessible price points. The target demographic spans across age
                      groups, united by their appreciation for classic, enduring fashion rather than fleeting trends.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="animate-on-scroll">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Layout className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Responsive Design</CardTitle>
                      <CardDescription>Mobile-first approach</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The platform is fully responsive, providing an optimal viewing experience across a wide range of
                      devices from mobile phones to desktop monitors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="animate-on-scroll" style={{ transitionDelay: "0.1s" }}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Performance</CardTitle>
                      <CardDescription>Optimized for speed</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The application is optimized for performance with efficient code, lazy loading, and asset
                      optimization to ensure fast load times.
                    </p>
                  </CardContent>
                </Card>

                <Card className="animate-on-scroll" style={{ transitionDelay: "0.2s" }}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Palette className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>User Experience</CardTitle>
                      <CardDescription>Intuitive and elegant</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The user interface is designed to be intuitive and elegant, providing a seamless shopping
                      experience with minimal friction.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Technologies Tab */}
            <TabsContent value="technologies" className="space-y-8">
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle>Technology Stack</CardTitle>
                  <CardDescription>The core technologies used to build the RUNAWAY platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Frontend</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">Next.js</span>
                            <p className="text-sm text-muted-foreground">
                              React framework for server-side rendering and static site generation
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">React</span>
                            <p className="text-sm text-muted-foreground">
                              JavaScript library for building user interfaces
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">TypeScript</span>
                            <p className="text-sm text-muted-foreground">
                              Typed superset of JavaScript for improved developer experience
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">Tailwind CSS</span>
                            <p className="text-sm text-muted-foreground">
                              Utility-first CSS framework for rapid UI development
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">Framer Motion</span>
                            <p className="text-sm text-muted-foreground">Animation library for React</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Backend & Infrastructure</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">Next.js API Routes</span>
                            <p className="text-sm text-muted-foreground">Serverless functions for API endpoints</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">MongoDB</span>
                            <p className="text-sm text-muted-foreground">NoSQL database for product and user data</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">Stripe</span>
                            <p className="text-sm text-muted-foreground">Payment processing integration</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">Vercel</span>
                            <p className="text-sm text-muted-foreground">Deployment and hosting platform</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                            <FileCode className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold">NextAuth.js</span>
                            <p className="text-sm text-muted-foreground">Authentication solution for Next.js</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle>Development Tools</CardTitle>
                  <CardDescription>Tools and utilities used during the development process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3">Code & Version Control</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>VS Code</li>
                        <li>Git & GitHub</li>
                        <li>ESLint & Prettier</li>
                        <li>TypeScript</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3">Design & Prototyping</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Figma</li>
                        <li>Adobe Photoshop</li>
                        <li>Adobe Illustrator</li>
                        <li>Unsplash for stock images</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3">Testing & Deployment</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Jest</li>
                        <li>React Testing Library</li>
                        <li>Cypress</li>
                        <li>Vercel CI/CD</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-8">
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>Unique features and functionality implemented in the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Custom Loader Animation</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-muted-foreground mb-4">
                              A sophisticated custom loader was implemented to enhance the initial user experience. The
                              loader features:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              <li>Brand logo display with signature font</li>
                              <li>Randomized string generation for a tech-inspired aesthetic</li>
                              <li>Progress bar with percentage indicator</li>
                              <li>Smooth fade transitions</li>
                            </ul>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                            <div className="text-center">
                              <Code className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Custom loader implementation</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>Custom Cursor</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-muted-foreground mb-4">
                              A custom cursor was implemented to enhance the interactive experience and add a touch of
                              sophistication to the user interface. Features include:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              <li>Context-aware color adaptation based on background</li>
                              <li>Hover state animations for interactive elements</li>
                              <li>Smooth transitions between states</li>
                              <li>Optimized performance with minimal lag</li>
                            </ul>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                            <div className="text-center">
                              <Code className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Custom cursor implementation</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>GIF Background Integration</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-muted-foreground mb-4">
                              High-quality GIF backgrounds were integrated throughout the site to create an immersive
                              and dynamic user experience:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              <li>Homepage hero section with alternating GIF backgrounds</li>
                              <li>Smooth transitions between GIFs with 1-second delay</li>
                              <li>Optimized for performance with proper loading strategies</li>
                              <li>Mobile-responsive with appropriate fallbacks</li>
                            </ul>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                            <div className="text-center">
                              <Code className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">GIF background implementation</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>Responsive Design</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-muted-foreground mb-4">
                              The platform was built with a mobile-first approach to ensure optimal viewing and
                              interaction experience across all device sizes:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              <li>Fluid layouts that adapt to any screen size</li>
                              <li>Optimized navigation for mobile, tablet, and desktop</li>
                              <li>Responsive images and media</li>
                              <li>Touch-friendly interactive elements</li>
                            </ul>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                            <div className="text-center">
                              <Smartphone className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Responsive design implementation</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger>Shopping Cart System</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-muted-foreground mb-4">
                              A comprehensive shopping cart system was implemented with the following features:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              <li>Persistent cart state using local storage</li>
                              <li>Real-time cart updates and animations</li>
                              <li>Quantity adjustments and item removal</li>
                              <li>Price calculations including discounts and taxes</li>
                              <li>Seamless checkout process integration</li>
                            </ul>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-center">
                            <div className="text-center">
                              <Code className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Shopping cart implementation</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Code Overview Tab */}
            <TabsContent value="code-overview" className="space-y-8">
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle>Code Overview</CardTitle>
                  <CardDescription>Explore the project's folder and file structure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Project Structure</h3>
                    <p className="mb-6 text-muted-foreground">
                      The RUNAWAY e-commerce platform follows the Next.js App Router structure. Click on any folder or
                      file to view its contents and explanation.
                    </p>
                    <div className="bg-card/50 p-4 rounded-lg border border-border/20">
                      <FolderTree data={folderStructure} />
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Key Folders</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-bold flex items-center">
                          <Folder className="h-4 w-4 mr-2 text-blue-400" />
                          app
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2"></p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-bold flex items-center">
                          <Folder className="h-4 w-4 mr-2 text-blue-400" />
                          components
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Reusable UI components used throughout the application, including both custom components and
                          shadcn/ui components.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-bold flex items-center">
                          <Folder className="h-4 w-4 mr-2 text-blue-400" />
                          context
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          React context providers for global state management, such as the shopping cart and
                          authentication state.
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-bold flex items-center">
                          <Folder className="h-4 w-4 mr-2 text-blue-400" />
                          lib
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Utility functions and helpers used across the application, including API clients and data
                          transformers.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 3D Showroom Tab */}
            <TabsContent value="3d-showroom" className="space-y-8">
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle>3D Virtual Showroom Guide</CardTitle>
                  <CardDescription>Learn how to create and integrate a 3D showroom for your products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <Cube className="h-5 w-5 mr-2 text-primary" />
                        Introduction to 3D Showrooms
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        A 3D virtual showroom allows customers to view and interact with products in a three-dimensional
                        space, providing a more immersive shopping experience than traditional 2D images. This guide
                        will walk you through the process of creating and integrating a 3D showroom into your e-commerce
                        platform.
                      </p>
                    </div>

                    <div className="bg-muted/30 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4">Required Tools & Technologies</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-2">3D Modeling Software</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Blender (Free, open-source)</li>
                            <li>Autodesk Maya (Professional)</li>
                            <li>Cinema 4D (Professional)</li>
                            <li>SketchUp (Beginner-friendly)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">Web Technologies</h4>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Three.js (JavaScript 3D library)</li>
                            <li>React Three Fiber (React renderer for Three.js)</li>
                            <li>Drei (Useful helpers for React Three Fiber)</li>
                            <li>GLTF/GLB format for 3D models</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Step-by-Step Implementation Guide</h3>
                      <div className="space-y-6">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 1: Prepare 3D Models</h4>
                          <p className="text-muted-foreground mb-2">
                            Create or acquire 3D models of your products. For clothing items, you'll need:
                          </p>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>High-quality 3D model in GLTF/GLB format</li>
                            <li>Textures for different materials and colors</li>
                            <li>Multiple angles (front, back, sides)</li>
                            <li>Optional: animations for interactive viewing</li>
                          </ul>
                          <p className="text-muted-foreground mt-2">
                            <strong>Required information from you:</strong> Product dimensions, material details, color
                            variants, and high-resolution reference images from multiple angles.
                          </p>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 2: Set Up Three.js Environment</h4>
                          <p className="text-muted-foreground mb-2">
                            Install necessary packages and create a basic Three.js scene:
                          </p>
                          <div className="bg-card/50 p-3 rounded-md text-sm font-mono mb-2">
                            npm install three @react-three/fiber @react-three/drei
                          </div>
                          <p className="text-muted-foreground">
                            Create a component that sets up the 3D environment with proper lighting, camera, and
                            controls.
                          </p>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 3: Load and Display 3D Models</h4>
                          <p className="text-muted-foreground mb-2">Import and render your 3D models in the scene:</p>
                          <div className="bg-card/50 p-3 rounded-md text-sm font-mono mb-2">
                            {`import { useGLTF } from '@react-three/drei'
                            
function ProductModel({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
}`}
                          </div>
                          <p className="text-muted-foreground">
                            Ensure models are optimized for web performance by reducing polygon count and texture sizes.
                          </p>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 4: Add Interactive Controls</h4>
                          <p className="text-muted-foreground mb-2">
                            Implement user controls to rotate, zoom, and interact with the 3D model:
                          </p>
                          <div className="bg-card/50 p-3 rounded-md text-sm font-mono mb-2">
                            {`import { OrbitControls } from '@react-three/drei'
                            
// Inside your component
<OrbitControls 
  enableZoom={true}
  enablePan={false}
  minPolarAngle={Math.PI/4}
  maxPolarAngle={Math.PI/1.5}
/>`}
                          </div>
                          <p className="text-muted-foreground">
                            Customize controls to provide a smooth user experience while preventing awkward camera
                            angles.
                          </p>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 5: Add Lighting and Environment</h4>
                          <p className="text-muted-foreground mb-2">
                            Set up proper lighting to showcase your products:
                          </p>
                          <div className="bg-card/50 p-3 rounded-md text-sm font-mono mb-2">
                            {`import { Environment, Lightformer } from '@react-three/drei'
                            
// Inside your component
<ambientLight intensity={0.5} />
<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
<Environment preset="studio" />`}
                          </div>
                          <p className="text-muted-foreground">
                            Good lighting is crucial for showcasing materials and textures accurately.
                          </p>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 6: Implement Color/Variant Switching</h4>
                          <p className="text-muted-foreground mb-2">
                            Allow users to switch between different product colors or variants:
                          </p>
                          <div className="bg-card/50 p-3 rounded-md text-sm font-mono mb-2">
                            {`function ProductViewer({ variants }) {
  const [currentVariant, setCurrentVariant] = useState(0)
  
  return (
    <>
      <div className="controls">
        {variants.map((variant, index) => (
          <button 
            key={index}
            onClick={() => setCurrentVariant(index)}
            style={{ backgroundColor: variant.color }}
          />
        ))}
      </div>
      <Canvas>
        <ProductModel url={variants[currentVariant].modelUrl} />
        {/* Other scene elements */}
      </Canvas>
    </>
  )
}`}
                          </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 7: Optimize for Performance</h4>
                          <p className="text-muted-foreground mb-2">Implement performance optimizations:</p>
                          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Use compressed textures (WebP format)</li>
                            <li>Implement level of detail (LOD) for complex models</li>
                            <li>Use lazy loading for 3D models</li>
                            <li>Add loading indicators for better user experience</li>
                          </ul>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-bold mb-2">Step 8: Integrate with Product Pages</h4>
                          <p className="text-muted-foreground mb-2">
                            Add a toggle button to switch between 2D images and 3D viewer:
                          </p>
                          <div className="bg-card/50 p-3 rounded-md text-sm font-mono mb-2">
                            {`function ProductDisplay({ product }) {
  const [viewMode, setViewMode] = useState('2d')
  
  return (
    <div className="product-display">
      <div className="view-controls">
        <button onClick={() => setViewMode('2d')}>View Photos</button>
        <button onClick={() => setViewMode('3d')}>View 3D Model</button>
      </div>
      
      {viewMode === '2d' ? (
        <ProductImages images={product.images} />
      ) : (
        <ProductViewer model={product.modelUrl} variants={product.variants} />
      )}
    </div>
  )
}`}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Demo Showroom</h3>
                      <div className="bg-muted/30 p-6 rounded-xl">
                        <p className="text-muted-foreground mb-4">
                          Below is a simple demo of a 3D product viewer. This is a basic implementation that can be
                          expanded with more features as needed.
                        </p>
                        <div className="h-[400px] bg-black/50 rounded-lg flex items-center justify-center">
                          <p className="text-center text-muted-foreground">
                            3D Viewer Demo
                            <br />
                            <span className="text-sm">(Provide product details to implement a custom demo)</span>
                          </p>
                        </div>
                        <div className="mt-4 flex justify-center">
                          <Button className="rounded-lg">View Sample Code</Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        Required Information for Implementation
                      </h3>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="text-muted-foreground mb-4">
                          To create a custom 3D showroom for your products, please provide the following information:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>
                            <strong>Product Specifications:</strong> Detailed measurements, materials, and design
                            features
                          </li>
                          <li>
                            <strong>Reference Images:</strong> High-resolution photos from multiple angles (front, back,
                            sides, details)
                          </li>
                          <li>
                            <strong>Color Variants:</strong> Color codes (HEX/RGB) for all available product variants
                          </li>
                          <li>
                            <strong>Special Features:</strong> Any unique aspects of the product that should be
                            highlighted
                          </li>
                          <li>
                            <strong>Existing 3D Models:</strong> If you already have 3D models, provide them in GLTF/GLB
                            format
                          </li>
                        </ul>
                        <div className="mt-4">
                          <Button className="rounded-lg">Submit Product Information</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Interactive Navigation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 bg-muted/30 backdrop-blur-sm rounded-xl border border-border/20 p-8 md:p-12 animate-on-scroll"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-signature">Explore RUNAWAY</h2>
              <p className="text-muted-foreground mb-8">
                Navigate through the different sections of the RUNAWAY platform to experience the full range of features
                and functionality.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <a href="/" className="p-4 border border-border/20 rounded-lg hover:bg-card/30 transition-colors">
                  <h3 className="font-bold mb-2">Homepage</h3>
                  <p className="text-sm text-muted-foreground">Explore the main landing page with GIF backgrounds</p>
                </a>
                <a href="/shop" className="p-4 border border-border/20 rounded-lg hover:bg-card/30 transition-colors">
                  <h3 className="font-bold mb-2">Shop</h3>
                  <p className="text-sm text-muted-foreground">Browse our collection of timeless pieces</p>
                </a>
                <a href="/about" className="p-4 border border-border/20 rounded-lg hover:bg-card/30 transition-colors">
                  <h3 className="font-bold mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">Learn about our story and values</p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
