"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import * as XLSX from "xlsx"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import Image from "next/image"
import ms_excel from '/public/ms_excel.webp'

export function ExportButton() {
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast();

  const handleExport = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/export-exel")
      const json = await res.json()

      if (json.error) {
        alert(json.error)
        return
      }

      const worksheet = XLSX.utils.json_to_sheet(json.data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Applications")
      XLSX.writeFile(workbook, "applications.xlsx")
    } catch (error) {
        toast({
            title: "Xatolik",
            description: "Foydalanuvchi yoki parol noto‘g‘ri.",
            variant: "destructive",
        })
    } finally {
      setIsLoading(false)
      toast({
        title: "Excel eksporti",
        description: "Arizalar muvaffaqiyatli eksport qilindi.",
        variant: "default",
      })
    }
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={isLoading} className="w-full h-12 md:h-auto px-2 md:px-6">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Yuklanmoqda...
        </>
      ) : (
        <>
          <Image src={ms_excel} loading="lazy" alt="exel" width={25} height={25}/>
          Yuklash
        </>
      )}
    </Button>
  )
}

