import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  })

  if (applications.length === 0) {
    return NextResponse.json({ error: "No applications found." }, { status: 404 })
  }

  const xlsData = applications.map(app => ({
    Name: app.name,
    Surname: app.surname,
    PhoneNumber: app.phoneNumber,
    Message: app.message,
    CreatedAt: app.createdAt.toISOString(),
  }))

  return NextResponse.json({ success: true, data: xlsData })
}
