import { NextResponse } from "next/server"
import { getBusinesses, saveBusinesses } from "@/lib/data"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const businessData = await request.json()

    const businesses = await getBusinesses()

    const newBusiness = {
      id: crypto.randomUUID(),
      ...businessData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    businesses.push(newBusiness)
    await saveBusinesses(businesses)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding business:", error)
    return NextResponse.json({ error: "Failed to add business" }, { status: 500 })
  }
}
