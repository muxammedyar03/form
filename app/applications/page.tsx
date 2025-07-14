import { isAuthenticated, logout } from "@/actions/auth"
import { redirect } from "next/navigation"
import ApplicationsPageClient from "../../components/applicationsPageClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Arizalar - Boshqaruv paneli",
  description: "Samarqand Davlat Veterinariya Meditsinasi Universiteti Nukus filialining ariza topshirish tizimi."
}


export default async function ApplicationsPage() {
  if (!(await isAuthenticated())) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 dark:bg-background">
      <ApplicationsPageClient />
    </div>
  )
}
