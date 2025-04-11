import { Sidebar } from "@/components/Sidebar";
import ClientWrapper from "@/components/ClientWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen flex bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Header should go here if you want it inside the main content area */}
          <Header />
          <ClientWrapper>
            <SignedIn>
              <div className="flex-1 overflow-auto">
                <div className="container mx-auto p-6 max-w-7xl">
                  <main className="w-full">{children}</main>
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn signInFallbackRedirectUrl="/dashboard" />
            </SignedOut>
          </ClientWrapper>
        </div>
      </div>
    </TooltipProvider>
  );
}
