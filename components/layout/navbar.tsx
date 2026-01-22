"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu01Icon, Coffee01Icon } from "@hugeicons/react";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <Coffee01Icon size={18} variant="rounded" />
                </div>
                <span className="font-bold text-xl text-primary tracking-tight">bitebio</span>
            </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="transition-colors hover:text-primary font-semibold text-primary">
                Dashboard
              </Link>
              <Button asChild size="sm" variant="outline">
                <Link href={`/${user?.username}`}>My Profile</Link>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Login
              </Link>
              <Button asChild size="sm">
                <Link href="/onboard">Get Started</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open Menu">
                        <Menu01Icon size={20} />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <div className="flex flex-col gap-4 mt-8">
                        <Link href="/" className="text-lg font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="text-lg font-medium">
                            About
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link href="/dashboard" className="text-lg font-medium text-primary">
                                    Dashboard
                                </Link>
                                <Link href={`/${user?.username}`} className="text-lg font-medium">
                                    My Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-lg font-medium">
                                    Login
                                </Link>
                                <Button asChild className="w-full">
                                    <Link href="/onboard">Get Started</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
