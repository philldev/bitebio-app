"use client";

import { MockAuthService } from "@/lib/mock-auth-service";
import { useAuth } from "@/components/auth/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading03Icon, CheckmarkCircle02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { OnboardingStepProps } from "../types";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export function StepSuccess({ data }: OnboardingStepProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [creationError, setCreationError] = useState("");
    const [createdBusinessId, setCreatedBusinessId] = useState<string | null>(null);

    const handlePublish = async () => {
        if (!user) {
             // Should not happen if guarded, but fallback
             setCreationError("You must be logged in to publish.");
             return;
        }

        setIsCreating(true);
        try {
            const newBusiness = await MockAuthService.createBusiness(user.id, {
                name: data.displayName,
                slug: data.username,
                bio: data.bio
            });
            setCreatedBusinessId(newBusiness.id);
            // We can now redirect to dashboard
        } catch (error) {
            console.error(error);
            setCreationError("Failed to create business. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    // Auto-trigger publish on mount or via a button? 
    // The previous design had a "Publish Profile" button on the Preview step that led here.
    // So this step is "Success", meaning it should have ideally already happened or we confirm it here.
    // Let's assume the user clicked "Publish" on the previous step, so we entered this step.
    // BUT, the previous step just called `onNext`. 
    // Let's treat this step as the "Processing & Result" step.
    
    useEffect(() => {
        if (!createdBusinessId && !isCreating && !creationError) {
             handlePublish();
        }
    }, []);

    if (isCreating) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <HugeiconsIcon icon={Loading03Icon} className="h-12 w-12 animate-spin text-primary" />
                <h2 className="text-xl font-medium">Creating your profile...</h2>
            </div>
        )
    }

    if (creationError) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                     <span className="text-red-500 font-bold text-2xl">!</span>
                </div>
                <h2 className="text-xl font-medium">Something went wrong</h2>
                <p className="text-red-500">{creationError}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
        )
    }

    const profileUrl = `bitebio.app/${data.username}`;

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
          Your profile for <strong>{data.displayName}</strong> has been created.
        </p>
      </div>

      <div className="pt-4 space-y-3">
        <Button asChild className="w-full max-w-sm" size="lg">
          <Link href="/dashboard">
            Go to Dashboard <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
