"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function UploadPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("bank")
  const [uploadState, setUploadState] = useState({
    bank: { status: "idle", progress: 0, file: null as File | null },
    pos: { status: "idle", progress: 0, file: null as File | null },
  })
  const [reconciliationId, setReconciliationId] = useState<string | null>(null)

  // Mock functions for demo
  const createReconciliation = async () => "mock-id-" + Date.now()

  const handleFileSelected = (fileType: "bank" | "pos", file: File) => {
    setUploadState((prev) => ({
      ...prev,
      [fileType]: { ...prev[fileType], file, status: "selected" },
    }))

    toast.info(`${file.name} is ready to upload`)
  }

  const uploadFile = async (fileType: "bank" | "pos") => {
    const file = uploadState[fileType].file
    if (!file) return

    try {
      // Update status to uploading
      setUploadState((prev) => ({
        ...prev,
        [fileType]: { ...prev[fileType], status: "uploading", progress: 0 },
      }))

      toast.info(`Uploading ${file.name}...`)

      // If this is the first file, create a new reconciliation record
      if (!reconciliationId) {
        const id = await createReconciliation()
        setReconciliationId(id)
      }

      // Simulate file upload with progress
      const simulateProgress = () => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 10
          setUploadState((prev) => ({
            ...prev,
            [fileType]: { ...prev[fileType], progress: Math.min(progress, 100) },
          }))

          if (progress >= 100) {
            clearInterval(interval)
            setUploadState((prev) => ({
              ...prev,
              [fileType]: { ...prev[fileType], status: "complete" },
            }))

            toast.success(`${file.name} has been uploaded successfully`)

            // If both files are uploaded, start processing
            const otherType = fileType === "bank" ? "pos" : "bank"
            if (uploadState[otherType].status === "complete") {
              startProcessingFiles()
            } else {
              // Move to the next tab if not both complete
              setActiveTab(otherType)

              toast.info(`Please upload your ${otherType === "bank" ? "bank statement" : "POS data"} file`)
            }
          }
        }, 300)
      }

      // For demo, we'll just simulate the upload
      simulateProgress()
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadState((prev) => ({
        ...prev,
        [fileType]: { ...prev[fileType], status: "error" },
      }))

      toast.error("There was an error uploading your file. Please try again.")
    }
  }

  const startProcessingFiles = async () => {
    try {
      toast.info("Your files are being processed. This may take a moment...")

      // For demo, we'll just redirect to the processing page after a delay
      setTimeout(() => {
        router.push(`/dashboard/processing/${reconciliationId || "demo-id"}`)
      }, 1000)
    } catch (error) {
      console.error("Error starting processing:", error)

      toast.error("There was an error starting the reconciliation process. Please try again.")
    }
  }

  const renderUploadStatus = (fileType: "bank" | "pos") => {
    const { status, progress } = uploadState[fileType]

    if (status === "idle" || status === "selected") {
      return null
    }

    if (status === "uploading") {
      return (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )
    }

    if (status === "complete") {
      return (
        <div className="mt-4 flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Upload complete</span>
        </div>
      )
    }

    if (status === "error") {
      return (
        <div className="mt-4 flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>Upload failed. Please try again.</span>
        </div>
      )
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload Files</h1>
        <p className="text-gray-500 mt-2">
          Upload your bank statement and POS data files to begin the reconciliation process.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bank">Bank Statement</TabsTrigger>
          <TabsTrigger value="pos">POS Data</TabsTrigger>
        </TabsList>

        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Upload Bank Statement</CardTitle>
              <CardDescription>Upload your bank statement file (PDF or CSV format)</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader
                accept=".pdf,.csv"
                onFileSelected={(file) => handleFileSelected("bank", file)}
                selectedFile={uploadState.bank.file}
              />
              {renderUploadStatus("bank")}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/dashboard")
                  toast.info("You've returned to the dashboard")
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => uploadFile("bank")}
                disabled={
                  !uploadState.bank.file ||
                  uploadState.bank.status === "uploading" ||
                  uploadState.bank.status === "complete"
                }
              >
                Upload & Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pos">
          <Card>
            <CardHeader>
              <CardTitle>Upload POS Data</CardTitle>
              <CardDescription>Upload your point of sale data file (PDF or CSV format)</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader
                accept=".pdf,.csv"
                onFileSelected={(file) => handleFileSelected("pos", file)}
                selectedFile={uploadState.pos.file}
              />
              {renderUploadStatus("pos")}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("bank")}>
                Back
              </Button>
              <Button
                onClick={() => uploadFile("pos")}
                disabled={
                  !uploadState.pos.file ||
                  uploadState.pos.status === "uploading" ||
                  uploadState.pos.status === "complete"
                }
              >
                Upload & Process
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

