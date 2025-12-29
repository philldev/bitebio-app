import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
            {/* Logo placeholder - replace with actual logo later */}
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl text-primary">BiteBio</span>
            </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About
          </Link>
          <Link href="/login" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Login
          </Link>
          <Button asChild size="sm">
            <Link href="/onboard">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open Menu">
                        <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
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
                        <Link href="/login" className="text-lg font-medium">
                            Login
                        </Link>
                        <Button asChild className="w-full">
                            <Link href="/onboard">Get Started</Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
