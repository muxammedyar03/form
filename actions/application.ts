"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function submitApplication(formData: FormData) {
  const name = formData.get("name") as string
  const surname = formData.get("surname") as string
  const phoneNumber = formData.get("phoneNumber") as string
  const message = formData.get("message") as string
  const groupNumber = Number(formData.get("groupNumber"))

  if (!name || !surname || !phoneNumber || !message || !groupNumber) {
    return { error: "All fields are required." }
  }
  if (groupNumber < 101 || groupNumber > 113) {
    return { success: false, error: "Ariza topshirish faqat 101–113-guruhlar uchun amalga oshiriladi." }
  }

  try {
    const existingApplication = await prisma.application.findFirst({
      where: {
        phoneNumber,
        name,
      },
    })
    if (existingApplication) {
      return { success: false, error: "Sizning arizangiz allaqachon mavjud."}
    }
    await prisma.application.create({
      data: {
        name,
        surname,
        phoneNumber,
        groupNumber,
        message,
      }
    })
    revalidatePath("/applications")
    return { success: true }
  } catch (error) {
    console.error("Error submitting application:", error)
    return { error: "Ariza yuborishda xatolik yuz berdi." }
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