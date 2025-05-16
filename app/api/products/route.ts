import { NextResponse } from "next/server"

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

export async function GET() {
  try {
    // Simulate a delay to mimic a real API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
