"use client"

import { useEffect, useState,  useCallback} from "react"
import { ExportButton } from "@/components/ExportButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getApplications } from "@/actions/application"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { logout } from "@/actions/auth"
import { CalendarDays, Loader2Icon, LogOutIcon, Upload, Users } from "lucide-react"
import { AccordionHeader } from "@radix-ui/react-accordion"
import { Skeleton } from "./ui/skeleton"
import debounce from "lodash.debounce"
import { usePermission } from "@/context/PermissionContext"
import UploadExcel from "./FIleUploadForm"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import Image from "next/image"

export default function ApplicationsPageClient() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [data, setData] = useState<any>({
    applications: [],
    totalApplications: 0,
    applicationsToday: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false);

  const pageSize = 10
  const totalPages = Math.ceil(data.totalApplications / pageSize)
  const { hasPermission, loading } = usePermission()
  
  useEffect(() => {
    debouncedFetch(search, 1)
    setPage(1)
  }, [search])

  useEffect(() => {
    fetchNow(search, page)
  }, [page])

  const debouncedFetch = useCallback(
    debounce(async (searchValue: string, pageNumber: number) => {
      setIsLoading(true)
      const safeSearch = searchValue.replace(/[^\w\s]/gi, "")
      const res = await getApplications({ page: pageNumber, pageSize, search: safeSearch })
      setData(res)
      setIsLoading(false)
    }, 400),
    []
  )

  const fetchNow = async (searchValue: string, pageNumber: number) => {
    setIsLoading(true)
    const safeSearch = searchValue.replace(/[^\w\s]/gi, "")
    const res = await getApplications({ page: pageNumber, pageSize, search: safeSearch })
    setData(res)
    setIsLoading(false)
  }

  return (
    <div className="relative">

      {loading && (
        <div className="absolute inset-0 top-0 left-0 right-0 h-screen bottom-0 flex items-center justify-center bg-gray-100/85 dark:bg-neutral-900/50 backdrop-blur-sm dark:backdrop-blur-md z-50">
          <Loader2Icon className="text-current w-20 h-20 animate-spin"/>
        </div>
      )}

      {/* <UploadExcel onSuccess={() => fetchNow(search, page)}/> */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Boshqaruv paneli</h1>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Ism, Familiya yoki Guruh raqami"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="hidden md:flex max-w-sm"
            />
            <div className="hidden md:flex gap-x-4">
              <ExportButton />
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full h-12 md:h-auto px-2 md:px-6">
                    <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png'} loading="lazy" alt="exel" width={25} height={25}/>
                    Import
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Excel faylini yuklash</DialogTitle>
                  </DialogHeader>
                  <UploadExcel onSuccess={() => { fetchNow(search, page); setDialogOpen(false) }}/>
                  <DialogClose />
                </DialogContent>
              </Dialog>
            </div>
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
              <div className="text-4xl text-purple-500 font-bold">{data.applicationsToday}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Barcha arizalar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl text-purple-500 font-bold">{data.totalApplications}</div>
            </CardContent>
          </Card>
        </div>
        <div className="flex md:hidden flex-row items-center justify-between gap-2">
          <Input
            placeholder="Ism, Familiya yoki Guruh raqami"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="flex-1 h-12"
          />
          <div className="min-w-32 flex gap-x-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full h-12 md:h-auto px-2 md:px-6">
                  <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/2203px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png'} loading="lazy" alt="exel" width={25} height={25}/>
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Excel faylini yuklash</DialogTitle>
                </DialogHeader>
                <UploadExcel onSuccess={() => { fetchNow(search, page); setDialogOpen(false) }}/>
                <DialogClose />
              </DialogContent>
            </Dialog>
            <ExportButton />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Barcha arizalar: {data.totalApplications}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-12 flex items-center justify-between px-2 md:px-4 gap-x-4">
                    <p className="bg-gray-200 dark:bg-neutral-800 h-8 w-1/2 rounded-md"></p>
                    <p className="bg-gray-200 dark:bg-neutral-800 h-8 w-1/3 rounded-md"></p>
                    <p className="bg-gray-200 dark:bg-neutral-800 h-8 w-12 rounded-md"></p>
                  </Skeleton>
                ))}
              </div>
            ) : data.applications.length === 0 ? (
              <p className="text-center text-muted-foreground">Hech narsa topilmadi.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {data.applications.map((app: any) => (
                  <AccordionItem key={app.id} value={app.id.toString()} className="p-0">
                    <AccordionHeader className="p-0">
                      <AccordionTrigger className="flex justify-between items-center w-full active:no-underline hover:no-underline p-0 py-2 md:p-3">
                        <div className="flex flex-1 flex-col items-start text-start no-underline">
                          <p className="text-xl">{app.name} {app.surname}</p>
                        </div>
                        <div className="flex-1">
                          <p>{app.groupNumber}-guruh</p>
                        </div>
                        <span className="hidden md:flex text-sm text-muted-foreground pr-4">
                          {format(new Date(app.createdAt), "PPP")}
                        </span>
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="px-0 py-4 flex flex-col space-y-2">
                      <span className="text-sm text-muted-foreground pr-4">
                        {format(new Date(app.createdAt), "PPP")}
                      </span>
                      <p className="text-muted-foreground">{app.phoneNumber}</p>
                      <strong className="md:text-lg">Ariza:</strong>
                      <p className="border rounded-xl p-1 md:p-3 text-md md:text-lg whitespace-pre-wrap">
                        {app.message}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Oldingi</Button>
          <span className="px-2">Sahifa {page} / {totalPages || 1}</span>
          <Button variant="outline" disabled={page === totalPages || data.applications.length < 10} onClick={() => setPage((p) => p + 1)}>Keyingi</Button>
        </div>
      </div>
    </div>
  )
}
