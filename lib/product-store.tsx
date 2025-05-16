"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define the product interface
export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  slug: string
  sizes?: string[]
  colors?: string[]
  features?: string[]
  care?: string[]
  inStock?: boolean
  featured?: boolean
}

// Define the store interface
interface ProductStoreState {
  products: Product[]
  menProducts: Product[]
  womenProducts: Product[]
  footwearProducts: Product[]
  addProduct: (product: Product) => void
  updateProduct: (updatedProduct: Product) => void
  deleteProduct: (id: number) => void
  getProductById: (id: number) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
}

// Create the store
export const useProductStore = create<ProductStoreState>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: 1,
          name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
          price: 398,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product1.jpg-fPpnkxGEXHcsGcy1Az3VlQB7PMLxMd.jpeg",
          description:
            "Highlights Of Our Shirt - IDEAL FOR Men's Casual & Party Wear Shirts Men's Party Wear shirts Men's Fullsleeves Shirts Men Casual Shirts Spread Collar Shirts Full collar Slim fit shirts Best Quality Shirts Designer Shirts Latest Shirts.",
          category: "shirts",
          slug: "men-slim-fit-checkered-spread-collar-casual-shirt",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Blue"],
          features: [
            "Premium cotton blend",
            "Relaxed fit",
            "Ribbed cuffs and hem",
            "Drawstring hood",
            "Kangaroo pocket",
          ],
          care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Do not iron print"],
        },
        {
          id: 2,
          name: "Men Slim Fit Striped Spread Collar Casual Shirt",
          price: 395,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product2.jpg-soCxW6zLU4WlzR10ENp7kbOWtpGVyg.jpeg",
          description: "This shirt can be use for clubwear aslo.",
          category: "shirts",
          slug: "runaway-premium-gray",
          sizes: ["M", "XL"],
          colors: ["Blue"],
          features: ["Premium cotton blend", "Modern fit", "Ribbed cuffs and hem", "Adjustable hood", "Front pocket"],
          care: ["Machine wash cold", "Tumble dry low", "Do not bleach", "Do not iron print"],
        },
        // Add more products here
      ],
      menProducts: [],
      womenProducts: [],
      footwearProducts: [],

      addProduct: (product: Product) =>
        set((state) => {
          // Add product to main products array
          const newProducts = [...state.products, product]

          // Update category-specific product arrays
          const menProducts = newProducts.filter(
            (p) => p.category === "shirts" || p.category === "pants" || p.category === "outerwear",
          )
          const womenProducts = newProducts.filter(
            (p) => p.category === "tops" || p.category === "bottoms" || p.category === "dresses",
          )
          const footwearProducts = newProducts.filter(
            (p) => p.category === "footwear" || p.category === "casual" || p.category === "formal",
          )

          return {
            products: newProducts,
            menProducts,
            womenProducts,
            footwearProducts,
          }
        }),

      updateProduct: (updatedProduct: Product) =>
        set((state) => {
          // Update the product in the main products array
          const products = state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))

          // Update category-specific product arrays
          const menProducts = products.filter(
            (p) => p.category === "shirts" || p.category === "pants" || p.category === "outerwear",
          )
          const womenProducts = products.filter(
            (p) => p.category === "tops" || p.category === "bottoms" || p.category === "dresses",
          )
          const footwearProducts = products.filter(
            (p) => p.category === "footwear" || p.category === "casual" || p.category === "formal",
          )

          return {
            products,
            menProducts,
            womenProducts,
            footwearProducts,
          }
        }),

      deleteProduct: (id: number) =>
        set((state) => {
          // Remove the product from the main products array
          const products = state.products.filter((p) => p.id !== id)

          // Update category-specific product arrays
          const menProducts = products.filter(
            (p) => p.category === "shirts" || p.category === "pants" || p.category === "outerwear",
          )
          const womenProducts = products.filter(
            (p) => p.category === "tops" || p.category === "bottoms" || p.category === "dresses",
          )
          const footwearProducts = products.filter(
            (p) => p.category === "footwear" || p.category === "casual" || p.category === "formal",
          )

          return {
            products,
            menProducts,
            womenProducts,
            footwearProducts,
          }
        }),

      getProductById: (id: number) => {
        return get().products.find((p) => p.id === id)
      },

      getProductsByCategory: (category: string) => {
        return get().products.filter((p) => p.category === category)
      },
    }),
    {
      name: "product-store", // name of the item in localStorage
    },
  ),
)
