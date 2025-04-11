"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  FileTextIcon,
  SlidersHorizontalIcon,
  LayoutIcon,
  TableIcon,
  BarChart3Icon,
  PieChartIcon,
  LineChartIcon,
  SaveIcon,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportBuilderPage() {
  const [reportTitle, setReportTitle] = useState("Custom Reconciliation Report")
  const [reportSections, setReportSections] = useState([
    { id: 1, type: "header", title: "Summary" },
    { id: 2, type: "table", title: "Transaction Details" },
    { id: 3, type: "chart", chartType: "bar", title: "Transaction Volume" },
  ])

  const addSection = (type: string) => {
    const newId = reportSections.length > 0 ? Math.max(...reportSections.map((s) => s.id)) + 1 : 1

    let newSection = {
      id: newId,
      type: type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
    }

    if (type === "chart") {
      newSection = { ...newSection, chartType: "bar" }
    }

    setReportSections([...reportSections, newSection])
  }

  const removeSection = (id: number) => {
    setReportSections(reportSections.filter((section) => section.id !== id))
  }

  const handleSaveTemplate = () => {
    // In a real app, this would save the template to a database
    alert("Report template saved successfully!")
  }

  const handleGenerateReport = () => {
    // In a real app, this would generate the report
    alert("Report generated successfully!")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report Builder</h1>
        <p className="text-muted-foreground">Create custom reports with drag-and-drop sections</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <Input
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="text-xl font-bold border-none p-0 h-auto focus-visible:ring-0"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportSections.map((section) => (
                  <Card key={section.id} className="shadow-sm border-dashed">
                    <CardHeader className="py-3 flex flex-row items-center justify-between">
                      <CardTitle className="text-base">{section.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => removeSection(section.id)}>
                          Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3">
                      {section.type === "header" && (
                        <div className="space-y-2">
                          <div className="h-4 w-3/4 bg-muted rounded"></div>
                          <div className="h-4 w-1/2 bg-muted rounded"></div>
                        </div>
                      )}

                      {section.type === "table" && (
                        <div className="border rounded-md overflow-hidden">
                          <div className="bg-muted p-2">
                            <div className="grid grid-cols-4 gap-2">
                              <div className="h-4 bg-muted-foreground/20 rounded"></div>
                              <div className="h-4 bg-muted-foreground/20 rounded"></div>
                              <div className="h-4 bg-muted-foreground/20 rounded"></div>
                              <div className="h-4 bg-muted-foreground/20 rounded"></div>
                            </div>
                          </div>
                          <div className="p-2">
                            {[1, 2, 3].map((row) => (
                              <div key={row} className="grid grid-cols-4 gap-2 py-1 border-b last:border-0">
                                <div className="h-4 bg-muted rounded"></div>
                                <div className="h-4 bg-muted rounded"></div>
                                <div className="h-4 bg-muted rounded"></div>
                                <div className="h-4 bg-muted rounded"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.type === "chart" && (
                        <div className="h-40 border rounded-md flex items-center justify-center">
                          {section.chartType === "bar" && (
                            <BarChart3Icon className="h-12 w-12 text-muted-foreground/50" />
                          )}
                          {section.chartType === "pie" && (
                            <PieChartIcon className="h-12 w-12 text-muted-foreground/50" />
                          )}
                          {section.chartType === "line" && (
                            <LineChartIcon className="h-12 w-12 text-muted-foreground/50" />
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <Button variant="outline" onClick={() => addSection("header")} className="rounded-r-none">
                      <LayoutIcon className="mr-2 h-4 w-4" />
                      Add Header
                    </Button>
                    <Button variant="outline" onClick={() => addSection("table")} className="rounded-none border-x-0">
                      <TableIcon className="mr-2 h-4 w-4" />
                      Add Table
                    </Button>
                    <Button variant="outline" onClick={() => addSection("chart")} className="rounded-l-none">
                      <BarChart3Icon className="mr-2 h-4 w-4" />
                      Add Chart
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleSaveTemplate}>
              <SaveIcon className="mr-2 h-4 w-4" />
              Save Template
            </Button>
            <Button onClick={handleGenerateReport}>
              <FileTextIcon className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontalIcon className="h-5 w-5" />
                Report Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Format</label>
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
                  <label className="text-sm font-medium">Data Source</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="matched">Matched Only</SelectItem>
                      <SelectItem value="unmatched">Unmatched Only</SelectItem>
                      <SelectItem value="discrepancies">Discrepancies Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Options</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="include-logo" defaultChecked />
                      <label htmlFor="include-logo" className="text-sm">
                        Include Company Logo
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="include-summary" defaultChecked />
                      <label htmlFor="include-summary" className="text-sm">
                        Include Executive Summary
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="include-charts" defaultChecked />
                      <label htmlFor="include-charts" className="text-sm">
                        Include Charts
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="include-footer" defaultChecked />
                      <label htmlFor="include-footer" className="text-sm">
                        Include Page Numbers
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5" />
                Saved Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Monthly Reconciliation Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Executive Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Detailed Transaction Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Audit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

