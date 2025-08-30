import prisma from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import * as XLSX from "xlsx"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "Fayl topilmadi" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const workbook = XLSX.read(buffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const rows: any[] = XLSX.utils.sheet_to_json(sheet)

    const created = await prisma.application.createMany({
      data: rows.map((r) => ({
        name: r.Name,
        surname: r.Surname,
        phoneNumber: r.PhoneNumber,
        groupNumber: 101,
        message: r.Message ?? "",
        createdAt: r.CreatedAt ? new Date(r.CreatedAt) : undefined,
      })),
    })
    
    return NextResponse.json({
      success: true,
      count: created.count,
      rows,
    })

  } catch (err: any) {
    console.error("Excel yuklashda xatolik:", err)
    return NextResponse.json(
      { error: "Serverda xatolik: " + err.message },
      { status: 500 }
    )
  }
}
