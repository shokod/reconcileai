"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Download, ArrowUpDown, Calendar } from "lucide-react"
import { toast } from "sonner"

// Mock data for the report
const MOCK_REPORT = {
  id: "report-123",
  createdAt: new Date().toISOString(),
  status: "completed",
  summary: {
    totalTransactions: 156,
    matchedTransactions: 142,
    discrepancies: 14,
    totalAmount: 24689.75,
    discrepancyAmount: 1245.32,
  },
  discrepancies: [
    {
      id: "disc-1",
      date: "2025-04-01",
      description: "Payment to Supplier WeChibage",
      bankAmount: 1250.0,
      posAmount: 1200.0,
      discrepancyAmount: 50.0,
      type: "amount_mismatch",
      suggestion:
        "The POS system may have recorded the payment without tax. Verify the tax calculation in your POS system.",
    },
    {
      id: "disc-2",
      date: "2025-04-02",
      description: "Customer Payment - Invoice #4592",
      bankAmount: 895.32,
      posAmount: null,
      discrepancyAmount: 895.32,
      type: "missing_in_pos",
      suggestion:
        "This transaction appears in the bank statement but not in POS data. Check if this payment was recorded manually outside the POS system.",
    },
    {
      id: "disc-3",
      date: "2025-04-03",
      description: "Refund - Customer #1089",
      bankAmount: null,
      posAmount: 300.0,
      discrepancyAmount: 300.0,
      type: "missing_in_bank",
      suggestion:
        "This refund appears in POS data but not in the bank statement. Verify if the refund was processed through a different payment method or account.",
    },
  ],
}

export default function ReportPage() {
  const report = MOCK_REPORT

  useEffect(() => {
    // Show toast when report is loaded
    toast.info(`Showing reconciliation report with ${report.discrepancies.length} discrepancies`)
  }, [report.discrepancies.length])

  if (!report) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading report...</h1>
      </div>
    )
  }

  const getDiscrepancyTypeLabel = (type: string) => {
    switch (type) {
      case "amount_mismatch":
        return "Amount Mismatch"
      case "missing_in_pos":
        return "Missing in POS"
      case "missing_in_bank":
        return "Missing in Bank"
      default:
        return "Unknown"
    }
  }

  const getDiscrepancyTypeColor = (type: string) => {
    switch (type) {
      case "amount_mismatch":
        return "orange"
      case "missing_in_pos":
        return "red"
      case "missing_in_bank":
        return "blue"
      default:
        return "gray"
    }
  }

  const handleExportPDF = () => {
    toast.info("Your report is being exported as PDF")

    // Simulate export delay
    setTimeout(() => {
      toast.success("Your report has been exported successfully")
    }, 2000)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reconciliation Report</h1>
          <p className="text-gray-500">
            Generated on {new Date(report.createdAt).toLocaleDateString()} at{" "}
            {new Date(report.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Link href="/dashboard/uploads">
            <Button
              size="sm"
              onClick={() => {
                toast.info("You can upload new files for reconciliation")
              }}
            >
              New Reconciliation
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{report.summary.totalTransactions}</div>
            <p className="text-sm text-gray-500 mt-1">
              {report.summary.matchedTransactions} matched (
              {Math.round((report.summary.matchedTransactions / report.summary.totalTransactions) * 100)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Discrepancies Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{report.summary.discrepancies}</div>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((report.summary.discrepancies / report.summary.totalTransactions) * 100)}% of total
              transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Discrepancy Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${report.summary.discrepancyAmount.toFixed(2)}</div>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((report.summary.discrepancyAmount / report.summary.totalAmount) * 100)}% of total amount
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="discrepancies"
        className="w-full"
        onValueChange={(value) => {
          toast.info(`Switched to ${value} tab`)
        }}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="discrepancies">Discrepancies</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="discrepancies">
          <Card>
            <CardHeader>
              <CardTitle>Identified Discrepancies</CardTitle>
              <CardDescription>Review the discrepancies found between your bank statement and POS data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.discrepancies.map((discrepancy) => (
                  <Card
                    key={discrepancy.id}
                    className="border-l-4"
                    style={{ borderLeftColor: `var(--${getDiscrepancyTypeColor(discrepancy.type)}-500)` }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base font-medium">{discrepancy.description}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {discrepancy.date}
                            </span>
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className={`bg-${getDiscrepancyTypeColor(discrepancy.type)}-50 text-${getDiscrepancyTypeColor(discrepancy.type)}-700 border-${getDiscrepancyTypeColor(discrepancy.type)}-200`}
                        >
                          {getDiscrepancyTypeLabel(discrepancy.type)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Bank Amount</p>
                          <p className="font-medium">
                            {discrepancy.bankAmount ? `$${discrepancy.bankAmount.toFixed(2)}` : "—"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">POS Amount</p>
                          <p className="font-medium">
                            {discrepancy.posAmount ? `$${discrepancy.posAmount.toFixed(2)}` : "—"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium mb-1">Suggested Action:</p>
                        <p className="text-sm text-gray-600">{discrepancy.suggestion}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Summary</CardTitle>
              <CardDescription>Overview of the reconciliation process and findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Bank Statement Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Transactions</span>
                        <span className="font-medium">
                          {report.summary.totalTransactions -
                            report.discrepancies.filter((d) => d.type === "missing_in_bank").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Amount</span>
                        <span className="font-medium">
                          $
                          {(
                            report.summary.totalAmount -
                            report.discrepancies
                              .filter((d) => d.type === "missing_in_bank")
                              .reduce((sum, d) => sum + (d.posAmount || 0), 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">POS Data Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Transactions</span>
                        <span className="font-medium">
                          {report.summary.totalTransactions -
                            report.discrepancies.filter((d) => d.type === "missing_in_pos").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Amount</span>
                        <span className="font-medium">
                          $
                          {(
                            report.summary.totalAmount -
                            report.discrepancies
                              .filter((d) => d.type === "missing_in_pos")
                              .reduce((sum, d) => sum + (d.bankAmount || 0), 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Discrepancy Breakdown</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-5 w-5 text-yellow-600" />
                        <span>Amount Mismatches</span>
                      </div>
                      <div className="font-medium">
                        {report.discrepancies.filter((d) => d.type === "amount_mismatch").length} transactions
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span>Missing in POS</span>
                      </div>
                      <div className="font-medium">
                        {report.discrepancies.filter((d) => d.type === "missing_in_pos").length} transactions
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-blue-600" />
                        <span>Missing in Bank</span>
                      </div>
                      <div className="font-medium">
                        {report.discrepancies.filter((d) => d.type === "missing_in_bank").length} transactions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                This report was generated using AI analysis of your uploaded files. For detailed transaction matching,
                download the full report.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
