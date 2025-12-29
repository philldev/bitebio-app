import { MapWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons/core-free-icons";

export function MapWidget({ data }: { data: MapWidgetData["data"] }) {
  return (
    <Card className="h-full overflow-hidden border-none bg-muted/20 shadow-none relative group">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      
      <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
        <div className="p-2 bg-primary rounded-lg shadow-lg">
            <HugeiconsIcon icon={Location01Icon} className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Location</p>
            <p className="text-sm font-bold leading-tight">{data.location}</p>
        </div>
      </div>
    </Card>
  );
}
