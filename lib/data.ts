import type { Business } from "./types"
import fs from "fs"
import path from "path"

// Path to our JSON data file
const dataFilePath = path.join(process.cwd(), "data", "businesses.json")

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Create empty businesses.json if it doesn't exist
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ businesses: [] }), "utf8")
  }
}

// Get all businesses
export async function getBusinesses(): Promise<Business[]> {
  ensureDataDirectoryExists()

  try {
    const data = fs.readFileSync(dataFilePath, "utf8")
    const { businesses } = JSON.parse(data)
    return businesses
  } catch (error) {
    console.error("Error reading businesses data:", error)
    return []
  }
}

// Get businesses by category
export async function getBusinessesByCategory(category: string): Promise<Business[]> {
  const businesses = await getBusinesses()
  return businesses.filter((business) => business.category.toLowerCase() === category.toLowerCase())
}

// Get a single business by ID
export async function getBusinessById(id: string): Promise<Business | null> {
  const businesses = await getBusinesses()
  return businesses.find((business) => business.id === id) || null
}

// Save businesses data
export async function saveBusinesses(businesses: Business[]): Promise<void> {
  ensureDataDirectoryExists()

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify({ businesses }, null, 2), "utf8")
  } catch (error) {
    console.error("Error saving businesses data:", error)
    throw new Error("Failed to save businesses data")
  }
}
