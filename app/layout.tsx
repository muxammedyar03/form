import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PermissionProvider } from "@/context/PermissionContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grant uchun arizalar qabul qilish tizimi",
  description: "Manage applications efficiently.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PermissionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </PermissionProvider>
      </body>
    </html>
  )
}
