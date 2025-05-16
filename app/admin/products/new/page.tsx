"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, X, CuboidIcon as Cube } from "lucide-react"
import { useProductStore } from "@/lib/product-store"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sizes, setSizes] = useState<string[]>([])
  const [newSize, setNewSize] = useState("")
  const [colors, setColors] = useState<string[]>([])
  const [newColor, setNewColor] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleAddSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize])
      setNewSize("")
    }
  }

  const handleRemoveSize = (size: string) => {
    setSizes(sizes.filter((s) => s !== size))
  }

  const handleAddColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor])
      setNewColor("")
    }
  }

  const handleRemoveColor = (color: string) => {
    setColors(colors.filter((c) => c !== color))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setSelectedImage(imageUrl)

        // Create a hidden input to store the image URL in the form data
        const hiddenInput = document.createElement("input")
        hiddenInput.type = "hidden"
        hiddenInput.name = "imageUrl"
        hiddenInput.value = imageUrl
        document.querySelector("form")?.appendChild(hiddenInput)
      }
      reader.readAsDataURL(file)
    }
  }

  const { addProduct } = useProductStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Create product object
    const product = {
      id: Date.now(), // Generate unique ID
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      price: Number.parseFloat(formData.get("price") as string),
      comparePrice: formData.get("comparePrice") ? Number.parseFloat(formData.get("comparePrice") as string) : null,
      category: formData.get("category") as string,
      tags: formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim()),
      sizes: sizes,
      colors: colors,
      inStock: (form.elements.namedItem("inStock") as HTMLInputElement).checked,
      featured: (form.elements.namedItem("featured") as HTMLInputElement).checked,
      image: selectedImage || "/placeholder.svg?height=400&width=400", // Default placeholder
    }

    try {
      // Add to store
      addProduct(product)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Product created",
        description: "The product has been successfully created.",
      })

      // Reset form
      form.reset()
      setSizes([])
      setColors([])
      setSelectedImage(null)
      setIsSubmitting(false)

      // Redirect to products page
      router.push("/admin/products")
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Error",
        description: "There was an error creating the product. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 rounded-full"
          onClick={() => router.push("/admin/products")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Product Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" className="mt-1 rounded-lg" required />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" className="mt-1 rounded-lg" required />
                  <p className="text-sm text-muted-foreground mt-1">
                    This will be used for the product URL. Use lowercase letters, numbers, and hyphens only.
                  </p>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" className="mt-1 rounded-lg" rows={6} required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <div className="mb-4">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Product preview"
                        className="max-h-40 mx-auto object-contain"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4 rounded-lg"
                        onClick={() => setSelectedImage(null)}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mb-2">Drag and drop your product images here</p>
                      <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG, and WebP</p>
                    </>
                  )}
                  <input
                    type="file"
                    id="image-upload"
                    name="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Button type="button" variant="outline" className="rounded-lg" as="span">
                      Browse Files
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Sizes</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {sizes.map((size) => (
                      <div key={size} className="bg-muted px-3 py-1 rounded-full flex items-center">
                        <span className="mr-2">{size}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => handleRemoveSize(size)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add size (e.g. S, M, L)"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      className="rounded-lg"
                    />
                    <Button type="button" variant="outline" onClick={handleAddSize} className="rounded-lg">
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Colors</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {colors.map((color) => (
                      <div key={color} className="bg-muted px-3 py-1 rounded-full flex items-center">
                        <span className="mr-2">{color}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                          onClick={() => handleRemoveColor(color)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add color (e.g. Black, White)"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="rounded-lg"
                    />
                    <Button type="button" variant="outline" onClick={handleAddColor} className="rounded-lg">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3D Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                    <Cube className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-2">Upload a 3D model for the virtual showroom</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports GLB and GLTF formats</p>
                  <input type="file" id="model-upload" className="hidden" accept=".glb,.gltf" />
                  <label htmlFor="model-upload">
                    <Button type="button" variant="outline" className="rounded-lg" as="span">
                      Upload 3D Model
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-4">
                    Note: 3D models should be optimized for web viewing (max 5MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      className="pl-8 rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comparePrice">Compare-at Price</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                    <Input
                      id="comparePrice"
                      name="comparePrice"
                      type="number"
                      step="0.01"
                      min="0"
                      className="pl-8 rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Original price before discount</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue="hoodies">
                    <SelectTrigger className="mt-1 rounded-lg">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoodies">Hoodies</SelectItem>
                      <SelectItem value="tees">T-Shirts</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" name="tags" className="mt-1 rounded-lg" placeholder="Separate with commas" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inStock">In Stock</Label>
                  <Switch id="inStock" name="inStock" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Product</Label>
                  <Switch id="featured" name="featured" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() => router.push("/admin/products")}
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-lg" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
