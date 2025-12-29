import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, TwitterIcon } from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              BiteBio
            </a>
            . The source code is available on{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="#" aria-label="Instagram">
                <HugeiconsIcon icon={InstagramIcon} className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
                <HugeiconsIcon icon={TwitterIcon} className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
        </div>
      </div>
    </footer>
  );
}
