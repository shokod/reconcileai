// src/app/dashboard/page.tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Upload,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner"; // ← Sonner
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const router = useRouter();

  const [isPro, setIsPro] = useState(false);

  // Convex: Get all scans for this user
  const scans = useQuery(
    api.scans.getUserScans, 
    user?.id ? { userId: user.id } : "skip"
  );

  // Redirect if not signed in
  useEffect(() => {
    if (clerkLoaded && !user) {
      router.push("/");
    }
  }, [clerkLoaded, user, router]);

  // Check Pro status
  useEffect(() => {
    if (user?.publicMetadata?.plan === "pro") {
      setIsPro(true);
    }
  }, [user]);

  // Loading state - show skeleton while Clerk is loading
  if (!clerkLoaded) {
    return <DashboardSkeleton />;
  }

  // Stats
  const totalScans = scans?.length || 0;
  const hallucinations = scans?.filter(s => 
    s.content?.some((m: any) => m.hallucination)
  ).length || 0;
  const accuracy = totalScans > 0 
    ? Math.round(((totalScans - hallucinations) / totalScans) * 100)
    : 100;
  const scansThisWeek = scans?.filter(s => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return s.createdAt > weekAgo;
  }).length || 0;

  // Default to empty array if scans is still loading
  const scansList = scans || [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || "User"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your AI support health in real-time.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/dashboard/uploads" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Log
            </Link>
          </Button>
          {!isPro && (
            <Button
              variant="outline"
              onClick={() => {
                toast.info("Upgrade to Pro for unlimited scans & reports!");
                router.push("/dashboard/billing");
              }}
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Upgrade to Pro
            </Button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Scans</CardTitle>
            <ShieldCheck className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans}</div>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Accuracy Rate</CardTitle>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accuracy}%</div>
            <Progress value={accuracy} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Hallucinations</CardTitle>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hallucinations}</div>
            <p className="text-xs text-red-600">
              {hallucinations > 0 
                ? `-${(hallucinations / totalScans * 100).toFixed(1)}% from goal`
                : "Perfect!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
            <Clock className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scansThisWeek}</div>
            <p className="text-xs text-gray-500">Scans in last 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Scans</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/scans">View all →</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {scansList.length > 0 ? (
            <div className="space-y-3">
              {scansList.slice(0, 5).map((scan) => {
                const halluCount = scan.content?.filter((m: any) => m.hallucination).length || 0;
                const isRecent = Date.now() - scan.createdAt < 60 * 60 * 1000;

                return (
                  <div
                    key={scan._id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-white hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      {isRecent && (
                        <Badge variant="secondary" className="text-xs">NEW</Badge>
                      )}
                      <div>
                        <p className="font-medium text-sm">{scan.fileName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(scan.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={halluCount > 0 ? "text-red-600" : "text-green-600"}>
                        {halluCount} hallucination{halluCount !== 1 ? "s" : ""}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/scans/${scan._id}`}>View →</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No scans yet. Upload your first chat log!</p>
              <Button
                className="mt-3"
                onClick={() => {
                  router.push("/dashboard/uploads");
                }}
              >
                Get Started
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pro CTA */}
      {!isPro && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Unlock Pro Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              Get unlimited scans, PDF reports, AI agent logs, and priority support.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/dashboard/billing")}
            >
              Upgrade Now – $49/mo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Skeleton Loader
function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-full mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}