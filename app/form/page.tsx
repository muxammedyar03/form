"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitApplication } from "@/actions/application"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { redirect } from "next/navigation"
import { InfoIcon } from "lucide-react"

export default function ApplicationFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await submitApplication(formData)
    if (result.success) {
      toast({
        title: "Ariza yuborildi!",
        description: "Ariza muvaffaqiyatli yuborildi va ko'rib chiqiladi.",
      })
      const form = document.getElementById("application-form") as HTMLFormElement
      if (form) {
        form.reset()
      }
      redirect("/")
    } else {
      toast({
        title: "Nimadir xato ketdi",
        description: result.error || "Ariza yuborishda xatolik yuz berdi.",
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-8 dark:bg-background">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl md:text-4xl font-bold py-2">Ariza Formasi</CardTitle>
          <CardDescription className="text-sm md:text-base">Ariza yuborish uchun kerakli ustunlarni to'ldiring.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="application-form" action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Ism</Label>
                <Input id="name" name="name" placeholder="Ismingiz" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Familiya</Label>
                <Input id="surname" name="surname" placeholder="Familiya" required />
              </div>
            </div>
            <div className="flex sm:items-center flex-col sm:flex-row gap-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="phoneNumber">Telefon raqam</Label>
                <Input id="phoneNumber" name="phoneNumber" placeholder="+998 XX XXX XX XX" required type="tel" />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="groupNumber">Qaysi guruhda o'qiysiz</Label>
                <Input
                  id="groupNumber"
                  name="groupNumber"
                  placeholder="Masalan: 101"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{3}"
                  maxLength={3}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Ariza mazmuni</Label>
              <Textarea id="message" name="message" placeholder="Men " required rows={5} />
              <p className="text-xs flex gap-x-2">
                <InfoIcon className="text-orange-600" />
                Iltimos, ariza matnini rasmiy va akademik yozuv me'yorlariga mos ravishda yozing. Norasmiy ifodalar qabul qilinmasligi mumkin.
              </p>
            </div>
            <Button type="submit" className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 h-12 px-8 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Yuborilmoqda..." : "Ariza yuborish"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-muted-foreground">
          <p>Maʼlumotlaringiz maxfiylik va xavfsizlik talablariga rioya qilgan holda saqlanadi.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
