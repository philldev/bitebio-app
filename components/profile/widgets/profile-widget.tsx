import { ProfileWidgetData, WidgetSize } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function ProfileWidget({ data, size }: { data: ProfileWidgetData["data"]; size?: WidgetSize }) {
  const isFullSm = size === "full-sm";

  return (
    <div className={cn(
      "flex flex-col items-center justify-center h-full p-6 text-center space-y-4",
      isFullSm && "flex-row text-left space-y-0 space-x-6 justify-start py-4"
    )}>
      {data.avatarUrl && (
        <Avatar className={cn(
          "h-24 w-24 border-4 border-background shadow-xl",
          isFullSm && "h-16 w-16 border-2 shadow-lg"
        )}>
          <AvatarImage src={data.avatarUrl} alt={data.name} className="object-cover" />
          <AvatarFallback>{data.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className="space-y-1">
        <h1 className={cn("text-2xl font-bold tracking-tight", isFullSm && "text-xl")}>{data.name}</h1>
        <p className={cn("text-muted-foreground text-sm max-w-sm mx-auto", isFullSm && "mx-0 line-clamp-1")}>
          {data.bio}
        </p>
      </div>
    </div>
  );
}
