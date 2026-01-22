"use client";

import { WidgetType } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Link01Icon, 
  LibraryIcon, 
  Image01Icon, 
  ViewIcon 
} from "@hugeicons/core-free-icons";

interface WidgetTypeSelectorProps {
  onSelect: (type: WidgetType) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WIDGET_TYPES: { type: WidgetType; label: string; icon: any; description: string }[] = [
  {
    type: "link",
    label: "Link",
    icon: Link01Icon,
    description: "Link to a website, article, or video.",
  },
  {
    type: "menu",
    label: "Menu Item",
    icon: LibraryIcon,
    description: "Highlight a dish with an image and price.",
  },
  {
    type: "heading",
    label: "Heading",
    icon: null, // Text "T" handled in render
    description: "Organize your profile with section titles.",
  },
  {
    type: "gallery",
    label: "Gallery",
    icon: Image01Icon,
    description: "Display a grid of photos.",
  },
  {
    type: "map",
    label: "Map",
    icon: ViewIcon,
    description: "Show your location on a map.",
  },
];

export function WidgetTypeSelector({ onSelect }: WidgetTypeSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {WIDGET_TYPES.map((item) => (
        <Card
          key={item.type}
          className="cursor-pointer hover:bg-muted/50 transition-colors p-4 flex items-start gap-4 border-muted"
          onClick={() => onSelect(item.type)}
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {item.icon ? (
              <HugeiconsIcon icon={item.icon} size={20} />
            ) : (
              <span className="font-bold text-lg">T</span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{item.label}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {item.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
