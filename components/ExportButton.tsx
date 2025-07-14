"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import * as XLSX from "xlsx"
import { DownloadIcon, Loader2 } from "lucide-react"
import { toast } from "./ui/use-toast"
import Image from "next/image"

export function ExportButton() {
  const [isLoading, setIsLoading] = React.useState(false)

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
      console.error(error)
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
          <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png'} loading="lazy" alt="exel" width={25} height={25}/>
          Yuklash
        </>
      )}
    </Button>
  )
}

