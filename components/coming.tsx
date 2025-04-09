"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ComingSoonCard() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set launch date to 30 days from now
  useEffect(() => {
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() !== "") {
      // Here you would typically send the email to your backend
      console.log("Subscribing email:", email)
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <div className="h-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Coming Soon</CardTitle>
        <CardDescription>We&apos;re working hard to bring you something amazing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{countdown.days}</span>
            <span className="text-xs text-muted-foreground">Days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{countdown.hours}</span>
            <span className="text-xs text-muted-foreground">Hours</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{countdown.minutes}</span>
            <span className="text-xs text-muted-foreground">Minutes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{countdown.seconds}</span>
            <span className="text-xs text-muted-foreground">Seconds</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Stay updated</span>
          </div>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Bell className="mr-2 h-4 w-4" />
              Notify me
            </Button>
          </form>
        ) : (
          <div className="bg-muted p-4 rounded-md text-center">
            <p className="font-medium">Thanks for subscribing!</p>
            <p className="text-sm text-muted-foreground mt-1">We&apos;ll notify you when we launch.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </CardFooter>
    </Card>
  )
}

