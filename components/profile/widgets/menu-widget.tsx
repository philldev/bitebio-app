import { MenuWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";

export function MenuWidget({ data }: { data: MenuWidgetData["data"] }) {
  return (
    <Card className="h-full overflow-hidden border-none shadow-none relative group isolate">
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
      
      <div className="relative h-full flex flex-col justify-end p-4 text-white z-10">
        <div className="flex justify-between items-end gap-2">
            <h3 className="font-bold text-base leading-tight line-clamp-2 text-white shadow-sm">{data.name}</h3>
            <span className="font-bold text-base text-primary-foreground bg-primary/90 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm whitespace-nowrap">{data.price}</span>
        </div>
        {data.description && (
            <p className="text-xs text-gray-200 mt-1 line-clamp-2 font-medium shadow-sm">{data.description}</p>
        )}
      </div>
    </Card>
  );
}
