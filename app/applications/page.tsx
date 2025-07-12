import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getApplications } from "@/actions/application"
import { isAuthenticated, logout } from "@/actions/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarDays, LogOutIcon, Users } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AccordionHeader } from "@radix-ui/react-accordion"
import * as XLSX from "xlsx"
import { ExportButton } from "@/components/ExportButton"

export default async function ApplicationsPage() {
  if (!(await isAuthenticated())) {
    redirect("/login")
  }

  const { applications, totalApplications, applicationsToday } = await getApplications()
  console.log(applications);
  
  return (
    <div className="min-h-[100dvh] bg-gray-100 p-4 dark:bg-background md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Arizalar boshqaruv paneli</h1>
          <div className="flex items-center space-x-4">
            <ExportButton/>
            <form action={logout}>
              <Button variant="outline" className="text-red-500"> <LogOutIcon/> Chiqish</Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Bugungi arizalar</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl text-purple-500 font-bold">{applicationsToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Barcha arizalar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl text-purple-500 font-bold">{totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Barcha arizalar</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-center text-muted-foreground">Hali arizalar kelmagan.</p>
            ) : (
              <div className="overflow-x-auto">
                <Accordion type="single" collapsible className="w-full p-0">
                  {applications.map((app) => (
                    <AccordionItem key={app.id} value={app.id.toString()}>
                      <AccordionHeader>
                        <AccordionTrigger className="flex justify-between items-start w-full active:no-underline hover:no-underline">
                          <div className="flex flex-1 flex-col items-start no-underline">
                            <p className="text-xl">{app.name} {app.surname}</p>
                            <p className="text-muted-foreground">{app.phoneNumber}</p>
                          </div>
                          <div className="flex-1">
                            <p>{app.groupNumber}-guruh</p>
                          </div>
                          <span className="text-sm text-muted-foreground pr-4">
                            {format(new Date(app.createdAt), "PPP")}
                          </span>
                        </AccordionTrigger>
                      </AccordionHeader>
                      <AccordionContent className="px-0 py-4 flex flex-col space-y-2">
                        <strong>Ariza:</strong>
                        <p> {app.message}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
