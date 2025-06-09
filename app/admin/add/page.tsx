"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { isLoggedIn } from "@/lib/auth"
import { BusinessForm } from "@/components/business-form"

export default function AddBusinessPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }
  }, [router])

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
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Business</h1>
          <p className="text-gray-600 mt-2">Fill in the details to add a new business to the directory</p>
        </div>

        <BusinessForm />
      </div>
    </div>
  )
}
