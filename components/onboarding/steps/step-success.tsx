"use client";

import { OnboardingStepProps } from "../types";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, ArrowRight01Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useState } from "react";

export function StepSuccess({ data }: OnboardingStepProps) {
    const [copied, setCopied] = useState(false);
    const profileUrl = `bitebio.app/${data.username}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

  return (
    <div className="space-y-8 text-center py-8">
      <div className="flex justify-center">
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">You're all set!</h2>
        <p className="text-muted-foreground text-lg">
          Your profile for <strong>{data.displayName}</strong> is ready.
        </p>
      </div>

      <div className="bg-muted p-4 rounded-lg flex items-center justify-between max-w-sm mx-auto">
        <code className="text-sm font-mono">{profileUrl}</code>
        <Button size="icon" variant="ghost" onClick={handleCopy}>
            {copied ? <span className="text-green-500 font-bold text-xs">Copied</span> : <HugeiconsIcon icon={Copy01Icon} className="h-4 w-4" />}
        </Button>
      </div>

      <div className="pt-4 space-y-3">
        <Button asChild className="w-full max-w-sm" size="lg">
          <Link href={`/${data.username}`}>
            View Live Profile <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground">
            (Note: Since this is a demo, the link will take you to a mock profile page)
        </p>
      </div>
    </div>
  );
}
