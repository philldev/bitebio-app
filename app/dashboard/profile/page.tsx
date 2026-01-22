"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { storage } from "@/lib/storage";
import { Profile, ProfileWidgetData } from "@/types/profile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";

export default function ProfileEditorPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user?.username) {
      const p = storage.getProfile(user.username);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(p);
      setIsLoading(false);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate delay
    await new Promise(r => setTimeout(r, 500));
    
    storage.saveProfile(profile);
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const updateProfileWidget = (data: Partial<ProfileWidgetData['data']>) => {
    if (!profile) return;
    
    const newWidgets = profile.widgets.map(w => {
      if (w.type === 'profile') {
        return { ...w, data: { ...w.data, ...data } };
      }
      return w;
    });

    setProfile({ ...profile, widgets: newWidgets });
  };

  if (isLoading || !profile) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-1/4"></div>
      <div className="h-64 bg-muted rounded"></div>
    </div>;
  }

  const profileWidget = profile.widgets.find(w => w.type === 'profile') as ProfileWidgetData;

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Info</h1>
        <p className="text-muted-foreground mt-1">
          Update how your cafe appears to the world.
        </p>
      </div>

      <Card className="border-none shadow-sm bg-card">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>This information is visible at the top of your profile.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profileWidget.data.name}
                onChange={(e) => updateProfileWidget({ name: e.target.value })}
                className="bg-muted/50 border-none focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                value={profileWidget.data.bio}
                onChange={(e) => updateProfileWidget({ bio: e.target.value })}
                className="bg-muted/50 border-none focus-visible:ring-primary resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={profileWidget.data.avatarUrl || ""}
                onChange={(e) => updateProfileWidget({ avatarUrl: e.target.value })}
                className="bg-muted/50 border-none focus-visible:ring-primary"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-border pt-6">
            <div className="flex items-center gap-2 text-sm text-green-600">
              {saveSuccess && (
                <>
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
                  Changes saved!
                </>
              )}
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-sm uppercase tracking-wider">Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-8 flex justify-center bg-muted/10">
           {/* Simple preview of the profile widget */}
           <div className="bg-card rounded-2xl p-6 shadow-md border border-border w-full max-w-sm flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-muted overflow-hidden border-2 border-primary/20">
                {profileWidget.data.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profileWidget.data.avatarUrl} alt={profileWidget.data.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {profileWidget.data.name[0]}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{profileWidget.data.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{profileWidget.data.bio}</p>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
