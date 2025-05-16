"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  quantity?: number
}

interface CartContextType {
  cart: Product[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Update localStorage and cart metrics whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0)
    setCartCount(count)

    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    setCartTotal(total)
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // If product already exists in cart, increase quantity
        const updatedCart = [...prevCart]
        const existingItem = updatedCart[existingItemIndex]
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1,
        }
        return updatedCart
      } else {
        // Add new product to cart with quantity 1
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
