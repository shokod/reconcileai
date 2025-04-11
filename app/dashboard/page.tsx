// export default function Home() {
//   return (
//     <div className="relative min-h-[calc(100vh-8rem)]"> {/* Adjust based on header height */}
//       <div className="container mx-auto p-4 md:p-6 justify-items-center">
//         <h1 className="text-2xl font-bold mb-4 my-8">
//           Reconcile Agent Dashboard
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Reconcile Agent is a platform that helps you manage your finances.
//         </p>
//       </div>

//       {/* Absolute positioned element */}
//       {/* <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20vw] font-bold leading-none sm:text-[15vw] md:text-[12vw] lg:text-[10vw] pointer-events-none">
//         <span className="bg-gradient-to-b from-gray-200 to-gray-100/30 to-80% bg-clip-text text-transparent -tracking-wide">
//           Reconcile•Agent
//         </span>
//         <span className="absolute inset-0 bg-gray-300/70 bg-clip-text text-transparent mix-blend-darken [text-shadow:0_1px_0_white] -tracking-wide">
//           Reconcile•Agent
//         </span>
//       </div> */}
      
//     </div>
//   );
// }
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Calendar, AlertTriangle, CheckCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Mock data for the dashboard
const MOCK_RECONCILIATIONS = [
  {
    id: "rec-1",
    createdAt: "2025-04-05T10:25:02.000Z",
    status: "completed",
    bankFileName: "bank-statement-apr-2025.pdf",
    posFileName: "pos-data-apr-2025.csv",
    discrepancies: 14,
    totalTransactions: 156,
  },
  {
    id: "rec-2",
    createdAt: "2025-03-31T14:12:45.000Z",
    status: "completed",
    bankFileName: "bank-statement-mar-2025.pdf",
    posFileName: "pos-data-mar-2025.csv",
    discrepancies: 8,
    totalTransactions: 142,
  },
  {
    id: "rec-3",
    createdAt: "2025-02-28T09:45:12.000Z",
    status: "completed",
    bankFileName: "bank-statement-feb-2025.pdf",
    posFileName: "pos-data-feb-2025.csv",
    discrepancies: 5,
    totalTransactions: 128,
  },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [reconciliations, setReconciliations] = useState(MOCK_RECONCILIATIONS)

  useEffect(() => {
    // Show toast when dashboard is loaded
    toast.info(`Showing ${reconciliations.length} reconciliation records`)
  }, [reconciliations.length])

  const filteredReconciliations = reconciliations.filter((rec) => {
    const matchesSearch =
      rec.bankFileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.posFileName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || rec.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query) {
      toast.info(`Filtering by "${query}"`)
    }
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)

    if (value !== "all") {
      toast.info(`Showing ${value} reconciliations`)
    } else {
      toast.info("Cleared status filter")
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Manage your reconciliations and view reports</p>
        </div>
        <Link href="/upload">
          <Button
            onClick={() => {
              toast.info("You can upload new files for reconciliation")
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Reconciliation
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Reconciliations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reconciliations.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Discrepancies Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reconciliations.reduce((sum, rec) => sum + rec.discrepancies, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Discrepancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                (reconciliations.reduce((sum, rec) => sum + rec.discrepancies, 0) /
                  reconciliations.reduce((sum, rec) => sum + rec.totalTransactions, 0)) *
                  100,
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reconciliations</CardTitle>
          <CardDescription>View and manage your recent reconciliation reports</CardDescription>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search by filename..." className="pl-8" value={searchQuery} onChange={handleSearch} />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReconciliations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No reconciliations found</p>
              </div>
            ) : (
              filteredReconciliations.map((reconciliation) => (
                <div
                  key={reconciliation.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                >
                  <div className="flex items-start gap-3 mb-4 md:mb-0">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <FileText className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {reconciliation.bankFileName} / {reconciliation.posFileName}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(reconciliation.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {reconciliation.discrepancies} discrepancies
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Badge variant={reconciliation.status === "completed" ? "success" : "outline"} className="md:mr-4">
                      {reconciliation.status === "completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {reconciliation.status.charAt(0).toUpperCase() + reconciliation.status.slice(1)}
                    </Badge>
                    <Link href={`/reports/${reconciliation.id}`} className="w-full md:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full md:w-auto"
                        onClick={() => {
                          toast.info(`Opening report for ${reconciliation.bankFileName}`)
                        }}
                      >
                        View Report
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
