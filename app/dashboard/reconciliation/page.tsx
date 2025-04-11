"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, CheckIcon, XIcon, AlertCircleIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ReconciliationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Sample data for demonstration
  const transactions = [
    {
      id: 1,
      date: "2025-03-05",
      description: "Sale #12345",
      posAmount: 1250.0,
      bankAmount: 1250.0,
      status: "matched",
      notes: "",
    },
    {
      id: 2,
      date: "2025-03-05",
      description: "Sale #12346",
      posAmount: 780.5,
      bankAmount: 780.5,
      status: "matched",
      notes: "",
    },
    {
      id: 3,
      date: "2025-03-04",
      description: "Sale #12347",
      posAmount: 325.75,
      bankAmount: null,
      status: "missing",
      notes: "Not found in bank statement",
    },
    {
      id: 4,
      date: "2025-03-04",
      description: "Bank Fee",
      posAmount: null,
      bankAmount: 35.0,
      status: "unmatched",
      notes: "Monthly service fee not in POS",
    },
    {
      id: 5,
      date: "2025-03-03",
      description: "Sale #12348",
      posAmount: 1500.0,
      bankAmount: 1500.0,
      status: "matched",
      notes: "",
    },
    {
      id: 6,
      date: "2025-03-03",
      description: "Sale #12349",
      posAmount: 950.25,
      bankAmount: 950.25,
      status: "matched",
      notes: "",
    },
    {
      id: 7,
      date: "2025-03-02",
      description: "Sale #12350",
      posAmount: 475.5,
      bankAmount: 475.0,
      status: "discrepancy",
      notes: "Possible rounding error",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    // Apply status filter
    if (filter !== "all" && transaction.status !== filter) {
      return false
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return transaction.description.toLowerCase().includes(searchLower) || transaction.date.includes(searchLower)
    }

    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "matched":
        return (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckIcon className="h-3 w-3" />
            Matched
          </span>
        )
      case "unmatched":
        return (
          <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-100">
            <AlertCircleIcon className="h-3 w-3" />
            Unmatched
          </span>
        )
      case "missing":
        return (
          <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-100">
            <XIcon className="h-3 w-3" />
            Missing
          </span>
        )
      case "discrepancy":
        return (
          <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <ArrowUpIcon className="h-3 w-3" />
            Discrepancy
          </span>
        )
      default:
        return null
    }
  }

  const addNote = (id: number, note: string) => {
    // In a real app, this would update the state or call an API
    console.log(`Adding note to transaction ${id}: ${note}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reconciliation</h1>
        <p className="text-muted-foreground">Compare bank statements with POS data</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Matched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {transactions.filter((t) => t.status === "matched").length}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unmatched/Missing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {transactions.filter((t) => t.status === "unmatched" || t.status === "missing").length}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Discrepancies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {transactions.filter((t) => t.status === "discrepancy").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Transaction Reconciliation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All
              </Button>
              <Button
                variant={filter === "matched" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("matched")}
              >
                Matched
              </Button>
              <Button
                variant={filter === "unmatched" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unmatched")}
              >
                Unmatched
              </Button>
              <Button
                variant={filter === "missing" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("missing")}
              >
                Missing
              </Button>
              <Button
                variant={filter === "discrepancy" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("discrepancy")}
              >
                Discrepancies
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">POS Amount</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Bank Amount</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm">{transaction.description}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      {transaction.posAmount !== null ? `$${transaction.posAmount.toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      {transaction.bankAmount !== null ? `$${transaction.bankAmount.toFixed(2)}` : "-"}
                    </td>
                    <td className="px-4 py-3 text-center">{getStatusBadge(transaction.status)}</td>
                    <td className="px-4 py-3 text-sm">
                      <Input
                        placeholder="Add notes..."
                        defaultValue={transaction.notes}
                        onChange={(e) => addNote(transaction.id, e.target.value)}
                        className="h-8 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Export Report</Button>
        <Button>Save Reconciliation</Button>
      </div>
    </div>
  )
}

