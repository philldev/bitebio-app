import { GalleryWidgetData, WidgetSize } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function GalleryWidget({ data, size }: { data: GalleryWidgetData["data"]; size?: WidgetSize }) {
  const isFullSm = size === "full-sm";
  const displayCount = isFullSm ? 4 : 4;

  return (
    <Card className="h-full overflow-hidden border-none bg-muted/20 shadow-none p-0">
      <div className={cn(
        "grid h-full gap-0.5",
        isFullSm ? "grid-cols-4" : "grid-cols-2"
      )}>
        {data.images.slice(0, displayCount).map((image, i) => (
          <div key={i} className="relative aspect-square h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={image.alt || "Gallery image"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
