import { notFound } from "next/navigation";
import { MOCK_PROFILES } from "@/lib/mock-data";
import { ProfileGrid } from "@/components/profile/profile-grid";
import { WidgetFactory } from "@/components/profile/widget-factory";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = MOCK_PROFILES[username];

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
