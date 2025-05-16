"use client"

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border/10 relative overflow-hidden gradient-footer-new">
      {/* Futuristic floating gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-slow-spin">
          <div className="absolute top-[40%] left-[45%] w-[30%] h-[30%] rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute top-[30%] left-[25%] w-[20%] h-[20%] rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute top-[70%] left-[65%] w-[25%] h-[25%] rounded-full bg-white/5 blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <h2 className="text-4xl font-bold mb-2 rowdies-bold">RUNAWAY</h2>
            </div>
            <p className="text-muted-foreground">Timeless elegance and premium quality at accessible prices.</p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/shop" className="hover:text-foreground transition-colors">
                  All Collections
                </a>
              </li>
              <li>
                <a href="/shop?category=new" className="hover:text-foreground transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/shop?category=best" className="hover:text-foreground transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/shop?category=sale" className="hover:text-foreground transition-colors">
                  Limited Editions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/documentation" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-conditions" className="hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/shipping-delivery" className="hover:text-foreground transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="/cancellation-refund" className="hover:text-foreground transition-colors">
                  Cancellation & Refund
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-muted-foreground pt-8 border-t border-border/10">
          <p>
            © 2025 <span className="rowdies-regular">RUNAWAY</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
