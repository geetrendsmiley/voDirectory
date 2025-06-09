import Link from "next/link"
import { getBusinessesByCategory, getBusinesses } from "@/lib/data"
import { BusinessCard } from "@/components/business-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  const businesses = await getBusinessesByCategory(category)
  const allBusinesses = await getBusinesses()
  const categories = [...new Set(allBusinesses.map((business) => business.category))]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            BusinessDir
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="/directory" className="font-medium">
              Directory
            </Link>
            <Link href="/login" className="font-medium">
              Admin Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Directory Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">{formattedCategory} Businesses</h1>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search ${formattedCategory.toLowerCase()} businesses...`}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="outline" asChild>
            <Link href="/directory">All</Link>
          </Button>
          {categories.map((cat) => (
            <Button key={cat} variant={cat.toLowerCase() === category ? "default" : "outline"} asChild>
              <Link href={`/directory/category/${cat.toLowerCase()}`}>{cat}</Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Business Listings */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-xl font-semibold mb-6">{formattedCategory} Businesses</h2>
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No businesses found in this category.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} BusinessDir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
