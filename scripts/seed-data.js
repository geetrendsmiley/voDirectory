// This script creates initial data for the directory application

// Create data directory if it doesn't exist
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const dataDir = path.join(process.cwd(), "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Sample businesses data
const businesses = [
  {
    id: crypto.randomUUID(),
    name: "Green Leaf Restaurant",
    category: "Restaurants",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    website: "https://greenleafrestaurant.example",
    description: "A farm-to-table restaurant serving fresh, organic meals.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "City General Hospital",
    category: "Healthcare",
    address: "456 Medical Ave, Anytown, USA",
    phone: "(555) 987-6543",
    website: "https://citygeneralhospital.example",
    description: "Comprehensive healthcare services for the whole family.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Tech Gadgets Store",
    category: "Retail",
    address: "789 Shopping Blvd, Anytown, USA",
    phone: "(555) 456-7890",
    website: "https://techgadgets.example",
    description: "The latest electronics and tech accessories.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Community College",
    category: "Education",
    address: "101 Learning Way, Anytown, USA",
    phone: "(555) 234-5678",
    website: "https://communitycollege.example",
    description: "Quality education for students of all ages.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "First National Bank",
    category: "Finance",
    address: "202 Money St, Anytown, USA",
    phone: "(555) 345-6789",
    website: "https://firstnationalbank.example",
    description: "Trusted financial services for individuals and businesses.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "City Cinema",
    category: "Entertainment",
    address: "303 Movie Lane, Anytown, USA",
    phone: "(555) 567-8901",
    website: "https://citycinema.example",
    description: "The ultimate movie-going experience with the latest releases.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Admin user data
const users = [
  {
    id: "1",
    username: "admin",
    // Password: 'admin' (hashed with SHA-256)
    password: crypto.createHash("sha256").update("admin").digest("hex"),
    isAdmin: true,
  },
]

// Write data to JSON files
fs.writeFileSync(path.join(dataDir, "businesses.json"), JSON.stringify({ businesses }, null, 2))

fs.writeFileSync(path.join(dataDir, "users.json"), JSON.stringify({ users }, null, 2))

console.log("✅ Sample data has been created successfully!")
console.log("📁 Data files created:")
console.log("   - data/businesses.json")
console.log("   - data/users.json")
console.log("\n👤 Admin login credentials:")
console.log("   - Username: admin")
console.log("   - Password: admin")
