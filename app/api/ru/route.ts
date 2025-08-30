import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import path from "path";

export async function GET() {
  const fontPath = path.join(process.cwd(), "public", "times.ttf");

  // Shu yerda defaultFont ni beramiz, shunda Helvetica chaqirilmaydi
  const doc = new PDFDocument({ 
    size: "A4", 
    margin: 50, 
    font: fontPath // 💡 default font sifatida times.ttf ni ko‘rsatamiz
  });

  doc.fontSize(14).text(`
                     ДОГОВОР ОКАЗАНИЯ УСЛУГ

Настоящий договор заключен между:
1-стороной: _________________________________________ (Организация/ФИО)
и
2-стороной: _________________________________________ (ФИО)

Условия:
- До момента полной оплаты Исполнитель имеет право ограничить доступ к данным.
- Оплата должна быть произведена не позднее 2 (двух) дней.
- После оплаты доступ будет открыт.

Дата: _____________
Подписи сторон: _____________
`);

  const buffers: Buffer[] = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(
        new NextResponse(pdfData, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="shartnoma_rus.pdf"',
          },
        })
      );
    });
  });
}
