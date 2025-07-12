'use client'

import { useFormState } from "react-dom"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { login } from "@/actions/auth"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [state, formAction] = useFormState(login, { error: "" })

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])
  // ariza-admin1101
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold py-3">Kirish</CardTitle>
          <CardDescription>Tizimga kirish uchun login va parolni kiriting</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="login" required type="text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" required placeholder="parol" type="password" />
            </div>
            <Button className="w-full" type="submit">
              Kirish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
