// app/page.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="min-h-screen w-full max-w-8xl flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Veteraneniriya Instituti</span>
          </div>
          <Link href="/applications">
            <Button variant="outline">Login</Button>
          </Link>
        </header>

        {/* Main content */}
        <main className="flex flex-col items-center justify-center flex-1 text-center p-6">
          <h1 className="text-2xl md:text-3xl lg:text-5xl !leading-[3.4rem] font-semibold mb-4 md:w-3/4 lg:w-1/2">
            Qoraqalpogʻiston Respublikasi Veteraneniriya Instituti uchun granga online ariza topshirish
          </h1>

          <Link href="/form">
            <Button className="mt-6 px-8 py-3 text-lg">Ariza topshirish</Button>
          </Link>
        </main>
      </div>
    </div>
  )
}
