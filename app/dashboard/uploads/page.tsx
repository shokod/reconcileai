"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileUpIcon,
  FileTextIcon,
  BanknoteIcon as BankIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  CalendarIcon,
  ArrowRightIcon,
  UploadCloudIcon,
  FileIcon,
  RefreshCwIcon,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function UploadPage() {
  const [bankFile, setBankFile] = useState<File | null>(null);
  const [posFile, setPosFile] = useState<File | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const handleBankFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBankFile(e.target.files[0]);
      toast.success(`Bank file "${e.target.files[0].name}" selected`);
    }
  };

  const handlePosFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPosFile(e.target.files[0]);
      toast.success(`POS file "${e.target.files[0].name}" selected`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check each required field individually and provide specific error messages
    if (!bankFile) {
      toast.error("Please upload a bank statement file");
      return;
    }

    if (!posFile) {
      toast.error("Please upload a POS data file");
      return;
    }

    if (!dateRange || !dateRange.from || !dateRange.to) {
      toast.error(
        "Please select a complete date range (both start and end dates)",
      );
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload process with progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          setActiveTab("preview");
          toast.success("Files uploaded and processed successfully");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetForm = () => {
    setBankFile(null);
    setPosFile(null);
    setDateRange(undefined);
    setUploadProgress(0);
    setUploadComplete(false);
    toast.info("Form has been reset");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Documents</h1>
        <p className="text-muted-foreground">
          Upload your bank statement and POS data for reconciliation
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="preview" disabled={!uploadComplete}>
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    <BankIcon className="h-5 w-5 text-primary" />
                    Bank Statement
                  </CardTitle>
                  <CardDescription>
                    Upload your bank statement file for reconciliation
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div
                    className={`relative rounded-lg border-2 border-dashed ${
                      bankFile
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25"
                    } p-6 text-center transition-all hover:border-green-500/50 hover:bg-green-500/5`}
                  >
                    <input
                      id="bank-file"
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      accept=".pdf,.csv,.xlsx,.xls"
                      onChange={handleBankFileChange}
                    />
                    <div className="mb-4 flex justify-center">
                      {bankFile ? (
                        <div className="rounded-full bg-primary/10 p-3">
                          <FileIcon className="h-10 w-10 text-primary" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-muted p-3">
                          <UploadCloudIcon className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {bankFile ? (
                        <>
                          <p className="text-sm font-medium text-primary">
                            File selected
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="outline" className="font-normal">
                              {bankFile.type || "Unknown type"}
                            </Badge>
                            <Badge variant="outline" className="font-normal">
                              {(bankFile.size / 1024 / 1024).toFixed(2)} MB
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{bankFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Click or drag to replace
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium">
                            Drag and drop your bank statement file
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports PDF, CSV, or Excel files
                          </p>
                          <p className="text-xs text-primary">
                            Click to browse files
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircleIcon className="h-4 w-4 shrink-0 text-amber-500" />
                    <p>
                      Make sure your bank statement includes all transactions
                      for the selected period. Files should be less than 10MB.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    <FileUpIcon className="h-5 w-5 text-primary" />
                    POS Data
                  </CardTitle>
                  <CardDescription>
                    Upload your point of sale data for the same period
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div
                    className={`relative rounded-lg border-2 border-dashed ${
                      posFile
                        ? "border-primary bg-green-500/5"
                        : "border-muted-foreground/25"
                    } p-6 text-center transition-all hover:border-green-500/50 hover:bg-green-500/5`}
                  >
                    <input
                      id="pos-file"
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      accept=".pdf,.csv,.xlsx,.xls"
                      onChange={handlePosFileChange}
                    />
                    <div className="mb-4 flex justify-center">
                      {posFile ? (
                        <div className="rounded-full bg-primary/10 p-3">
                          <FileIcon className="h-10 w-10 text-primary" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-muted p-3">
                          <UploadCloudIcon className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {posFile ? (
                        <>
                          <p className="text-sm font-medium text-primary">
                            File selected
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="outline" className="font-normal">
                              {posFile.type || "Unknown type"}
                            </Badge>
                            <Badge variant="outline" className="font-normal">
                              {(posFile.size / 1024 / 1024).toFixed(2)} MB
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{posFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Click or drag to replace
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium">
                            Drag and drop your POS data file
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports PDF, CSV, or Excel files
                          </p>
                          <p className="text-xs text-primary">
                            Click to browse files
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircleIcon className="h-4 w-4 shrink-0 text-amber-500" />
                    <p>
                      Export your POS data for the same period as your bank
                      statement. Make sure all transactions are included.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Date Range
                </CardTitle>
                <CardDescription>
                  Select the date range for reconciliation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    
                  </div>
                  <DatePickerWithRange className="w-full md:w-auto" />
                  {(!dateRange || !dateRange.from || !dateRange.to) && (
                    <p className="text-xs text-muted-foreground">
                      Please select both start and end dates for the
                      reconciliation period
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {uploading && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Upload Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing files...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={uploading}
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                type="submit"
                disabled={
                  !bankFile ||
                  !posFile ||
                  !dateRange ||
                  !dateRange.from ||
                  !dateRange.to ||
                  uploading
                }
              >
                {uploading ? (
                  <>
                    <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <UploadCloudIcon className="mr-2 h-4 w-4" />
                    Upload and Process
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileTextIcon className="h-5 w-5 text-primary" />
                  Document Preview
                </CardTitle>
                <CardDescription>
                  Preview of uploaded files for the period{" "}
                  {dateRange && dateRange.from && dateRange.to
                    ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                    : "selected date range"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Bank Statement</h3>
                      {bankFile && (
                        <Badge variant="outline" className="font-normal">
                          {bankFile.name}
                        </Badge>
                      )}
                    </div>
                    <div className="rounded-md border">
                      <div className="bg-muted/50 p-3">
                        <div className="grid grid-cols-3 gap-2 font-medium">
                          <span>Date</span>
                          <span>Description</span>
                          <span className="text-right">Amount</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="space-y-2">
                          {[
                            {
                              date: "2025-03-05",
                              desc: "Deposit",
                              amount: "$1,250.00",
                            },
                            {
                              date: "2025-03-05",
                              desc: "Deposit",
                              amount: "$780.50",
                            },
                            {
                              date: "2025-03-04",
                              desc: "Bank Fee",
                              amount: "$35.00",
                            },
                            {
                              date: "2025-03-03",
                              desc: "Deposit",
                              amount: "$1,500.00",
                            },
                            {
                              date: "2025-03-03",
                              desc: "Deposit",
                              amount: "$950.25",
                            },
                            {
                              date: "2025-03-02",
                              desc: "Deposit",
                              amount: "$475.00",
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-3 gap-2 border-b py-2 text-sm last:border-0"
                            >
                              <span>{item.date}</span>
                              <span>{item.desc}</span>
                              <span className="text-right">{item.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">POS Data</h3>
                      {posFile && (
                        <Badge variant="outline" className="font-normal">
                          {posFile.name}
                        </Badge>
                      )}
                    </div>
                    <div className="rounded-md border">
                      <div className="bg-muted/50 p-3">
                        <div className="grid grid-cols-3 gap-2 font-medium">
                          <span>Date</span>
                          <span>Sale ID</span>
                          <span className="text-right">Amount</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="space-y-2">
                          {[
                            {
                              date: "2025-03-05",
                              id: "#12345",
                              amount: "$1,250.00",
                            },
                            {
                              date: "2025-03-05",
                              id: "#12346",
                              amount: "$780.50",
                            },
                            {
                              date: "2025-03-04",
                              id: "#12347",
                              amount: "$325.75",
                            },
                            {
                              date: "2025-03-03",
                              id: "#12348",
                              amount: "$1,500.00",
                            },
                            {
                              date: "2025-03-03",
                              id: "#12349",
                              amount: "$950.25",
                            },
                            {
                              date: "2025-03-02",
                              id: "#12350",
                              amount: "$475.50",
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-3 gap-2 border-b py-2 text-sm last:border-0"
                            >
                              <span>{item.date}</span>
                              <span>{item.id}</span>
                              <span className="text-right">{item.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileTextIcon className="h-5 w-5 text-primary" />
                  Initial Analysis
                </CardTitle>
                <CardDescription>
                  Preliminary analysis of the uploaded data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-800">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-300" />
                        </div>
                        <h3 className="font-medium">Matched Transactions</h3>
                      </div>
                      <p className="mt-2 text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">
                        Total value: $4,480.75
                      </p>
                    </div>

                    <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-1.5 dark:bg-amber-800">
                          <AlertCircleIcon className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                        </div>
                        <h3 className="font-medium">Unmatched Transactions</h3>
                      </div>
                      <p className="mt-2 text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">
                        Total value: $360.75
                      </p>
                    </div>

                    <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-800">
                          <ArrowRightIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="font-medium">Discrepancies</h3>
                      </div>
                      <p className="mt-2 text-2xl font-bold">1</p>
                      <p className="text-sm text-muted-foreground">
                        Total value: $0.50
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 font-medium">AI Insights</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 rounded-lg border p-4">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
                        <div>
                          <p className="font-medium">Missing Transaction</p>
                          <p className="text-sm text-muted-foreground">
                            Sale #12347 for $325.75 on 2025-03-04 is missing
                            from bank statement
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg border p-4">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-amber-500" />
                        <div>
                          <p className="font-medium">Bank Fee</p>
                          <p className="text-sm text-muted-foreground">
                            Bank fee of $35.00 on 2025-03-04 is not recorded in
                            POS system
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg border p-4">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                        <div>
                          <p className="font-medium">Amount Discrepancy</p>
                          <p className="text-sm text-muted-foreground">
                            Sale #12350 amount differs: $475.50 in POS vs
                            $475.00 in bank (possible rounding error)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t bg-muted/20 px-6 py-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("upload")}
                >
                  Back to Upload
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Navigating to reconciliation page");
                    window.location.href = "/reconciliation";
                  }}
                >
                  View Full Reconciliation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
