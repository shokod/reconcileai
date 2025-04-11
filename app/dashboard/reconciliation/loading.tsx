import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="mt-2 h-4 w-[350px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-[120px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-10 w-[250px]" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-16" />
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-[80px]" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-[120px]" />
                  </th>
                  <th className="px-4 py-3 text-right">
                    <Skeleton className="h-4 w-[100px] ml-auto" />
                  </th>
                  <th className="px-4 py-3 text-right">
                    <Skeleton className="h-4 w-[100px] ml-auto" />
                  </th>
                  <th className="px-4 py-3 text-center">
                    <Skeleton className="h-4 w-[80px] mx-auto" />
                  </th>
                  <th className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-[120px]" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-[80px]" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-[120px]" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Skeleton className="h-4 w-[80px] ml-auto" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Skeleton className="h-4 w-[80px] ml-auto" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Skeleton className="h-6 w-[80px] mx-auto rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-8 w-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  )
}

