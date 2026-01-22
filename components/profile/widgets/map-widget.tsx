import { MapWidgetData, WidgetSize } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function MapWidget({ data, size }: { data: MapWidgetData["data"]; size?: WidgetSize }) {
  const isFullSm = size === "full-sm";

  return (
    <Card className="h-full overflow-hidden border-none bg-muted/20 shadow-none relative group">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-all duration-500" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className={cn(
        "absolute left-4 right-4 flex items-end gap-3 z-10",
        isFullSm ? "bottom-2" : "bottom-4"
      )}>
        <div className={cn(
          "bg-primary rounded-lg shadow-lg shrink-0",
          isFullSm ? "p-1.5" : "p-2"
        )}>
            <HugeiconsIcon icon={Location01Icon} className={cn(
              "text-primary-foreground",
              isFullSm ? "h-4 w-4" : "h-5 w-5"
            )} />
        </div>
        <div className="flex-1 text-white min-w-0">
            {!isFullSm && <p className="text-[10px] uppercase tracking-wider font-bold text-gray-300">Location</p>}
            <p className="text-sm font-bold leading-tight shadow-sm truncate">{data.location}</p>
        </div>
      </div>
    </Card>
  );
}
