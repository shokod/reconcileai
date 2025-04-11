"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Upload, X } from "lucide-react"

interface FileUploaderProps {
  accept: string
  onFileSelected: (file: File) => void
  selectedFile: File | null
}

export function FileUploader({ accept, onFileSelected, selectedFile }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      onFileSelected(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      onFileSelected(file)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onFileSelected(null as any)
  }

  return (
    <div className="w-full">
      <Input type="file" ref={fileInputRef} accept={accept} onChange={handleFileChange} className="hidden" />

      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-blue-50">
              <Upload className="h-6 w-6 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Drag and drop your file here</h3>
              <p className="text-sm text-gray-500">or click the button below to browse files</p>
            </div>
            <Button type="button" onClick={handleButtonClick} variant="outline">
              Browse Files
            </Button>
            <p className="text-xs text-gray-500">Supported formats: PDF, CSV</p>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-md">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

