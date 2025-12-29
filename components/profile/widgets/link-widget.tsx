import { LinkWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

export function LinkWidget({ data }: { data: LinkWidgetData["data"] }) {
  // Dynamically get icon from Hugeicons
  const IconComponent = data.icon && (Icons as any)[data.icon];

  return (
    <a 
        href={data.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full group"
    >
        <Card className="h-full p-5 flex flex-col justify-between hover:bg-muted/50 transition-colors border-none bg-muted/20 shadow-none">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-background rounded-xl shadow-sm">
                    {IconComponent ? (
                        <HugeiconsIcon icon={IconComponent} className="h-6 w-6 text-primary" />
                    ) : (
                        <HugeiconsIcon icon={Icons.Link01Icon} className="h-6 w-6 text-primary" />
                    )}
                </div>
                <HugeiconsIcon 
                    icon={ArrowUpRight01Icon} 
                    className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                />
            </div>
            <div>
                <h3 className="font-bold text-base leading-tight">{data.title}</h3>
                {data.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{data.description}</p>
                )}
            </div>
        </Card>
    </a>
  );
}
