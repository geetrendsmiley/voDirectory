import { NextResponse } from "next/server"
import { getBusinesses, saveBusinesses } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Business ID is required" }, { status: 400 })
    }

    const businesses = await getBusinesses()
    const updatedBusinesses = businesses.filter((business) => business.id !== id)

    await saveBusinesses(updatedBusinesses)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting business:", error)
    return NextResponse.json({ error: "Failed to delete business" }, { status: 500 })
  }
}
