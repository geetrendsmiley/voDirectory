import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the Perfect Business for Your Needs</h1>
            <p className="text-xl mb-8 text-gray-600">
              Discover local businesses, services, and professionals in your area with our comprehensive directory.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/directory">
                  Browse Directory <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Restaurants", "Healthcare", "Retail"].map((category) => (
              <Link
                href={`/directory/category/${category.toLowerCase()}`}
                key={category}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-gray-600">Find the best {category.toLowerCase()} in your area</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} BusinessDir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
