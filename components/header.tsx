"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-border/10" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </Button>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/virtual-showroom" className="hover:text-primary transition-colors">
              Virtual Showroom
            </Link>
            <Link href="/documentation" className="hover:text-primary transition-colors">
              Documentation
            </Link>
          </nav>
        </div>

        {/* Logo (centered) */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <div className="relative h-10 w-auto">
            <img src="/images/new-logo.png" alt="RUNAWAY Logo" className="h-10 md:h-12 w-auto object-contain" />
          </div>
        </Link>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User size={20} />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col"
        >
          <div className="flex justify-end p-6">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-2xl">
            <div className="mb-10">
              <img src="/images/new-logo.png" alt="RUNAWAY Logo" className="h-16 w-auto object-contain" />
            </div>
            <Link href="/" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/shop"
              className="hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/virtual-showroom"
              className="hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Virtual Showroom
            </Link>
            <Link
              href="/documentation"
              className="hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="border-t border-border/10 pt-6 w-full flex flex-col items-center space-y-4">
              <Link
                href="/privacy-policy"
                className="text-base hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-base hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Terms & Conditions
              </Link>
              <Link
                href="/shipping-delivery"
                className="text-base hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shipping & Delivery
              </Link>
              <Link
                href="/cancellation-refund"
                className="text-base hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cancellation & Refund
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
