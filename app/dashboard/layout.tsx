"use client";

import React, { useEffect } from "react";
import { useAuth, User } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    Coffee01Icon,
    DashboardSquare01Icon,
    UserCircleIcon, 
    Layout01Icon, 
    Settings02Icon,
    Logout01Icon,
  
  ViewIcon,
  Menu01Icon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: DashboardSquare01Icon },
  { label: "Profile Info", href: "/dashboard/profile", icon: UserCircleIcon },
  { label: "Widgets", href: "/dashboard/widgets", icon: Layout01Icon },
  { label: "Settings", href: "/dashboard/settings", icon: Settings02Icon },
];

const SidebarContent = ({ 
  pathname, 
  user, 
  logout 
}: { 
  pathname: string, 
  user: User | null, 
  logout: () => void 
}) => (
  <div className="flex flex-col h-full bg-card border-r border-border">
    <div className="p-6">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <HugeiconsIcon icon={Coffee01Icon} size={18} />
        </div>
        <span className="text-xl font-bold tracking-tight">bitebio</span>
      </Link>

      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <HugeiconsIcon icon={Icon} size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>

    <div className="mt-auto p-6 border-t border-border space-y-4">
      <Link 
        href={`/${user?.username}`} 
        target="_blank"
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <HugeiconsIcon icon={ViewIcon} size={20} />
        View Public Profile
      </Link>
      <button
        onClick={logout}
        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
      >
        <HugeiconsIcon icon={Logout01Icon} size={20} />
        Logout
      </button>
      
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
          {user?.name?.[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <HugeiconsIcon icon={Coffee01Icon} size={18} />
          </div>
          <span className="text-lg font-bold">bitebio</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <HugeiconsIcon icon={Menu01Icon} size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarContent pathname={pathname} user={user} logout={logout} />
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 h-screen sticky top-0">
          <SidebarContent pathname={pathname} user={user} logout={logout} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  );
}
