"use client";

import { OnboardingStepProps } from "../types";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Copy01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { storage } from "@/lib/storage";
import { Profile } from "@/types/profile";

export function StepSuccess({ data }: OnboardingStepProps) {
    const [copied, setCopied] = useState(false);
    const { signup } = useAuth();
    const profileUrl = `bitebio.app/${data.username}`;

    useEffect(() => {
        // Create the profile in storage
        const newProfile: Profile = {
            username: data.username,
            displayName: data.displayName,
            themeColor: data.themeColor,
            widgets: [
                {
                    id: "p1",
                    type: "profile",
                    size: "full",
                    data: {
                        name: data.displayName,
                        bio: data.bio || "",
                        avatarUrl: "",
                    },
                }
            ]
        };
        
        storage.saveProfile(newProfile);

        // Auto-login the user
        signup({
            email: `${data.username}@example.com`,
            name: data.displayName,
            username: data.username,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

  return (
    <div className="space-y-8 text-center py-8">
      <div className="flex justify-center">
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={48} className="text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">You&apos;re all set!</h2>
        <p className="text-muted-foreground text-lg">
          Your profile for <strong>{data.displayName}</strong> is ready.
        </p>
      </div>

      <div className="bg-muted p-4 rounded-lg flex items-center justify-between max-w-sm mx-auto">
        <code className="text-sm font-mono">{profileUrl}</code>
        <Button size="icon" variant="ghost" onClick={handleCopy}>
            {copied ? <span className="text-green-500 font-bold text-xs">Copied</span> : <HugeiconsIcon icon={Copy01Icon} size={18} />}
        </Button>
      </div>

      <div className="pt-4 space-y-3">
        <Button asChild className="w-full max-w-sm" size="lg">
          <Link href="/dashboard">
            Go to Dashboard <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="ml-2" />
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full max-w-sm" size="lg">
          <Link href={`/${data.username}`} target="_blank">
            View Live Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}
