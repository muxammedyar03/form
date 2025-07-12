// app/page.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from "../public/logo.jpg"
import { ArrowRight, LogInIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="min-h-screen w-full max-w-8xl flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b">
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
        <main className="flex flex-col items-center justify-center flex-1 text-center p-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl !leading-[3rem] font-bold mb-4 md:w-3/4 lg:w-1/2">
            SAMARQAND DAVLAT VETERINARIYA MEDITSINASI, CHORVACHILIK VA BIOTEXNOLOGIYALAR UNIVERSITETI NUKUS FILIALI
          </h1>

          <Link href="/form">
            <Button className="mt-6 flex items-center justify-center bg-sky-600 hover:bg-sky-700 h-14 px-8 text-lg">Ariza topshirish </Button>
          </Link>
        </main>
      </div>
    </div>
  )
}
