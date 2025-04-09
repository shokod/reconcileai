import { Sidebar } from "@/components/Sidebar";
import ClientWrapper from "@/components/ClientWrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1">
          <ClientWrapper>
          <SignedIn>
              <div className="container mx-auto p-6 max-w-7xl">
                <main className="w-full">{children}</main>
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
