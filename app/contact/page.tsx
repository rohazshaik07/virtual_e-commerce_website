"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get("email")
    const name = formData.get("name")
    const message = formData.get("message")

    // In a real implementation, this would send to an API endpoint
    console.log(`Sending to shaikrohaz@gmail.com: ${name} (${email}) - ${message}`)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      })
      // Reset form
      form.reset()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out to us
              directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6 h-full">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">shaikrohaz@gmail.com</p>
                      <p className="text-muted-foreground">support@runaway.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">+91 9505956681</p>
                      <p className="text-muted-foreground">Mon-Fri, 9am-6pm IST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office</h3>
                      <p className="text-muted-foreground">123 Fashion Street</p>
                      <p className="text-muted-foreground">New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-muted p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-muted p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="bg-muted p-2 rounded-full hover:bg-primary/10 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" className="mt-1 rounded-lg" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" className="mt-1 rounded-lg" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" className="mt-1 rounded-lg" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={6} className="mt-1 rounded-lg" required />
                  </div>

                  <Button type="submit" className="w-full rounded-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-16">
            <div className="bg-muted h-96 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">Interactive Map Would Be Displayed Here</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6">
                <h3 className="text-lg font-bold mb-2">What are your shipping times?</h3>
                <p className="text-muted-foreground">
                  Standard shipping takes 3-5 business days within the US. International shipping typically takes 7-14
                  business days depending on the destination.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6">
                <h3 className="text-lg font-bold mb-2">Do you offer returns?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 30-day return policy for unworn items in original condition with tags attached.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6">
                <h3 className="text-lg font-bold mb-2">How do I track my order?</h3>
                <p className="text-muted-foreground">
                  Once your order ships, you'll receive a confirmation email with tracking information.
                </p>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/20 p-6">
                <h3 className="text-lg font-bold mb-2">Do you ship internationally?</h3>
                <p className="text-muted-foreground">
                  Yes, we ship to most countries worldwide. International shipping rates vary by location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
