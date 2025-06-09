"use server"

import { revalidatePath } from "next/cache"
import { getBusinesses, saveBusinesses } from "./data"
import crypto from "crypto"

// Add a new business
export async function addBusiness(businessData: any) {
  try {
    const businesses = await getBusinesses()

    const newBusiness = {
      id: crypto.randomUUID(),
      ...businessData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    businesses.push(newBusiness)
    await saveBusinesses(businesses)

    revalidatePath("/directory")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Error adding business:", error)
    throw new Error("Failed to add business")
  }
}

// Delete a business
export async function deleteBusiness(id: string) {
  try {
    const businesses = await getBusinesses()
    const updatedBusinesses = businesses.filter((business) => business.id !== id)

    await saveBusinesses(updatedBusinesses)

    revalidatePath("/directory")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Error deleting business:", error)
    return { success: false, error: "Failed to delete business" }
  }
}

// Update a business
export async function updateBusiness(id: string, businessData: any) {
  try {
    const businesses = await getBusinesses()
    const index = businesses.findIndex((business) => business.id === id)

    if (index === -1) {
      return { success: false, error: "Business not found" }
    }

    businesses[index] = {
      ...businesses[index],
      ...businessData,
      updatedAt: new Date().toISOString(),
    }

    await saveBusinesses(businesses)

    revalidatePath("/directory")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Error updating business:", error)
    return { success: false, error: "Failed to update business" }
  }
}
