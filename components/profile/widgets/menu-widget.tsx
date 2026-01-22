import { MenuWidgetData, WidgetSize } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MenuWidget({ data, size }: { data: MenuWidgetData["data"]; size?: WidgetSize }) {
  const isFullSm = size === "full-sm";

  return (
    <Card className={cn(
      "h-full overflow-hidden border-none shadow-none relative group isolate pb-0",
      isFullSm && "flex flex-row bg-muted/20"
    )}>
      {data.imageUrl ? (
        <div className={cn(
          "relative",
          isFullSm ? "w-1/3 h-full" : "absolute inset-0"
        )}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl}
            alt={data.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!isFullSm && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />}
        </div>
      ) : (
        !isFullSm && <div className="absolute inset-0 bg-muted/20" />
      )}

      <div className={cn(
        "relative h-full flex flex-col z-10",
        isFullSm ? "flex-1 justify-center p-4 text-foreground" : "justify-end p-3 text-white"
      )}>
        <div className={cn(
          "flex items-end gap-2 w-full",
          isFullSm ? "flex-row justify-between items-center" : "flex-row justify-between"
        )}>
          <h3 className={cn(
            "font-bold text-sm leading-tight line-clamp-2 min-w-0 flex-1",
            !isFullSm && "text-white shadow-sm"
          )}>
            {data.name}
          </h3>
          <span className={cn(
            "font-bold text-xs px-1.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm whitespace-nowrap shrink-0",
            isFullSm ? "bg-primary text-primary-foreground" : "bg-primary/90 text-primary-foreground"
          )}>
            {data.price}
          </span>
        </div>
        {data.description && (
          <p className={cn(
            "text-[10px] mt-1 line-clamp-2 font-medium leading-tight",
            isFullSm ? "text-muted-foreground" : "text-gray-200 shadow-sm"
          )}>
            {data.description}
          </p>
        )}
      </div>
    </Card>
  );
}
