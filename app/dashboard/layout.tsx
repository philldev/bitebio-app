"use client";

import { BusinessProvider } from "@/components/auth/business-context";
import { AuthGuard } from "@/components/auth/auth-guard";
import { BusinessSwitcher } from "@/components/dashboard/business-switcher";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon, UserCircleIcon, Home01Icon, Settings01Icon } from "@hugeicons/core-free-icons";

function DashboardShell({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b h-16 flex items-center px-4 md:px-8 justify-between bg-card">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="font-bold text-xl text-primary hidden md:block">
                        BiteBio
                    </Link>
                    <BusinessSwitcher />
                    <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                         <Link href="/dashboard" className="flex items-center hover:text-foreground transition-colors">
                             <HugeiconsIcon icon={Home01Icon} className="mr-2 h-4 w-4" />
                             Overview
                         </Link>
                         <Link href="/dashboard/settings" className="flex items-center hover:text-foreground transition-colors">
                             <HugeiconsIcon icon={Settings01Icon} className="mr-2 h-4 w-4" />
                             Settings
                         </Link>
                    </nav>
                </div>
                
                <div className="flex items-center gap-2">
                     <span className="text-sm font-medium hidden md:inline-block text-muted-foreground mr-2">{user?.name}</span>
                     <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                        <HugeiconsIcon icon={Logout01Icon} className="h-5 w-5" />
                     </Button>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-8 bg-muted/10">
                {children}
            </main>
        </div>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <BusinessProvider>
        <DashboardShell>
            {children}
        </DashboardShell>
      </BusinessProvider>
    </AuthGuard>
  );
}
