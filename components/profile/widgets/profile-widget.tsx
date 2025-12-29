import { ProfileWidgetData } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileWidget({ data }: { data: ProfileWidgetData["data"] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
      {data.avatarUrl && (
        <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
          <AvatarImage src={data.avatarUrl} alt={data.name} className="object-cover" />
          <AvatarFallback>{data.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          {data.bio}
        </p>
      </div>
    </div>
  );
}
