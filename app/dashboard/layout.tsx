import { Sidebar } from "@/components/Sidebar";
import ClientWrapper from "@/components/ClientWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <ClientWrapper>
        <SignedIn>
          <Header />
          <Sidebar />
          <Toaster position="top-right" richColors />
          <main className="min-h-screen pt-16 transition-[margin] duration-300 lg:ml-64">
            <div className="p-6">
              {children}
            </div>
          </main>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn signInFallbackRedirectUrl="/dashboard" />
        </SignedOut>
      </ClientWrapper>
    </TooltipProvider>
  );
}
