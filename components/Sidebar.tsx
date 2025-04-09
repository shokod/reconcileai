"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Wallet,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  UploadCloud,
  CheckCircle,
  DownloadCloud,
  File,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Uploads", href: "/uploads", icon: UploadCloud },
  { name: "Reconciliation", href: "/reconcile", icon: CheckCircle },
  { name: "Reports", href: "/reports", icon: File },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  //   { name: "Organization", href: "/organization", icon: Building2 },
  //   { name: "Projects", href: "/projects", icon: Folder },
  { name: "Report Builder", href: "/report-builder", icon: Wallet },
  { name: "Export Center", href: "/export-center", icon: DownloadCloud },
  { name: "Payments", href: "/payments", icon: CreditCard },
  //   { name: "Members", href: "/members", icon: Users2 },
  //   { name: "Permissions", href: "/permissions", icon: Shield },
  //   { name: "Chat", href: "/chat", icon: MessagesSquare },
  //   { name: "Meetings", href: "/meetings", icon: Video },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  type NavItem = {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  };

  const NavItem = ({
    item,
    isBottom = false,
  }: {
    item: NavItem;
    isBottom?: boolean;
  }) => (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            isCollapsed && "justify-center px-2",
            isBottom && "w-auto" ,// Example usage of isBottom
          )}
        >
          <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span>{item.name}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <>
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div
          className={cn(
            "flex flex-col bg-background transition-all duration-300 ease-in-out lg:static",
            isCollapsed ? "w-[72px]" : "w-72",
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="border-b border-border">
            <div
              className={cn(
                "flex h-16 items-center gap-2 px-4",
                isCollapsed && "justify-center px-2",
              )}
            >
              {!isCollapsed && (
                <Link href="/" className="flex items-center gap-4">
                  <div className="text-xl font-bold mb-4 my-8 pl-4">
                    Reconcile Agent
                  </div>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                className={cn("ml-auto h-8 w-8", isCollapsed && "ml-0")}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isCollapsed && "rotate-180",
                  )}
                />
                <span className="sr-only">
                  {isCollapsed ? "Expand" : "Collapse"} Sidebar
                </span>
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex flex-col justify-start">
            <nav className="space-y-1 px-2 py-4 shrink-0">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
          <div className="border-t border-border p-2">
            <nav className="space-y-1">
              {bottomNavigation.map((item) => (
                <NavItem key={item.name} item={item} isBottom />
              ))}
            </nav>
          </div>
        </div>
      </>
    </TooltipProvider>
  );
}
