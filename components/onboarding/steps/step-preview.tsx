"use client";

import { OnboardingStepProps } from "../types";
import { Button } from "@/components/ui/button";
import { ProfileGrid } from "@/components/profile/profile-grid";
import { WidgetFactory } from "@/components/profile/widget-factory";
import { Widget } from "@/types/profile";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, Rocket01Icon } from "@hugeicons/core-free-icons";

export function StepPreview({ data, onNext, onBack }: OnboardingStepProps) {
  
  // Construct a preview set of widgets
  const previewWidgets: Widget[] = [
    {
      id: "profile-1",
      type: "profile",
      size: "2x2", // Profile is always 2x2 or bigger in our design usually, let's stick to 2x2
      data: {
        name: data.displayName,
        bio: data.bio,
        // No avatar for now, use default/placeholder
      },
    },
    {
      id: "link-1",
      type: "link",
      size: "1x1",
      data: {
        title: "Instagram",
        url: "#",
        icon: "InstagramIcon",
      },
    },
    {
        id: "link-2",
        type: "link",
        size: "1x1",
        data: {
          title: "Website",
          url: "#",
          icon: "Globe02Icon",
        },
    },
    {
      id: "menu-1",
      type: "menu",
      size: "2x1",
      data: {
        name: "Signature Latte",
        price: "$5.50",
        description: "Our house blend with silky steamed milk.",
        // Placeholder image
        imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop",
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">How does it look?</h2>
        <p className="text-muted-foreground">
          Here is a preview of your new profile. You can edit everything later.
        </p>
      </div>

      <div className="border rounded-xl p-4 bg-muted/30 overflow-hidden">
        <div className="pointer-events-none scale-[0.8] origin-top md:scale-100">
           {/* We scale it down a bit on small screens to fit the wizard container if needed */}
            <ProfileGrid 
                widgets={previewWidgets} 
                renderWidget={(w) => <WidgetFactory widget={w} />} 
            />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onNext} className="flex-1">
          Publish Profile <HugeiconsIcon icon={Rocket01Icon} className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
