import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from "../public/logo.jpg"
import { LogInIcon } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Asosiy sahifa – Ariza topshirish",
  description: "Samarqand Davlat Veterinariya Meditsinasi Universiteti Nukus filialining ariza topshirish tizimi."
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="min-h-screen w-full max-w-8xl flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center py-2 md:p-4">
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="University Logo"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
          <Link href="/applications">
            <Button variant="outline">Kirish <LogInIcon/></Button>
          </Link>
        </header>

        {/* Main content */}
        <main className="flex flex-col items-center justify-center flex-1 text-center p-3 md:p-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl lg:!leading-[3rem] font-bold mb-4 md:w-3/4 lg:w-1/2">
            SAMARQAND DAVLAT VETERINARIYA MEDITSINASI, CHORVACHILIK VA BIOTEXNOLOGIYALAR UNIVERSITETI NUKUS FILIALI
          </h1>

          <Link href="/form">
            <Button className="mt-6 flex items-center justify-center dark:text-white bg-sky-600 hover:bg-sky-700 h-12 md:h-14 px-4 md:px-8 text-md md:text-lg">Ariza topshirish </Button>
          </Link>
        </main>
      </div>
    </div>
  )
}
