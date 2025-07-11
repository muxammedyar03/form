import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { getApplications } from "@/actions/application"
import { isAuthenticated, logout } from "@/actions/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarDays, Users } from "lucide-react"

export default async function ApplicationsPage() {
  if (!(await isAuthenticated())) {
    redirect("/login")
  }

  const { applications, totalApplications, applicationsToday } = await getApplications()

  return (
    <div className="min-h-[100dvh] bg-gray-100 p-4 dark:bg-gray-950 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Applications Dashboard</h1>
          <form action={logout}>
            <Button variant="outline">Logout</Button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications Today</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applicationsToday}</div>
              <p className="text-xs text-muted-foreground">New applications received today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-muted-foreground">All applications received</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="text-center text-muted-foreground">No applications received yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Surname</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[120px]">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.name}</TableCell>
                        <TableCell>{app.surname}</TableCell>
                        <TableCell>{app.phoneNumber}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{app.message}</TableCell>
                        <TableCell>{format(new Date(app.createdAt), "PPP")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
