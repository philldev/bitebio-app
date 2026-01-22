"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Widget, WidgetSize, LinkWidgetData, MenuWidgetData, ProfileWidgetData, HeadingWidgetData, MapWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Drag01Icon,
  Link01Icon, 
  LibraryIcon, 
  Image01Icon,
  Delete02Icon,
  PencilEdit01Icon,
  UserCircleIcon,
  ViewIcon,
  MaximizeIcon
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface SortableWidgetCardProps {
  widget: Widget;
  onEdit: (widget: Widget) => void;
  onDelete: (id: string) => void;
  onSizeChange: (id: string, size: WidgetSize) => void;
}

const SIZE_LABELS: Record<WidgetSize, string> = {
  "1x1": "Small (1x1)",
  "2x1": "Wide (2x1)",
  "2x2": "Large (2x2)",
  "full": "Full Width (4x2)",
  "full-sm": "Full Width Skinny (4x1)",
};

const VALID_SIZES: WidgetSize[] = ["1x1", "2x1", "2x2", "full", "full-sm"];

// Mapping our internal sizes to Grid span classes for the dashboard view
const sizeVariants: Record<WidgetSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "2x2": "col-span-2 row-span-2",
  "full": "col-span-full row-span-2",
  "full-sm": "col-span-full row-span-1",
};

export function SortableWidgetCard({ widget, onEdit, onDelete, onSizeChange }: SortableWidgetCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group",
        sizeVariants[widget.size] || "col-span-1",
        isDragging && "opacity-50 grayscale scale-95 z-50 shadow-2xl"
      )}
    >
      <Card className="h-full border-none shadow-sm bg-card overflow-hidden flex flex-col">
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div 
              {...attributes} 
              {...listeners}
              className="p-1 -ml-1 text-muted-foreground/50 hover:text-primary cursor-grab active:cursor-grabbing rounded transition-colors"
            >
              <HugeiconsIcon icon={Drag01Icon} size={20} />
            </div>
            
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-muted-foreground">
                    <HugeiconsIcon icon={MaximizeIcon} size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Resize Widget</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {VALID_SIZES.map((size) => (
                    <DropdownMenuItem 
                      key={size} 
                      onClick={() => onSizeChange(widget.id, size)}
                      className={cn(widget.size === size && "bg-primary/10 text-primary font-medium")}
                    >
                      {SIZE_LABELS[size]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="ghost" 
                size="icon-sm" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => onEdit(widget)}
              >
                <HugeiconsIcon icon={PencilEdit01Icon} size={16} />
              </Button>
              
              {widget.type !== 'profile' && (
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(widget.id)}
                >
                  <HugeiconsIcon icon={Delete02Icon} size={16} />
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-2 py-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {widget.type === 'profile' && <HugeiconsIcon icon={UserCircleIcon} size={20} />}
              {widget.type === 'link' && <HugeiconsIcon icon={Link01Icon} size={20} />}
              {widget.type === 'menu' && <HugeiconsIcon icon={LibraryIcon} size={20} />}
              {widget.type === 'gallery' && <HugeiconsIcon icon={Image01Icon} size={20} />}
              {widget.type === 'heading' && <div className="font-bold">T</div>}
              {widget.type === 'map' && <HugeiconsIcon icon={ViewIcon} size={20} />}
            </div>
            
            <div className="min-w-0 px-2 w-full">
              <h3 className="font-bold text-xs truncate uppercase tracking-wider text-muted-foreground/70">
                {widget.type}
              </h3>
              <p className="font-bold text-sm truncate">
                {widget.type === 'profile' && (widget as ProfileWidgetData).data.name}
                {widget.type === 'link' && (widget as LinkWidgetData).data.title}
                {widget.type === 'menu' && (widget as MenuWidgetData).data.name}
                {widget.type === 'heading' && (widget as HeadingWidgetData).data.title}
                {widget.type === 'gallery' && "Image Gallery"}
                {widget.type === 'map' && (widget as MapWidgetData).data.location}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 px-3 py-1.5 border-t border-border mt-auto">
           <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-tight border-none bg-transparent p-0 text-muted-foreground">
             {widget.size}
           </Badge>
        </div>
      </Card>
    </div>
  );
}
