import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import path from "path";

export async function GET() {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const fontPath = path.join(process.cwd(), "public", "times.ttf");
  doc.registerFont("Times", fontPath);

  doc.font("Times").fontSize(14).text(`
XIZMAT KO‘RSATISH SHARTNOMASI

Ushbu shartnoma quyidagilar o‘rtasida tuzildi:
1-tomon: ______________________________ (Tashkilot/F.I.Sh)
va
2-tomon: ______________________________ (F.I.Sh)

Shartlar:
- To‘lov to‘liq amalga oshirilmaguncha, Ijrochi ma’lumotlarga kirishni cheklash huquqiga ega.
- To‘lov 2 (ikki) kun ichida amalga oshirilishi lozim.
- To‘lov amalga oshirilgach, to‘liq kirish ochiladi.

Sana: _____________
Tomonlar imzosi: _____________
`);

  const buffers: Buffer[] = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {});

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(
        new NextResponse(pdfData, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="shartnoma_uz.pdf"',
          },
        })
      );
    });
  });
}
