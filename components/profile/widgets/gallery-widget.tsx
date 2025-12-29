import { GalleryWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";

export function GalleryWidget({ data }: { data: GalleryWidgetData["data"] }) {
  return (
    <Card className="h-full overflow-hidden border-none bg-muted/20 shadow-none p-0">
      <div className="grid grid-cols-2 h-full gap-0.5">
        {data.images.slice(0, 4).map((image, i) => (
          <div key={i} className="relative aspect-square">
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
