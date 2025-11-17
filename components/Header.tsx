"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { BellDot } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.startsWith("/dashboard");
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className={`fixed top-0 right-0 z-50 transition-[left] duration-300 bg-white backdrop-blur-sm border-b border-gray-200 ${
      isDashboard ? "left-0 lg:left-64" : "left-0"
    }`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left - Logo/Brand */}
        <Link href="/" className="flex items-center">
          <div className="text-lg font-semibold text-gray-900">
            Reconcile Agent
          </div>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3">
          {isLoaded && isSignedIn ? (
            <>
              <Link href="/dashboard/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <BellDot className="h-5 w-5" />
                  <span className="absolute top-1 w-2 h-2 bg-primary rounded-full"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </Link>

              <Link href="/dashboard/manage-plan">
                <Button variant="ghost">
                  Manage Plan
                </Button>
              </Link>

              <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200">
                <UserButton />
              </div>
            </>
          ) : (
            <Button 
              variant="default" 
              size="lg"
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
