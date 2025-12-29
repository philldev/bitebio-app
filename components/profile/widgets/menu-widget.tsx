import { MenuWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";

export function MenuWidget({ data }: { data: MenuWidgetData["data"] }) {
  return (
    <Card className="h-full overflow-hidden border-none bg-muted/20 shadow-none flex flex-col">
      {data.imageUrl && (
        <div className="relative h-2/3 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={data.imageUrl} 
                alt={data.name} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
            />
        </div>
      )}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-sm leading-tight line-clamp-2">{data.name}</h3>
            <span className="text-primary font-bold text-sm">{data.price}</span>
        </div>
        {data.description && (
            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{data.description}</p>
        )}
      </div>
    </Card>
  );
}
