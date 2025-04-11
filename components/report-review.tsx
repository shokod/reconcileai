"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ReportPreviewProps {
  reportType: string
  reportTitle: string
}

export function ReportPreview({ reportType, reportTitle }: ReportPreviewProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = React.useState<Date>()

  const getReportContent = () => {
    switch (reportType) {
      case "summary":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Monthly Reconciliation Summary</h3>
              <p className="text-sm text-muted-foreground">March 1-31, 2025</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md bg-muted p-2">
                <p className="text-xs font-medium">Total Transactions</p>
                <p className="text-lg font-bold">1,248</p>
              </div>
              <div className="rounded-md bg-muted p-2">
                <p className="text-xs font-medium">Match Rate</p>
                <p className="text-lg font-bold">98.2%</p>
              </div>
              <div className="rounded-md bg-muted p-2">
                <p className="text-xs font-medium">Discrepancies</p>
                <p className="text-lg font-bold">23</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Key Findings</h4>
              <ul className="space-y-1 text-xs">
                <li className="flex items-start gap-1">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                  <span>Overall reconciliation accuracy improved by 1.2%</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                  <span>23 unmatched transactions identified</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Bank fees totaling $245.75 not recorded in POS</span>
                </li>
              </ul>
            </div>
            <div className="h-20 rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Summary Chart</p>
            </div>
          </div>
        )
      case "analysis":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Discrepancy Analysis</h3>
              <p className="text-sm text-muted-foreground">March 1-31, 2025</p>
            </div>
            <div className="h-24 rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Discrepancy Trend Chart</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Discrepancy Categories</h4>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Timing Differences</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Bank Fees</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Rounding Errors</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: "15%" }}></div>
                </div>
              </div>
            </div>
          </div>
        )
      case "unmatched":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Unmatched Transactions Report</h3>
              <p className="text-sm text-muted-foreground">March 1-31, 2025</p>
            </div>
            <div className="rounded-md border">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-1 text-left">Date</th>
                    <th className="p-1 text-left">Description</th>
                    <th className="p-1 text-right">Amount</th>
                    <th className="p-1 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-1">03/04/25</td>
                    <td className="p-1">Sale #12347</td>
                    <td className="p-1 text-right">$325.75</td>
                    <td className="p-1 text-center">
                      <span className="rounded-full bg-red-100 px-1 py-0.5 text-[10px] text-red-800">Missing</span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">03/04/25</td>
                    <td className="p-1">Bank Fee</td>
                    <td className="p-1 text-right">$35.00</td>
                    <td className="p-1 text-center">
                      <span className="rounded-full bg-amber-100 px-1 py-0.5 text-[10px] text-amber-800">
                        Unmatched
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">03/02/25</td>
                    <td className="p-1">Sale #12350</td>
                    <td className="p-1 text-right">$475.50</td>
                    <td className="p-1 text-center">
                      <span className="rounded-full bg-blue-100 px-1 py-0.5 text-[10px] text-blue-800">
                        Discrepancy
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Resolution Recommendations</h4>
              <ul className="space-y-1 text-xs">
                <li className="flex items-start gap-1">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
                  <span>Verify Sale #12347 in POS system</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                  <span>Record monthly bank fee in accounting system</span>
                </li>
              </ul>
            </div>
          </div>
        )
      case "fees":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Bank Fee Analysis</h3>
              <p className="text-sm text-muted-foreground">March 1-31, 2025</p>
            </div>
            <div className="h-24 rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Fee Trend Chart</p>
            </div>
            <div className="rounded-md border">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-1 text-left">Fee Type</th>
                    <th className="p-1 text-right">Amount</th>
                    <th className="p-1 text-right">% Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-1">Monthly Service</td>
                    <td className="p-1 text-right">$35.00</td>
                    <td className="p-1 text-right">0%</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">Transaction Fees</td>
                    <td className="p-1 text-right">$125.50</td>
                    <td className="p-1 text-right text-green-600">-5%</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">Wire Transfers</td>
                    <td className="p-1 text-right">$75.00</td>
                    <td className="p-1 text-right text-red-600">+12%</td>
                  </tr>
                </tbody>
                <tfoot className="bg-muted/30">
                  <tr className="border-t">
                    <td className="p-1 font-medium">Total</td>
                    <td className="p-1 text-right font-medium">$235.50</td>
                    <td className="p-1 text-right">+2%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )
      case "daily":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Daily Sales Reconciliation</h3>
              <p className="text-sm text-muted-foreground">March 1-31, 2025</p>
            </div>
            <div className="h-24 rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Daily Sales Chart</p>
            </div>
            <div className="rounded-md border">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-1 text-left">Date</th>
                    <th className="p-1 text-right">POS Sales</th>
                    <th className="p-1 text-right">Bank Deposits</th>
                    <th className="p-1 text-right">Variance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-1">03/05/25</td>
                    <td className="p-1 text-right">$2,030.50</td>
                    <td className="p-1 text-right">$2,030.50</td>
                    <td className="p-1 text-right">$0.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">03/04/25</td>
                    <td className="p-1 text-right">$325.75</td>
                    <td className="p-1 text-right">$0.00</td>
                    <td className="p-1 text-right text-red-600">-$325.75</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">03/03/25</td>
                    <td className="p-1 text-right">$2,450.25</td>
                    <td className="p-1 text-right">$2,450.25</td>
                    <td className="p-1 text-right">$0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      case "trend":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Quarterly Trend Analysis</h3>
              <p className="text-sm text-muted-foreground">Q1 2025</p>
            </div>
            <div className="h-24 rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Quarterly Trend Chart</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Key Metrics</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Match Rate</span>
                    <span className="font-medium">98.2%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: "98.2%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Resolution Time</span>
                    <span className="font-medium">1.8 days</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Monthly Comparison</h4>
              <div className="rounded-md border">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-1 text-left">Month</th>
                      <th className="p-1 text-right">Transactions</th>
                      <th className="p-1 text-right">Match Rate</th>
                      <th className="p-1 text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-1">January</td>
                      <td className="p-1 text-right">1,125</td>
                      <td className="p-1 text-right">96.5%</td>
                      <td className="p-1 text-right">-</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-1">February</td>
                      <td className="p-1 text-right">1,203</td>
                      <td className="p-1 text-right">97.3%</td>
                      <td className="p-1 text-right text-green-600">↑ 0.8%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-1">March</td>
                      <td className="p-1 text-right">1,248</td>
                      <td className="p-1 text-right">98.2%</td>
                      <td className="p-1 text-right text-green-600">↑ 0.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case "annual":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Annual Financial Summary</h3>
              <p className="text-sm text-muted-foreground">2024</p>
            </div>
            <div className="h-24 rounded-md bg-muted/50 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Annual Performance Chart</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-muted p-2">
                <p className="text-xs font-medium">Total Transactions</p>
                <p className="text-lg font-bold">14,562</p>
                <p className="text-xs text-muted-foreground">+12% from 2023</p>
              </div>
              <div className="rounded-md bg-muted p-2">
                <p className="text-xs font-medium">Average Match Rate</p>
                <p className="text-lg font-bold">97.8%</p>
                <p className="text-xs text-muted-foreground">+2.3% from 2023</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Quarterly Breakdown</h4>
              <div className="rounded-md border">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-1 text-left">Quarter</th>
                      <th className="p-1 text-right">Transactions</th>
                      <th className="p-1 text-right">Match Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-1">Q1 2024</td>
                      <td className="p-1 text-right">3,576</td>
                      <td className="p-1 text-right">97.3%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-1">Q2 2024</td>
                      <td className="p-1 text-right">3,682</td>
                      <td className="p-1 text-right">97.5%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-1">Q3 2024</td>
                      <td className="p-1 text-right">3,524</td>
                      <td className="p-1 text-right">98.1%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-1">Q4 2024</td>
                      <td className="p-1 text-right">3,780</td>
                      <td className="p-1 text-right">98.3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case "audit":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Audit Trail Report</h3>
              <p className="text-sm text-muted-foreground">March 1-31, 2025</p>
            </div>
            <div className="rounded-md border">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-1 text-left">Date/Time</th>
                    <th className="p-1 text-left">User</th>
                    <th className="p-1 text-left">Action</th>
                    <th className="p-1 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-1">03/15/25 09:23</td>
                    <td className="p-1">john.doe</td>
                    <td className="p-1">Reconciliation</td>
                    <td className="p-1">Completed March reconciliation</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">03/14/25 14:45</td>
                    <td className="p-1">jane.smith</td>
                    <td className="p-1">Manual Match</td>
                    <td className="p-1">Matched transaction #12347</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">03/12/25 11:30</td>
                    <td className="p-1">john.doe</td>
                    <td className="p-1">Upload</td>
                    <td className="p-1">Uploaded bank statement</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">03/12/25 11:28</td>
                    <td className="p-1">john.doe</td>
                    <td className="p-1">Upload</td>
                    <td className="p-1">Uploaded POS data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">User Activity Summary</h4>
              <div className="rounded-md border">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-1 text-left">User</th>
                      <th className="p-1 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-1">john.doe</td>
                      <td className="p-1 text-right">15</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-1">jane.smith</td>
                      <td className="p-1 text-right">8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case "exception":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold">Exception Report</h3>
              <p className="text-sm text-muted-foreground">March 1-31, 2025</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Exception Summary</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md bg-muted p-2">
                  <p className="text-xs font-medium">Total Exceptions</p>
                  <p className="text-lg font-bold">23</p>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <p className="text-xs font-medium">Resolved</p>
                  <p className="text-lg font-bold">18</p>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <p className="text-xs font-medium">Pending</p>
                  <p className="text-lg font-bold">5</p>
                </div>
              </div>
            </div>
            <div className="rounded-md border">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-1 text-left">Exception ID</th>
                    <th className="p-1 text-left">Type</th>
                    <th className="p-1 text-left">Status</th>
                    <th className="p-1 text-left">Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-1">EXC-001</td>
                    <td className="p-1">Missing Transaction</td>
                    <td className="p-1">
                      <span className="rounded-full bg-green-100 px-1 py-0.5 text-[10px] text-green-800">Resolved</span>
                    </td>
                    <td className="p-1">Manual entry added</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">EXC-002</td>
                    <td className="p-1">Bank Fee</td>
                    <td className="p-1">
                      <span className="rounded-full bg-green-100 px-1 py-0.5 text-[10px] text-green-800">Resolved</span>
                    </td>
                    <td className="p-1">Recorded in accounting</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-1">EXC-003</td>
                    <td className="p-1">Duplicate Entry</td>
                    <td className="p-1">
                      <span className="rounded-full bg-amber-100 px-1 py-0.5 text-[10px] text-amber-800">Pending</span>
                    </td>
                    <td className="p-1">Under investigation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No preview available</p>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <EyeIcon className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{reportTitle} Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{getReportContent()}</div>
      </DialogContent>
    </Dialog>
  )
}

