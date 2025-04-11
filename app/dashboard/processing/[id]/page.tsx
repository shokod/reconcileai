// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Loader2 } from "lucide-react"

// export default function ProcessingPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//   const [progress, setProgress] = useState(0)
//   const [currentStep, setCurrentStep] = useState("Extracting data from files")

//   useEffect(() => {
//     // Simulate the processing steps
//     const steps = [
//       { name: "Extracting data from files", duration: 3000 },
//       { name: "Analyzing transactions", duration: 2500 },
//       { name: "Identifying discrepancies", duration: 2000 },
//       { name: "Generating report", duration: 1500 },
//     ]

//     let currentStepIndex = 0
//     const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0)
//     let elapsedTime = 0

//     const interval = setInterval(() => {
//       elapsedTime += 100
//       const currentProgress = Math.min(100, Math.floor((elapsedTime / totalDuration) * 100))
//       setProgress(currentProgress)

//       // Update current step
//       let timeSum = 0
//       for (let i = 0; i < steps.length; i++) {
//         timeSum += steps[i].duration
//         if (elapsedTime <= timeSum) {
//           if (currentStepIndex !== i) {
//             currentStepIndex = i
//             setCurrentStep(steps[i].name)
//           }
//           break
//         }
//       }

//       // When complete, redirect to the report page
//       if (currentProgress === 100) {
//         clearInterval(interval)
//         setTimeout(() => {
//           router.push(`/dashbord/reports/${params.id}`)
//         }, 500)
//       }
//     }, 100)

//     return () => clearInterval(interval)
//   }, [params.id, router])

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <Card className="w-full max-w-lg">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl">Processing Your Files</CardTitle>
//           <CardDescription>Our AI is analyzing your bank statement and POS data</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-8">
//           <div className="space-y-2">
//             <Progress value={progress} className="h-2" />
//             <div className="flex justify-between text-sm text-gray-500">
//               <span>Progress: {progress}%</span>
//             </div>
//           </div>

//           <div className="flex items-center justify-center gap-3 text-lg">
//             <Loader2 className="h-6 w-6 animate-spin" />
//             <span>{currentStep}</span>
//           </div>

//           <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
//             <p>
//               This process typically takes 1-2 minutes. We're using AI to extract data from your files, identify
//               discrepancies, and generate a comprehensive report.
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function ProcessingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("Extracting data from files")

  useEffect(() => {
    // Show initial toast when processing starts
    toast.info("We're analyzing your files. This will take a minute or two.")

    // Simulate the processing steps
    const steps = [
      { name: "Extracting data from files", duration: 3000 },
      { name: "Analyzing transactions", duration: 2500 },
      { name: "Identifying discrepancies", duration: 2000 },
      { name: "Generating report", duration: 1500 },
    ]

    let currentStepIndex = 0
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0)
    let elapsedTime = 0

    const interval = setInterval(() => {
      elapsedTime += 100
      const currentProgress = Math.min(100, Math.floor((elapsedTime / totalDuration) * 100))
      setProgress(currentProgress)

      // Update current step
      let timeSum = 0
      for (let i = 0; i < steps.length; i++) {
        timeSum += steps[i].duration
        if (elapsedTime <= timeSum) {
          if (currentStepIndex !== i) {
            currentStepIndex = i
            setCurrentStep(steps[i].name)

            // Show toast for each new step
            toast.info(`Step ${i + 1} of ${steps.length}: ${steps[i].name}`)
          }
          break
        }
      }

      // When complete, redirect to the report page
      if (currentProgress === 100) {
        clearInterval(interval)

        toast.success("Your reconciliation report is ready to view")

        setTimeout(() => {
          router.push(`/dashboard/report/${params.id}`)
        }, 500)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [params.id, router])

  return (
    <div className="container max-w-2xl py-20">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Processing Your Files</CardTitle>
          <CardDescription>Our AI is analyzing your bank statement and POS data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Progress: {progress}%</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-lg">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>{currentStep}</span>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
            <p>
              This process typically takes 1-2 minutes. We're using AI to extract data from your files, identify
              discrepancies, and generate a comprehensive report.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
