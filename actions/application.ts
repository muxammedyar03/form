"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function submitApplication(formData: FormData) {
  const name = formData.get("name") as string
  const surname = formData.get("surname") as string
  const phoneNumber = formData.get("phoneNumber") as string
  const message = formData.get("message") as string

  if (!name || !surname || !phoneNumber || !message) {
    return { error: "All fields are required." }
  }

  try {
    await prisma.application.create({
      data: {
        name,
        surname,
        phoneNumber,
        message,
      },
    })
    revalidatePath("/applications") // Revalidate the applications page to show new data
    return { success: true }
  } catch (error) {
    console.error("Error submitting application:", error)
    return { error: "Failed to submit application." }
  }
}

export async function getApplications() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    const totalApplications = await prisma.application.count()

    const today = new Date()
    today.setHours(0, 0, 0, 0) // Start of today
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1) // Start of tomorrow

    const applicationsToday = await prisma.application.count({
      where: {
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    })

    return { applications, totalApplications, applicationsToday }
  } catch (error) {
    console.error("Error fetching applications:", error)
    return { applications: [], totalApplications: 0, applicationsToday: 0 }
  }
}
