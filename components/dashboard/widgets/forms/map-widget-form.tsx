"use client";

import { useState } from "react";
import { MapWidgetData } from "@/types/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface MapWidgetFormProps {
  initialData?: MapWidgetData["data"];
  onSubmit: (data: MapWidgetData["data"]) => void;
  onCancel: () => void;
}

export function MapWidgetForm({ initialData, onSubmit, onCancel }: MapWidgetFormProps) {
  const [formData, setFormData] = useState({
    location: initialData?.location || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">Address / Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g. 123 Main St, New York, NY"
          required
        />
        <p className="text-xs text-muted-foreground">
          This address will be shown on your profile.
        </p>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
