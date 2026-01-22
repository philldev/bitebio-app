import { HeadingWidgetData, WidgetSize } from "@/types/profile";

export function HeadingWidget({ data, size }: { data: HeadingWidgetData["data"]; size?: WidgetSize }) {
  // size can be used here for future layout adjustments if needed
  return (
    <div className="flex flex-col justify-end h-full pb-1 pt-4">
      <h2 className="text-xl font-bold tracking-tight">{data.title}</h2>
      {data.subtitle && (
        <p className="text-sm text-muted-foreground">{data.subtitle}</p>
      )}
    </div>
  );
}
