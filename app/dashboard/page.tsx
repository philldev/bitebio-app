"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon, UserCircleIcon } from "@hugeicons/core-free-icons";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full" />
                 ) : (
                    <HugeiconsIcon icon={UserCircleIcon} className="h-8 w-8" />
                 )}
                 <span className="text-sm font-medium hidden md:inline-block">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                <HugeiconsIcon icon={Logout01Icon} className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-8">
          <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Welcome back, {user?.name}!</h2>
            <p className="text-muted-foreground mb-6">
              This is your dashboard placeholder. In the next phase, you will manage your businesses here.
            </p>
            <div className="inline-block bg-muted px-4 py-2 rounded text-sm font-mono">
                User ID: {user?.id}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
