"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { Profile } from "@/types/profile";
import { ProfileGrid } from "@/components/profile/profile-grid";
import { WidgetFactory } from "@/components/profile/widget-factory";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedProfile = storage.getProfile(username);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(loadedProfile);
    setIsLoading(false);
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 pt-12 max-w-2xl relative z-10">
        <ProfileGrid 
          widgets={profile.widgets} 
          renderWidget={(widget) => <WidgetFactory widget={widget} />} 
        />
        
        <div className="mt-16 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                Built with <span className="font-bold text-primary">BiteBio</span>
            </p>
        </div>
      </div>
    </div>
  );
}
