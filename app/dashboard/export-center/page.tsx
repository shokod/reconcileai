"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DownloadIcon,
  PrinterIcon,
  FileIcon as FilePdfIcon,
  FileSpreadsheetIcon,
  FileIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  CalendarIcon,
  RefreshCwIcon as RefreshIcon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExportCenterPage() {
  const [selectedExports, setSelectedExports] = useState<number[]>([])

  const toggleExportSelection = (id: number) => {
    if (selectedExports.includes(id)) {
      setSelectedExports(selectedExports.filter((exportId) => exportId !== id))
    } else {
      setSelectedExports([...selectedExports, id])
    }
  }

  const selectAllExports = () => {
    setSelectedExports(recentExports.map((exp) => exp.id))
  }

  const clearSelection = () => {
    setSelectedExports([])
  }

  const recentExports = [
    {
      id: 1,
      name: "Monthly Reconciliation Report - March 2025",
      date: "2025-03-15",
      format: "PDF",
      size: "2.4 MB",
      status: "completed",
    },
    {
      id: 2,
      name: "Transaction Details Export",
      date: "2025-03-14",
      format: "Excel",
      size: "4.8 MB",
      status: "completed",
    },
    {
      id: 3,
      name: "Discrepancy Analysis Report",
      date: "2025-03-12",
      format: "PDF",
      size: "1.7 MB",
      status: "completed",
    },
    {
      id: 4,
      name: "Bank Fee Analysis - Q1 2025",
      date: "2025-03-10",
      format: "PDF",
      size: "3.2 MB",
      status: "completed",
    },
    {
      id: 5,
      name: "Comprehensive Audit Report",
      date: "2025-03-08",
      format: "PDF",
      size: "8.5 MB",
      status: "processing",
    },
  ]

  const scheduledExports = [
    {
      id: 101,
      name: "Daily Reconciliation Summary",
      frequency: "Daily",
      format: "PDF",
      recipients: "finance@example.com",
      nextRun: "Tomorrow, 6:00 AM",
    },
    {
      id: 102,
      name: "Weekly Exception Report",
      frequency: "Weekly",
      format: "Excel",
      recipients: "team@example.com",
      nextRun: "Monday, 8:00 AM",
    },
    {
      id: 103,
      name: "Monthly Financial Summary",
      frequency: "Monthly",
      format: "PDF",
      recipients: "management@example.com",
      nextRun: "April 1, 2025",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Export Center</h1>
        <p className="text-muted-foreground">Manage, download, and schedule your reports and exports</p>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="recent">Recent Exports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
          <TabsTrigger value="new">New Export</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Exports</CardTitle>
              <div className="flex gap-2">
                {selectedExports.length > 0 ? (
                  <>
                    <Button variant="outline" size="sm" onClick={clearSelection}>
                      Clear Selection ({selectedExports.length})
                    </Button>
                    <Button size="sm">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Download Selected
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={selectAllExports}>
                    Select All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[40px] px-4 py-3 text-left text-sm font-medium"></th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Format</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentExports.map((export_item) => (
                      <tr key={export_item.id} className="border-b">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedExports.includes(export_item.id)}
                            onChange={() => toggleExportSelection(export_item.id)}
                            disabled={export_item.status === "processing"}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">{export_item.name}</td>
                        <td className="px-4 py-3 text-sm">{export_item.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            {export_item.format === "PDF" ? (
                              <FilePdfIcon className="h-4 w-4 text-red-500" />
                            ) : export_item.format === "Excel" ? (
                              <FileSpreadsheetIcon className="h-4 w-4 text-green-500" />
                            ) : (
                              <FileIcon className="h-4 w-4" />
                            )}
                            {export_item.format}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{export_item.size}</td>
                        <td className="px-4 py-3 text-sm">
                          {export_item.status === "completed" ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckIcon className="h-4 w-4" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-600">
                              <ClockIcon className="h-4 w-4" />
                              Processing
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <Button variant="outline" size="sm" disabled={export_item.status === "processing"}>
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" disabled={export_item.status === "processing"}>
                              <PrinterIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" disabled={export_item.status === "processing"}>
                              <MailIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Scheduled Exports</CardTitle>
              <Button size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule New Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Frequency</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Format</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Recipients</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Next Run</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledExports.map((export_item) => (
                      <tr key={export_item.id} className="border-b">
                        <td className="px-4 py-3 text-sm font-medium">{export_item.name}</td>
                        <td className="px-4 py-3 text-sm">{export_item.frequency}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            {export_item.format === "PDF" ? (
                              <FilePdfIcon className="h-4 w-4 text-red-500" />
                            ) : export_item.format === "Excel" ? (
                              <FileSpreadsheetIcon className="h-4 w-4 text-green-500" />
                            ) : (
                              <FileIcon className="h-4 w-4" />
                            )}
                            {export_item.format}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{export_item.recipients}</td>
                        <td className="px-4 py-3 text-sm">{export_item.nextRun}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="mt-6 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Create New Export</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reconciliation">Reconciliation Summary</SelectItem>
                        <SelectItem value="transactions">Transaction Details</SelectItem>
                        <SelectItem value="discrepancies">Discrepancy Analysis</SelectItem>
                        <SelectItem value="bankfees">Bank Fee Analysis</SelectItem>
                        <SelectItem value="audit">Audit Report</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Export Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Include Sections</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="include-summary" defaultChecked />
                        <label htmlFor="include-summary" className="text-sm">
                          Summary
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="include-details" defaultChecked />
                        <label htmlFor="include-details" className="text-sm">
                          Transaction Details
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="include-charts" defaultChecked />
                        <label htmlFor="include-charts" className="text-sm">
                          Charts & Graphs
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Delivery Options</label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="download" defaultChecked />
                        <label htmlFor="download" className="text-sm">
                          Download Immediately
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="email" />
                        <label htmlFor="email" className="text-sm">
                          Send via Email
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Recipients (optional)</label>
                      <Input placeholder="email@example.com" />
                      <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Generate Export</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

