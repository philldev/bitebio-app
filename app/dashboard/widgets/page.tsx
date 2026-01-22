"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { storage } from "@/lib/storage";
import { Profile, LinkWidgetData, MenuWidgetData, ProfileWidgetData, HeadingWidgetData, GalleryWidgetData } from "@/types/profile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus03Icon, 
  Link01Icon, 
  LibraryIcon, 
  Image01Icon,
  Delete02Icon,
  PencilEdit01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  UserCircleIcon,
  ViewIcon
} from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";

export default function WidgetsPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const moveWidget = (id: string, direction: 'up' | 'down') => {
    if (!profile) return;
    const index = profile.widgets.findIndex(w => w.id === id);
    if (index === -1) return;
    
    const newWidgets = [...profile.widgets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newWidgets.length) {
      [newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]];
      save({ ...profile, widgets: newWidgets });
    }
  };

  if (isLoading || !profile) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-1/4"></div>
      <div className="h-64 bg-muted rounded"></div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Widgets</h1>
          <p className="text-muted-foreground mt-1">
            Add, remove, and reorder elements on your profile.
          </p>
        </div>
        <Button className="gap-2">
          <Plus03Icon size={18} />
          Add Widget
        </Button>
      </div>

      <div className="grid gap-4">
        {profile.widgets.map((widget, index) => {
          const isFirst = index === 0;
          const isLast = index === profile.widgets.length - 1;

          return (
            <Card key={widget.id} className="border-none shadow-sm bg-card overflow-hidden">
              <div className="flex items-center p-4 gap-4">
                <div className="flex flex-col gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    disabled={isFirst}
                    onClick={() => moveWidget(widget.id, 'up')}
                  >
                    <ArrowUp01Icon size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    disabled={isLast}
                    onClick={() => moveWidget(widget.id, 'down')}
                  >
                    <ArrowDown01Icon size={16} />
                  </Button>
                </div>

                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                  {widget.type === 'profile' && <UserCircleIcon size={24} />}
                  {widget.type === 'link' && <Link01Icon size={24} />}
                  {widget.type === 'menu' && <LibraryIcon size={24} />}
                  {widget.type === 'gallery' && <Image01Icon size={24} />}
                  {widget.type === 'heading' && <div className="font-bold">T</div>}
                  {widget.type === 'map' && <ViewIcon size={24} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold truncate">
                      {widget.type === 'profile' && (widget as ProfileWidgetData).data.name}
                      {widget.type === 'link' && (widget as LinkWidgetData).data.title}
                      {widget.type === 'menu' && (widget as MenuWidgetData).data.name}
                      {widget.type === 'heading' && (widget as HeadingWidgetData).data.title}
                      {widget.type === 'gallery' && "Image Gallery"}
                      {widget.type === 'map' && "Location Map"}
                    </h3>
                    <Badge variant="secondary" className="capitalize text-[10px] h-5">
                      {widget.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {widget.type === 'link' && (widget as LinkWidgetData).data.url}
                    {widget.type === 'menu' && (widget as MenuWidgetData).data.price}
                    {widget.type === 'profile' && "Global Profile Info"}
                    {widget.type === 'gallery' && `${(widget as GalleryWidgetData).data.images.length} images`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <PencilEdit01Icon size={18} />
                  </Button>
                  {widget.type !== 'profile' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => deleteWidget(widget.id)}
                    >
                      <Delete02Icon size={18} />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
