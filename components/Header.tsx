"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { BellDot } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-end h-16">
          {/* Left */}

          {/* Right */}
          <div className="flex gap-4">
            <SignedIn>
              <Link href="/dashboard/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <BellDot className="h-5 w-5" />
                  <span className="absolute top-1 w-2 h-2 bg-primary rounded-full"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </Link>

              <Link href="/dashboard/manage-plan">
                <Button variant="ghost" className="mr-4 ">
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
