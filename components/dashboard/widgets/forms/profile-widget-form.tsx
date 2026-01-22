"use client";

import { useState } from "react";
import { ProfileWidgetData } from "@/types/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ProfileWidgetFormProps {
  initialData?: ProfileWidgetData["data"];
  onSubmit: (data: ProfileWidgetData["data"]) => void;
  onCancel: () => void;
}

export function ProfileWidgetForm({ initialData, onSubmit, onCancel }: ProfileWidgetFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    bio: initialData?.bio || "",
    avatarUrl: initialData?.avatarUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Cool Beans Cafe"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="A short description of your cafe"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">Avatar URL</Label>
        <Input
          id="avatarUrl"
          value={formData.avatarUrl}
          onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
          placeholder="https://..."
        />
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
