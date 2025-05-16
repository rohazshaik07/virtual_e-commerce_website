"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Edit, Trash2, Filter, ArrowUpDown, MoreHorizontal, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import EnhancedThreeJsViewer from "@/components/enhanced-threejs-viewer"
import { useProductStore } from "@/lib/product-store"

// Combined product data from all categories
const allProducts = [
  // Men's products
  {
    id: 1,
    name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
    price: 398,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product1.jpg-fPpnkxGEXHcsGcy1Az3VlQB7PMLxMd.jpeg",
    category: "shirts",
    inStock: true,
    createdAt: "2023-01-15",
    has3dModel: true,
  },
  {
    id: 2,
    name: "Men Slim Fit Striped Spread Collar Casual Shirt",
    price: 395,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product2.jpg-soCxW6zLU4WlzR10ENp7kbOWtpGVyg.jpeg",
    category: "shirts",
    inStock: true,
    createdAt: "2023-01-20",
    has3dModel: true,
  },
  {
    id: 3,
    name: "Men Solid Polo Neck Polyester White T-Shirt",
    price: 275,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product3.jpg-1jqDGSia1aWgpmNcCvCpsNw5B38OdY.jpeg",
    category: "tees",
    inStock: true,
    createdAt: "2023-02-05",
    has3dModel: false,
  },
  {
    id: 4,
    name: "RUNAWAY Brown Linen Overshirt",
    price: 289,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product4.jpg-ohx9ZVxs9QPvNk4ZqHp15Jybxsd0V0.jpeg",
    category: "outerwear",
    inStock: true,
    createdAt: "2023-02-10",
    has3dModel: false,
  },
  // Women's products
  {
    id: 11,
    name: "Women's Linen Crop Top",
    price: 299,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mike-von-V4cl7_0N2mc-unsplash.jpg-aWQ1WLIdph9WapIty6yqYeHpowO8X9.jpeg",
    category: "tops",
    inStock: true,
    createdAt: "2023-03-15",
    has3dModel: false,
  },
  {
    id: 12,
    name: "Women's Linen Midi Skirt",
    price: 349,
    image: "https://images.unsplash.com/photo-1551163943-3f7253a97449?q=80&w=1470&fit=crop",
    category: "bottoms",
    inStock: true,
    createdAt: "2023-03-20",
    has3dModel: false,
  },
  // Footwear products
  {
    id: 17,
    name: "Converse High Top Sneakers",
    price: 599,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/maria-fernanda-pissioli-sd-VmUUrdrw-unsplash.jpg-wla4N0LfBPnVomErcVuZZSnBZBBjhM.jpeg",
    category: "casual",
    inStock: true,
    createdAt: "2023-04-05",
    has3dModel: false,
  },
  {
    id: 18,
    name: "Leather Oxford Shoes",
    price: 899,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1470&fit=crop",
    category: "formal",
    inStock: true,
    createdAt: "2023-04-10",
    has3dModel: false,
  },
]

export default function ProductsPage() {
  const { toast } = useToast()
  // Get products and actions from store
  const { products: storeProducts, deleteProduct } = useProductStore((state) => ({
    products: state.products,
    deleteProduct: state.deleteProduct,
  }))

  // Combine mock products with store products
  const allProductsCombined = [
    ...allProducts,
    ...storeProducts.filter((p) => !allProducts.some((mp) => mp.id === p.id)),
  ]
  const [products, setProducts] = useState(allProductsCombined)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const router = useRouter()

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...allProductsCombined]

    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number)
      }
    })

    setProducts(filteredProducts)
  }, [searchQuery, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDelete = (id: number) => {
    // Remove from store
    deleteProduct(id)

    // Update UI
    setProducts(products.filter((product) => product.id !== id))

    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    })
  }

  const handleEdit = (productId: number) => {
    router.push(`/admin/products/edit/${productId}`)

    // Store the product ID in localStorage for reference
    localStorage.setItem("currentEditProduct", productId.toString())
  }

  const handleView3DModel = (product: any) => {
    setSelectedProduct(product)
    setIsViewModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new">
          <Button className="rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-lg">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("name")}>
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("category")}>
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("price")}>
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("inStock")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">3D Model</th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("createdAt")}>
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-muted mr-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize">{product.category}</td>
                  <td className="py-3 px-4">₹{product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.inStock
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {product.has3dModel ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleView3DModel(product)}
                      >
                        <ZoomIn className="h-3 w-3 mr-1" /> View Model
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        Add 3D Model
                      </Button>
                    )}
                  </td>
                  <td className="py-3 px-4">{product.createdAt}</td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                        {product.has3dModel && (
                          <DropdownMenuItem onClick={() => handleView3DModel(product)}>
                            <ZoomIn className="mr-2 h-4 w-4" />
                            View 3D Model
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 3D Model Viewer Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>3D Model: {selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Interact with the 3D model by dragging to rotate and scrolling to zoom
            </DialogDescription>
          </DialogHeader>
          <div className="h-[500px] w-full">
            {selectedProduct && (
              <div className="w-full h-full bg-black/90 rounded-b-lg">
                <EnhancedThreeJsViewer modelPath="/models/hoodie.glb" autoRotate={true} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
