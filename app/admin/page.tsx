"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { isLoggedIn, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import type { Business } from "@/lib/types"

export default function AdminDashboard() {
  const router = useRouter()
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }

    // Fetch businesses
    fetchBusinesses()
  }, [router])

  const fetchBusinesses = async () => {
    try {
      const response = await fetch("/api/businesses")
      if (response.ok) {
        const data = await response.json()
        setBusinesses(data.businesses)
      }
    } catch (error) {
      console.error("Error fetching businesses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this business?")) {
      try {
        const response = await fetch("/api/delete-business", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        })

        if (response.ok) {
          fetchBusinesses() // Refresh the list
        }
      } catch (error) {
        console.error("Error deleting business:", error)
      }
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="border-b bg-white">
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
            <Link href="/admin" className="font-medium">
              Dashboard
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild>
            <Link href="/admin/add">
              <Plus className="mr-2 h-4 w-4" /> Add Business
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Businesses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Address</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.map((business) => (
                    <tr key={business.id} className="border-b">
                      <td className="py-3 px-4">{business.name}</td>
                      <td className="py-3 px-4">{business.category}</td>
                      <td className="py-3 px-4">{business.address}</td>
                      <td className="py-3 px-4 flex space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/edit/${business.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(business.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
