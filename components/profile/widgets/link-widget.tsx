import React from "react";
import { LinkWidgetData, WidgetSize } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function LinkWidget({ data, size }: { data: LinkWidgetData["data"]; size?: WidgetSize }) {
  // Dynamically get icon from Hugeicons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconData = data.icon && (Icons as any)[data.icon];
  const isWide = size === "2x1" || size === "full" || size === "full-sm";

  return (
    <a 
        href={data.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full group"
    >
        <Card className={cn(
            "h-full p-5 flex flex-col justify-between hover:bg-muted/50 transition-colors border-none bg-muted/20 shadow-none",
            isWide && "flex-row items-center gap-4 py-3"
        )}>
            <div className={cn(
                "flex justify-between items-start",
                isWide && "flex-none"
            )}>
                <div className="p-2 bg-background rounded-xl shadow-sm">
                    {IconData ? (
                        <HugeiconsIcon icon={IconData} className="h-6 w-6 text-primary" />
                    ) : (
                        <HugeiconsIcon icon={Icons.Link01Icon} className="h-6 w-6 text-primary" />
                    )}
                </div>
                {!isWide && (
                    <HugeiconsIcon 
                        icon={ArrowUpRight01Icon} 
                        className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                )}
            </div>
            <div className={cn("flex-1 min-w-0", isWide && "flex flex-col justify-center")}>
                <h3 className="font-bold text-base leading-tight truncate">{data.title}</h3>
                {data.description && (
                    <p className={cn("text-xs text-muted-foreground mt-1 line-clamp-1", isWide && "mt-0")}>
                        {data.description}
                    </p>
                )}
            </div>
            {isWide && (
                <HugeiconsIcon 
                    icon={ArrowUpRight01Icon} 
                    className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-none" 
                />
            )}
        </Card>
    </a>
  );
}
