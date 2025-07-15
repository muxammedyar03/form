'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.AUTH_SECRET
if (!secretKey) {
  throw new Error("AUTH_SECRET environment variable is not set.")
}
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.error("Failed to verify session:", error)
    return null
  }
}

export async function login(_: any, formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Username and password are required." }
  }

  const user = await prisma.user.findUnique({
    where: { username, password },
  })

  if (!user) {
    return { error: "Invalid credentials." }
  }

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000)
  const session = await encrypt({ username: user.username, userId: user.id, expires })

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })

  redirect("/applications")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}

export async function getSession() {
  'use server'

  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function isAuthenticated() {
  const session = await getSession()
  return session !== null && new Date(session.expires as number) > new Date()
}
