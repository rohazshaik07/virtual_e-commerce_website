"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, LucideCheck } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3)
      clearCart()
      window.scrollTo(0, 0)
    }, 2000)
  }

  if (cart.length === 0 && step !== 3) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xs mx-auto">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > 1 ? <LucideCheck size={16} /> : 1}
                </div>
                <span className="text-xs mt-1">Shipping</span>
              </div>
              <div className="w-16 h-1 bg-muted">
                <div className={`h-full bg-primary ${step >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > 2 ? <LucideCheck size={16} /> : 2}
                </div>
                <span className="text-xs mt-1">Payment</span>
              </div>
              <div className="w-16 h-1 bg-muted">
                <div className={`h-full bg-primary ${step >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6"
            >
              <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>

              <form onSubmit={handleSubmitShipping}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" className="mt-1 rounded-lg" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" className="mt-1 rounded-lg" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" className="mt-1 rounded-lg" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" className="mt-1 rounded-lg" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" className="mt-1 rounded-lg" required />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="mt-1 rounded-lg" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" className="mt-1 rounded-lg" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip/Postal Code</Label>
                    <Input id="zip" className="mt-1 rounded-lg" required />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" className="mt-1 rounded-lg" required />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" className="rounded-lg" onClick={() => router.push("/cart")}>
                    Back to Cart
                  </Button>
                  <Button type="submit" className="rounded-lg">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6"
            >
              <h1 className="text-2xl font-bold mb-6">Payment Information</h1>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Order Summary</h2>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>₹5.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax</span>
                    <span>₹{(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{(cartTotal + 5.99 + cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitPayment}>
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-border rounded-lg p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 mb-8">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" className="mt-1 rounded-lg" required />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" className="mt-1 rounded-lg" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date (MM/YY)</Label>
                        <Input id="expiry" className="mt-1 rounded-lg" required />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" className="mt-1 rounded-lg" required />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" className="rounded-lg" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="rounded-lg" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Complete Order"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <LucideCheck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. Your order has been confirmed and will be shipped soon.
              </p>
              <p className="font-medium mb-8">Order #SDFM-{Math.floor(Math.random() * 10000)}</p>

              <div className="max-w-sm mx-auto">
                <Button className="w-full rounded-lg mb-4" onClick={() => router.push("/")}>
                  Return to Home
                </Button>
                <Button variant="outline" className="w-full rounded-lg" onClick={() => router.push("/shop")}>
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
