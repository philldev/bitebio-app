"use client";

import { useEffect, useState } from "react";
import { Widget, WidgetType } from "@/types/profile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { WidgetTypeSelector } from "./widget-type-selector";
import { LinkWidgetForm } from "./forms/link-widget-form";
import { MenuWidgetForm } from "./forms/menu-widget-form";
import { HeadingWidgetForm } from "./forms/heading-widget-form";
import { GalleryWidgetForm } from "./forms/gallery-widget-form";
import { MapWidgetForm } from "./forms/map-widget-form";
import { ProfileWidgetForm } from "./forms/profile-widget-form";

interface WidgetEditorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialWidget?: Widget | null;
  onSave: (widget: Widget) => void;
}

export function WidgetEditorDialog({
  isOpen,
  onOpenChange,
  mode,
  initialWidget,
  onSave,
}: WidgetEditorDialogProps) {
  const [step, setStep] = useState<"type-selection" | "form">("type-selection");
  const [selectedType, setSelectedType] = useState<WidgetType | null>(null);

  // Reset state when dialog opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialWidget) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStep("form");
        setSelectedType(initialWidget.type);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStep("type-selection");
        setSelectedType(null);
      }
    }
  }, [isOpen, mode, initialWidget]);

  const handleTypeSelect = (type: WidgetType) => {
    setSelectedType(type);
    setStep("form");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (data: any) => {
    if (!selectedType) return;

    const newWidget: Widget = {
      id: initialWidget?.id || `w-${Date.now()}`,
      type: selectedType,
      size: initialWidget?.size || "full", // Default size, could be customizable later
      data: data,
    } as Widget;

    // Set appropriate default sizes based on type if it's a new widget
    if (mode === "add") {
      switch (selectedType) {
        case "link": newWidget.size = "full"; break;
        case "menu": newWidget.size = "1x1"; break;
        case "gallery": newWidget.size = "2x1"; break;
        case "map": newWidget.size = "2x1"; break;
        case "heading": newWidget.size = "full-sm"; break;
      }
    }

    onSave(newWidget);
    onOpenChange(false);
  };

  const renderForm = () => {
    switch (selectedType) {
      case "profile":
        return <ProfileWidgetForm initialData={initialWidget?.type === 'profile' ? initialWidget.data : undefined} onSubmit={handleFormSubmit} onCancel={() => onOpenChange(false)} />;
      case "link":
        return <LinkWidgetForm initialData={initialWidget?.type === 'link' ? initialWidget.data : undefined} onSubmit={handleFormSubmit} onCancel={() => onOpenChange(false)} />;
      case "menu":
        return <MenuWidgetForm initialData={initialWidget?.type === 'menu' ? initialWidget.data : undefined} onSubmit={handleFormSubmit} onCancel={() => onOpenChange(false)} />;
      case "heading":
        return <HeadingWidgetForm initialData={initialWidget?.type === 'heading' ? initialWidget.data : undefined} onSubmit={handleFormSubmit} onCancel={() => onOpenChange(false)} />;
      case "gallery":
        return <GalleryWidgetForm initialData={initialWidget?.type === 'gallery' ? initialWidget.data : undefined} onSubmit={handleFormSubmit} onCancel={() => onOpenChange(false)} />;
      case "map":
        return <MapWidgetForm initialData={initialWidget?.type === 'map' ? initialWidget.data : undefined} onSubmit={handleFormSubmit} onCancel={() => onOpenChange(false)} />;
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" && step === "type-selection" && "Add New Widget"}
            {mode === "add" && step === "form" && `Configure ${selectedType} Widget`}
            {mode === "edit" && "Edit Widget"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" && step === "type-selection" && "Choose the type of content you want to add to your profile."}
            {step === "form" && "Fill in the details below."}
          </DialogDescription>
        </DialogHeader>

        {step === "type-selection" ? (
          <WidgetTypeSelector onSelect={handleTypeSelect} />
        ) : (
          renderForm()
        )}
      </DialogContent>
    </Dialog>
  );
}
