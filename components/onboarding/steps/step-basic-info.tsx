"use client";

import { OnboardingStepProps } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function StepBasicInfo({ data, updateData, onNext, onBack }: OnboardingStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.displayName && data.bio) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Tell us about your place</h2>
        <p className="text-muted-foreground">
          This info will be displayed at the top of your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Cafe / Restaurant Name</Label>
          <Input
            id="displayName"
            placeholder="e.g. Cool Beans Cafe"
            value={data.displayName}
            onChange={(e) => updateData({ displayName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Short Bio</Label>
          <Textarea
            id="bio"
            placeholder="Serving the best coffee in town since 2010..."
            className="resize-none h-24"
            value={data.bio}
            onChange={(e) => updateData({ bio: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground text-right">
            {data.bio.length}/160 characters
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="flex-1" disabled={!data.displayName || !data.bio}>
            Next <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
