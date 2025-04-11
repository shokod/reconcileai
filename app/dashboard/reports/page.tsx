"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  FileTextIcon,
  DownloadIcon,
  PrinterIcon,
  FilterIcon,
  CalendarIcon,
  BarChart3Icon,
  FileIcon,
  FileSpreadsheetIcon,
  FileIcon as FilePdfIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReportPreview } from "@/components/report-preview"

export default function ReportsPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedReport, setSelectedReport] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [reportType, setReportType] = useState("all")
  const [exportFormat, setExportFormat] = useState("pdf")

  const reports = [
    {
      id: 1,
      title: "Monthly Reconciliation Summary",
      description: "Overview of all reconciliations for the selected period",
      date: "March 2025",
      type: "summary",
      icon: FileTextIcon,
    },
    {
      id: 2,
      title: "Discrepancy Analysis",
      description: "Detailed analysis of all discrepancies found",
      date: "March 2025",
      type: "analysis",
      icon: BarChart3Icon,
    },
    {
      id: 3,
      title: "Unmatched Transactions Report",
      description: "List of all unmatched transactions requiring attention",
      date: "March 2025",
      type: "unmatched",
      icon: FileTextIcon,
    },
    {
      id: 4,
      title: "Bank Fee Analysis",
      description: "Summary of all bank fees and charges",
      date: "March 2025",
      type: "fees",
      icon: FileTextIcon,
    },
    {
      id: 5,
      title: "Daily Sales Reconciliation",
      description: "Day-by-day comparison of POS sales vs bank deposits",
      date: "March 2025",
      type: "daily",
      icon: FileTextIcon,
    },
    {
      id: 6,
      title: "Quarterly Trend Analysis",
      description: "Trends in reconciliation accuracy over the quarter",
      date: "Q1 2025",
      type: "trend",
      icon: BarChart3Icon,
    },
    {
      id: 7,
      title: "Annual Financial Summary",
      description: "Year-end summary of all financial reconciliation activities",
      date: "2024",
      type: "annual",
      icon: FileTextIcon,
    },
    {
      id: 8,
      title: "Audit Trail Report",
      description: "Complete audit trail of all reconciliation activities",
      date: "March 2025",
      type: "audit",
      icon: FileTextIcon,
    },
    {
      id: 9,
      title: "Exception Report",
      description: "Detailed report of all exceptions and their resolutions",
      date: "March 2025",
      type: "exception",
      icon: FileTextIcon,
    },
  ]

  const filteredReports = reports.filter((report) => {
    // Filter by type
    if (reportType !== "all" && report.type !== reportType) {
      return false
    }

    // Filter by search term
    if (
      searchTerm &&
      !report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !report.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const handlePrint = () => {
    window.print()
  }

  const handleExport = (format: string) => {
    // In a real app, this would trigger an API call to generate the export
    console.log(`Exporting report in ${format} format`)
    // Simulate download
    setTimeout(() => {
      alert(`Report exported as ${format.toUpperCase()}`)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">View, customize, and export reconciliation reports</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filter Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="summary">Summary Reports</SelectItem>
                  <SelectItem value="analysis">Analysis Reports</SelectItem>
                  <SelectItem value="unmatched">Unmatched Transactions</SelectItem>
                  <SelectItem value="daily">Daily Reports</SelectItem>
                  <SelectItem value="trend">Trend Reports</SelectItem>
                  <SelectItem value="audit">Audit Reports</SelectItem>
                  <SelectItem value="exception">Exception Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <Card
            key={report.id}
            className={`shadow-sm transition-all ${selectedReport === report.id ? "ring-2 ring-primary" : ""}`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <report.icon className="h-5 w-5 text-primary" />
                {report.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{report.date}</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">{report.description}</p>
              <div className="flex justify-between">
                <ReportPreview reportType={report.type} reportTitle={report.title} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <PrinterIcon className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button size="sm" onClick={() => handleExport("pdf")}>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedReport && (
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{reports.find((r) => r.id === selectedReport)?.title} Preview</CardTitle>
            <div className="flex gap-2">
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Export as..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">
                    <div className="flex items-center gap-2">
                      <FilePdfIcon className="h-4 w-4" />
                      <span>PDF</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="excel">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheetIcon className="h-4 w-4" />
                      <span>Excel</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4" />
                      <span>CSV</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <PrinterIcon className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button size="sm" onClick={() => handleExport(exportFormat)}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-4 sm:grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-6 space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Report Summary</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-sm font-medium">Period</p>
                      <p className="text-lg">March 1-31, 2025</p>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-sm font-medium">Total Transactions</p>
                      <p className="text-lg">1,248</p>
                    </div>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-sm font-medium">Match Rate</p>
                      <p className="text-lg">98.2%</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium">Key Findings</h4>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                        <span>Overall reconciliation accuracy improved by 1.2% compared to previous month</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                        <span>23 unmatched transactions identified, primarily due to timing differences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                        <span>Bank fees totaling $245.75 were not recorded in the POS system</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                          <th className="px-4 py-3 text-right text-sm font-medium">POS Amount</th>
                          <th className="px-4 py-3 text-right text-sm font-medium">Bank Amount</th>
                          <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            date: "2025-03-05",
                            desc: "Sale #12345",
                            pos: "$1,250.00",
                            bank: "$1,250.00",
                            status: "Matched",
                          },
                          {
                            date: "2025-03-05",
                            desc: "Sale #12346",
                            pos: "$780.50",
                            bank: "$780.50",
                            status: "Matched",
                          },
                          { date: "2025-03-04", desc: "Sale #12347", pos: "$325.75", bank: "-", status: "Missing" },
                          { date: "2025-03-04", desc: "Bank Fee", pos: "-", bank: "$35.00", status: "Unmatched" },
                          {
                            date: "2025-03-03",
                            desc: "Sale #12348",
                            pos: "$1,500.00",
                            bank: "$1,500.00",
                            status: "Matched",
                          },
                          {
                            date: "2025-03-03",
                            desc: "Sale #12349",
                            pos: "$950.25",
                            bank: "$950.25",
                            status: "Matched",
                          },
                          {
                            date: "2025-03-02",
                            desc: "Sale #12350",
                            pos: "$475.50",
                            bank: "$475.00",
                            status: "Discrepancy",
                          },
                        ].map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="px-4 py-3 text-sm">{item.date}</td>
                            <td className="px-4 py-3 text-sm">{item.desc}</td>
                            <td className="px-4 py-3 text-right text-sm">{item.pos}</td>
                            <td className="px-4 py-3 text-right text-sm">{item.bank}</td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  item.status === "Matched"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                    : item.status === "Missing"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                      : item.status === "Unmatched"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="charts" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BarChart3Icon className="h-4 w-4" />
                        Daily Transaction Volume
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 w-full">
                        <div className="flex h-full flex-col justify-end">
                          <div className="flex h-full items-end gap-1 pb-6">
                            {[65, 72, 88, 75, 98, 86, 79, 92, 85, 78, 94, 82, 88, 75, 98].map((value, i) => (
                              <div key={i} className="group relative flex w-full flex-col items-center">
                                <div className="absolute -top-8 hidden rounded bg-black px-2 py-1 text-xs text-white group-hover:block dark:bg-white dark:text-black">
                                  {value}
                                </div>
                                <div
                                  className="w-full rounded-t bg-primary transition-all group-hover:opacity-80"
                                  style={{ height: `${value}%` }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BarChart3Icon className="h-4 w-4" />
                        Reconciliation Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-60 items-center justify-center">
                        <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 border-primary relative">
                          <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-green-500"></div>
                          <div className="absolute -left-3 -bottom-3 h-8 w-8 rounded-full bg-red-500"></div>
                          <div className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-amber-500"></div>
                          <div className="text-2xl font-bold">98.2%</div>
                          <div className="text-xs text-muted-foreground">Match Rate</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="customize" className="mt-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SlidersHorizontalIcon className="h-5 w-5" />
                      Customize Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Report Title</label>
                          <Input defaultValue={reports.find((r) => r.id === selectedReport)?.title} />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Date Range</label>
                          <div className="flex gap-2">
                            <Input type="date" defaultValue="2025-03-01" />
                            <Input type="date" defaultValue="2025-03-31" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Include Sections</label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="summary" defaultChecked />
                              <label htmlFor="summary" className="text-sm">
                                Summary
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="details" defaultChecked />
                              <label htmlFor="details" className="text-sm">
                                Transaction Details
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="charts" defaultChecked />
                              <label htmlFor="charts" className="text-sm">
                                Charts & Graphs
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="recommendations" defaultChecked />
                              <label htmlFor="recommendations" className="text-sm">
                                Recommendations
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Report Format</label>
                          <Select defaultValue="detailed">
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="summary">Summary Only</SelectItem>
                              <SelectItem value="detailed">Detailed</SelectItem>
                              <SelectItem value="comprehensive">Comprehensive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Sort Transactions By</label>
                          <Select defaultValue="date">
                            <SelectTrigger>
                              <SelectValue placeholder="Select sort order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="date">Date (Newest First)</SelectItem>
                              <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                              <SelectItem value="amount">Amount (Highest First)</SelectItem>
                              <SelectItem value="amount-asc">Amount (Lowest First)</SelectItem>
                              <SelectItem value="status">Status</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Additional Options</label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="logo" defaultChecked />
                              <label htmlFor="logo" className="text-sm">
                                Include Company Logo
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="page-numbers" defaultChecked />
                              <label htmlFor="page-numbers" className="text-sm">
                                Show Page Numbers
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="timestamp" defaultChecked />
                              <label htmlFor="timestamp" className="text-sm">
                                Include Generation Timestamp
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                      <Button variant="outline">Reset to Default</Button>
                      <Button>Generate Custom Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Scheduled Reports Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Scheduled Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Set up automated reports to be generated and delivered on a schedule.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Frequency</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Recipients</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Format</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Next Run</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm">Daily Reconciliation Summary</td>
                    <td className="px-4 py-3 text-sm">Daily</td>
                    <td className="px-4 py-3 text-sm">finance@example.com</td>
                    <td className="px-4 py-3 text-sm">PDF</td>
                    <td className="px-4 py-3 text-sm">Tomorrow, 6:00 AM</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm">Weekly Exception Report</td>
                    <td className="px-4 py-3 text-sm">Weekly</td>
                    <td className="px-4 py-3 text-sm">team@example.com</td>
                    <td className="px-4 py-3 text-sm">Excel</td>
                    <td className="px-4 py-3 text-sm">Monday, 8:00 AM</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Monthly Financial Summary</td>
                    <td className="px-4 py-3 text-sm">Monthly</td>
                    <td className="px-4 py-3 text-sm">management@example.com</td>
                    <td className="px-4 py-3 text-sm">PDF</td>
                    <td className="px-4 py-3 text-sm">April 1, 2025</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <Button>Schedule New Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

