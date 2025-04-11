"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <div className="flex items-center justify-between h-16">
            {/* <Link href="/dashboard" className="flex items-center gap-4">
              <div className="text-xl font-bold mb-4 my-8 pl-4">
                Reconcile Agent
              </div>
            </Link> */}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <SignedIn>
              {/* <Link href="/dashboard/uploads">
                <Button variant="ghost" className="mr-4 ">
                  Upload
                </Button>
              </Link>
              <Link href="/dashboard/reconciliations">
                <Button variant="ghost" className="mr-4 ">
                  Reconcile
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="ghost" className="mr-4 ">
                  Analytics
                </Button>
              </Link>
              <Link href="/dashboard/reports">
                <Button variant="ghost" className="mr-4 ">
                  Reports
                </Button>
              </Link> */}
              <Link href="/dashboard/manage-plan">
                <Button variant="outline" className="mr-4 ">
                  Manage Plan
                </Button>
              </Link>

              <div className="p-2 w-10 h-10 flex items-center justify-center rounded-full border bg-blue-100 border-blue-200 mr-4 ">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="mr-4">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
