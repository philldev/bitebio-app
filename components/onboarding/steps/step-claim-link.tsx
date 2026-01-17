"use client";

import { useState } from "react";
import { OnboardingStepProps } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, CheckmarkCircle01Icon, CancelCircleIcon, Loading03Icon } from "@hugeicons/core-free-icons";

export function StepClaimLink({ data, updateData, onNext }: OnboardingStepProps) {
  const [username, setUsername] = useState(data.username);
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState<'idle' | 'available' | 'unavailable'>('idle');
  const [error, setError] = useState("");

  const validateUsername = (value: string) => {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (!/^[a-z0-9-]+$/.test(value)) return "Only lowercase letters, numbers, and hyphens allowed";
    return "";
  };

  const handleCheck = async () => {
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      setAvailability('idle');
      return;
    }

    setError("");
    setIsChecking(true);
    setAvailability('idle');

    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      // Mock: "taken" is reserved
      if (username === "taken") {
        setAvailability('unavailable');
        setError("This username is already taken");
      } else {
        setAvailability('available');
        updateData({ username });
      }
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (availability === 'available') {
      onNext();
    } else {
      handleCheck();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Claim your Link</h2>
        <p className="text-muted-foreground">
          Choose a unique username for your BiteBio profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">
              bitebio.app/
            </span>
            <Input
              id="username"
              placeholder="your-cafe-name"
              className="pl-24"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toLowerCase());
                setAvailability('idle');
                setError("");
              }}
            />
            <div className="absolute right-3 top-2.5">
              {isChecking && <HugeiconsIcon icon={Loading03Icon} className="h-5 w-5 animate-spin text-muted-foreground" />}
              {!isChecking && availability === 'available' && <HugeiconsIcon icon={CheckmarkCircle01Icon} className="h-5 w-5 text-green-500" />}
              {!isChecking && availability === 'unavailable' && <HugeiconsIcon icon={CancelCircleIcon} className="h-5 w-5 text-red-500" />}
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {availability === 'available' && (
            <p className="text-sm text-green-500">
              Nice! <strong>bitebio.app/{username}</strong> is yours.
            </p>
          )}
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isChecking || (availability === 'idle' && !username)}
          >
            {availability === 'available' ? (
              <>
                Continue <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Check Availability"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
