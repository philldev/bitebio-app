import { cn } from "@/lib/utils";
import { Widget, WidgetSize } from "@/types/profile";

interface ProfileGridProps {
  widgets: Widget[];
  renderWidget: (widget: Widget) => React.ReactNode;
}

const sizeVariants: Record<WidgetSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "2x2": "col-span-2 row-span-2",
  "full": "col-span-full",
};

export function ProfileGrid({ widgets, renderWidget }: ProfileGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)] md:auto-rows-[160px]">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            sizeVariants[widget.size] || "col-span-1"
          )}
        >
          {renderWidget(widget)}
        </div>
      ))}
    </div>
  );
}
