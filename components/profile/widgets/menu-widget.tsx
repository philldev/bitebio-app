import { MenuWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";

export function MenuWidget({ data }: { data: MenuWidgetData["data"] }) {
  return (
    <Card className="h-full overflow-hidden border-none shadow-none relative group isolate pb-0">
      {data.imageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl}
            alt={data.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-muted/20" />
      )}

      <div className="relative h-full flex flex-col justify-end p-3 text-white z-10">
        <div className="flex justify-between items-end gap-2 w-full">
          <h3 className="font-bold text-sm leading-tight line-clamp-2 text-white shadow-sm min-w-0 flex-1">
            {data.name}
          </h3>
          <span className="font-bold text-xs text-primary-foreground bg-primary/90 px-1.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm whitespace-nowrap shrink-0">
            {data.price}
          </span>
        </div>
        {data.description && (
          <p className="text-[10px] text-gray-200 mt-1 line-clamp-2 font-medium shadow-sm leading-tight">
            {data.description}
          </p>
        )}
      </div>
    </Card>
  );
}
