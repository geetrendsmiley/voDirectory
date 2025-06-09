import type { User } from "./types"
import fs from "fs"
import path from "path"
import crypto from "crypto"

// Path to our users data file
const usersFilePath = path.join(process.cwd(), "data", "users.json")

// Ensure the data directory and users file exists
const ensureUsersFileExists = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Create users.json with default admin if it doesn't exist
  if (!fs.existsSync(usersFilePath)) {
    const defaultAdmin = {
      id: "1",
      username: "admin",
      password: crypto.createHash("sha256").update("admin").digest("hex"),
      isAdmin: true,
    }

    fs.writeFileSync(usersFilePath, JSON.stringify({ users: [defaultAdmin] }), "utf8")
  }
}

// Get all users (server-side only)
export async function getUsers(): Promise<User[]> {
  ensureUsersFileExists()

  try {
    const data = fs.readFileSync(usersFilePath, "utf8")
    const { users } = JSON.parse(data)
    return users
  } catch (error) {
    console.error("Error reading users data:", error)
    return []
  }
}

// Client-side login function
export async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      // Store session in localStorage for client-side access
      localStorage.setItem("adminSession", "true")
      return true
    }
    return false
  } catch (error) {
    console.error("Login error:", error)
    return false
  }
}

// Client-side session check
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("adminSession") === "true"
}

// Client-side logout
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminSession")
  }
}

// Server-side function to verify user credentials
export async function verifyCredentials(username: string, password: string): Promise<User | null> {
  try {
    const users = await getUsers()
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = users.find((u) => u.username === username && u.password === hashedPassword)
    return user || null
  } catch (error) {
    console.error("Error verifying credentials:", error)
    return null
  }
}
