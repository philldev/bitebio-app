"use client";

import { useState } from "react";
import { GalleryWidgetData } from "@/types/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";

interface GalleryWidgetFormProps {
  initialData?: GalleryWidgetData["data"];
  onSubmit: (data: GalleryWidgetData["data"]) => void;
  onCancel: () => void;
}

export function GalleryWidgetForm({ initialData, onSubmit, onCancel }: GalleryWidgetFormProps) {
  const [images, setImages] = useState<{ url: string; alt?: string }[]>(
    initialData?.images || [{ url: "" }]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty URLs
    const validImages = images.filter(img => img.url.trim() !== "");
    onSubmit({ images: validImages });
  };

  const addImage = () => {
    setImages([...images, { url: "" }]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index].url = url;
    setImages(newImages);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {images.map((image, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="space-y-2 flex-1">
              <Label>Image URL {index + 1}</Label>
              <Input
                value={image.url}
                onChange={(e) => updateImage(index, e.target.value)}
                placeholder="https://..."
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mb-0.5 text-destructive"
              onClick={() => removeImage(index)}
              disabled={images.length === 1 && index === 0}
            >
              <HugeiconsIcon icon={Delete02Icon} size={18} />
            </Button>
          </div>
        ))}
      </div>
      
      <Button type="button" variant="outline" className="w-full gap-2" onClick={addImage}>
        <HugeiconsIcon icon={PlusSignIcon} size={16} />
        Add Another Image
      </Button>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
