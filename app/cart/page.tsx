"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "sdfm10") {
      setDiscount(cartTotal * 0.1)
    } else {
      setDiscount(0)
    }
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} />
              </div>
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={() => router.push("/shop")} className="rounded-lg">
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 overflow-hidden">
                <div className="p-6">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-border/10 last:border-0"
                    >
                      <div className="sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-medium hover:underline">{item.name}</h3>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-2">
                          ₹{item.price.toFixed(2)} x {item.quantity}
                        </p>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center">
                        <p className="font-medium mr-4">₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{(cartTotal - discount).toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="rounded-lg"
                    />
                    <Button variant="outline" className="rounded-lg" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                  {promoCode && !discount && <p className="text-sm text-destructive mt-2">Invalid promo code</p>}
                  {discount > 0 && <p className="text-sm text-green-500 mt-2">Promo code applied successfully!</p>}
                </div>

                <Button className="w-full rounded-lg" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Button variant="link" onClick={() => router.push("/shop")}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
