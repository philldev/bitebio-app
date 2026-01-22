"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { storage } from "@/lib/storage";
import { Profile, Widget, WidgetSize } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { WidgetEditorDialog } from "@/components/dashboard/widgets/widget-editor-dialog";
import { SortableWidgetCard } from "@/components/dashboard/widgets/sortable-widget-card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

export default function WidgetsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (user?.username) {
      const p = storage.getProfile(user.username);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(p);
      setIsLoading(false);
    }
  }, [user]);

  const save = (newProfile: Profile) => {
    setProfile(newProfile);
    storage.saveProfile(newProfile);
  };

  const deleteWidget = (id: string) => {
    if (!profile) return;
    const newWidgets = profile.widgets.filter(w => w.id !== id);
    save({ ...profile, widgets: newWidgets });
  };

  const handleSizeChange = (id: string, size: WidgetSize) => {
    if (!profile) return;
    const newWidgets = profile.widgets.map((w) =>
      w.id === id ? { ...w, size } : w
    );
    save({ ...profile, widgets: newWidgets });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && profile) {
      const oldIndex = profile.widgets.findIndex((w) => w.id === active.id);
      const newIndex = profile.widgets.findIndex((w) => w.id === over.id);

      const newWidgets = arrayMove(profile.widgets, oldIndex, newIndex);
      save({ ...profile, widgets: newWidgets });
    }
  };

  const handleAddWidget = () => {
    setDialogMode("add");
    setEditingWidget(null);
    setIsDialogOpen(true);
  };

  const handleEditWidget = (widget: Widget) => {
    setDialogMode("edit");
    setEditingWidget(widget);
    setIsDialogOpen(true);
  };

  const handleSaveWidget = (widget: Widget) => {
    if (!profile) return;

    const newWidgets = [...profile.widgets];

    if (dialogMode === "add") {
      newWidgets.push(widget);
    } else {
      const index = newWidgets.findIndex(w => w.id === widget.id);
      if (index !== -1) {
        newWidgets[index] = widget;
      }
    }

    save({ ...profile, widgets: newWidgets });
  };

  if (isLoading || !profile) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-1/4"></div>
      <div className="h-64 bg-muted rounded"></div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Widgets</h1>
          <p className="text-muted-foreground mt-1">
            Drag to reorder and resize your profile elements.
          </p>
        </div>
        <Button className="gap-2 h-11" onClick={handleAddWidget}>
          <HugeiconsIcon icon={PlusSignIcon} size={18} />
          Add Widget
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
          <SortableContext 
            items={profile.widgets.map(w => w.id)} 
            strategy={rectSortingStrategy}
          >
            {profile.widgets.map((widget) => (
              <SortableWidgetCard
                key={widget.id}
                widget={widget}
                onEdit={handleEditWidget}
                onDelete={deleteWidget}
                onSizeChange={handleSizeChange}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <WidgetEditorDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialWidget={editingWidget}
        onSave={handleSaveWidget}
      />
    </div>
  );
}
