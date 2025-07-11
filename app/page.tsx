"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitApplication } from "@/actions/application"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ApplicationFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await submitApplication(formData)
    if (result.success) {
      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully sent.",
      })
      // Clear form fields manually for simplicity
      const form = document.getElementById("application-form") as HTMLFormElement
      if (form) {
        form.reset()
      }
    } else {
      toast({
        title: "Submission Failed",
        description: result.error || "There was an error submitting your application.",
        variant: "destructive",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-8 dark:bg-gray-950">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Application Form</CardTitle>
          <CardDescription>Please fill out the form below to submit your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="application-form" action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname</Label>
                <Input id="surname" name="surname" placeholder="Enter your surname" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" name="phoneNumber" placeholder="+998 XX XXX XX XX" required type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Application Message</Label>
              <Textarea id="message" name="message" placeholder="Write your application here..." required rows={5} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>Your information will be kept confidential.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
