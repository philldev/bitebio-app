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
        // Create the profile in storage with a full set of default widgets
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
                        bio: data.bio || "Welcome to our digital home!",
                        avatarUrl: "",
                    },
                },
                {
                    id: "h1",
                    type: "heading",
                    size: "full-sm",
                    data: {
                        title: "Featured Item",
                        subtitle: "A little taste of what we offer",
                    },
                },
                {
                    id: "m1",
                    type: "menu",
                    size: "2x2",
                    data: {
                        name: "Signature Dish",
                        price: "$15.00",
                        description: "Our most popular item, prepared fresh daily.",
                        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
                    },
                },
                {
                    id: "l1",
                    type: "link",
                    size: "2x1",
                    data: {
                        title: "Follow us on Instagram",
                        url: "https://instagram.com",
                        icon: "InstagramIcon",
                        description: "@yourcafe",
                    },
                },
                {
                    id: "map1",
                    type: "map",
                    size: "2x1",
                    data: {
                        location: "123 Cafe Street, Food City",
                    },
                },
                {
                    id: "g1",
                    type: "gallery",
                    size: "full-sm",
                    data: {
                        images: [
                            { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80" },
                            { url: "https://images.unsplash.com/photo-1559925373-c5099368e8a9?auto=format&fit=crop&w=400&q=80" },
                            { url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80" },
                            { url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" },
                        ],
                    },
                },
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
