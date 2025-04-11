"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  SettingsIcon,
  UserIcon,
  BellIcon,
  LockIcon,
  SaveIcon,
  SunIcon,
  MoonIcon,
  LaptopIcon,
  DatabaseIcon,
  CloudIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Full Name
                </label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Address
                </label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Company
                </label>
                <Input id="company" defaultValue="Acme Inc." />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LockIcon className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="current-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Current Password
                </label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="new-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  New Password
                </label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirm New Password
                </label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Theme Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Color Theme</label>
                <div className="flex gap-4">
                  <div
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-all ${theme === "light" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="rounded-full bg-white p-2 shadow-sm">
                      <SunIcon className="h-6 w-6 text-amber-500" />
                    </div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-all ${theme === "dark" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="rounded-full bg-slate-900 p-2 shadow-sm">
                      <MoonIcon className="h-6 w-6 text-slate-400" />
                    </div>
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 transition-all ${theme === "system" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="rounded-full bg-gradient-to-br from-white to-slate-900 p-2 shadow-sm">
                      <LaptopIcon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Date Format</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    MM/DD/YYYY
                  </Button>
                  <Button variant="outline" className="flex-1">
                    DD/MM/YYYY
                  </Button>
                  <Button className="flex-1">YYYY-MM-DD</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Currency Display</label>
                <div className="flex gap-2">
                  <Button className="flex-1">$1,234.56</Button>
                  <Button variant="outline" className="flex-1">
                    1,234.56 USD
                  </Button>
                  <Button variant="outline" className="flex-1">
                    $1234.56
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellIcon className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email for important alerts</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reconciliation Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when discrepancies are found</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Insights</p>
                  <p className="text-sm text-muted-foreground">Receive AI-generated insights and recommendations</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-muted-foreground">Receive a weekly summary of reconciliation activities</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DatabaseIcon className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Default Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Data Retention</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    30 Days
                  </Button>
                  <Button variant="outline" className="flex-1">
                    90 Days
                  </Button>
                  <Button className="flex-1">1 Year</Button>
                  <Button variant="outline" className="flex-1">
                    Forever
                  </Button>
                </div>
              </div>

              <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                <h3 className="flex items-center gap-2 font-medium">
                  <CloudIcon className="h-5 w-5 text-amber-500" />
                  Data Export
                </h3>
                <p className="mt-2 text-sm">
                  Export all your reconciliation data and settings for backup or migration purposes.
                </p>
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    Export All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <DatabaseIcon className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
                <h3 className="font-medium text-destructive">Reset Application</h3>
                <p className="mt-2 text-sm">
                  This will reset all your settings to default values. Your data will not be affected.
                </p>
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    Reset Settings
                  </Button>
                </div>
              </div>

              <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
                <h3 className="font-medium text-destructive">Delete All Data</h3>
                <p className="mt-2 text-sm">
                  This will permanently delete all your reconciliation data. This action cannot be undone.
                </p>
                <div className="mt-3">
                  <Button variant="destructive" size="sm">
                    Delete All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <SaveIcon className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}

