"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login, remembering the page they tried to visit
      router.push(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <HugeiconsIcon icon={Loading03Icon} className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not loading and no user, we render nothing while the useEffect redirects
  if (!user) {
    return null; 
  }

  return <>{children}</>;
}
