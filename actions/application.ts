"use server"

import prisma from "@/lib/db"
import { Prisma } from "@prisma/client"
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

export async function getApplications({
  page = 1,
  pageSize = 10,
  search = "",
}: {
  page?: number
  pageSize?: number
  search?: string
}) {
  try {
    const skip = (page - 1) * pageSize

    const where = {
      OR: [
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { surname: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { groupNumber: isNaN(Number(search)) ? undefined : Number(search) },
      ],
    }

    const [applications, totalApplications, applicationsToday] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.application.count({ where }),
      prisma.application.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(24, 0, 0, 0)),
          },
        },
      }),
    ])

    return { applications, totalApplications, applicationsToday }
  } catch (error) {
    console.error("Error fetching applications:", error)
    return { applications: [], totalApplications: 0, applicationsToday: 0 }
  }
}
