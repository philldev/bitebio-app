"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ViewIcon, 
  CursorIcon, 
  Share01Icon,
  ArrowRight01Icon,
  PlusSignIcon
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your BiteBio profile.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <HugeiconsIcon icon={ViewIcon} size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <HugeiconsIcon icon={CursorIcon} size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
            <HugeiconsIcon icon={Share01Icon} size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33.6%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.1% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="justify-between h-12" asChild>
              <Link href="/dashboard/profile">
                <span className="flex items-center gap-2">Update Profile Info</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
              </Link>
            </Button>
            <Button variant="outline" className="justify-between h-12" asChild>
              <Link href="/dashboard/widgets">
                <span className="flex items-center gap-2">Add New Menu Item</span>
                <HugeiconsIcon icon={PlusSignIcon} size={18} />
              </Link>
            </Button>
            <Button variant="outline" className="justify-between h-12" asChild>
              <Link href={`/${user?.username}`} target="_blank">
                <span className="flex items-center gap-2">View My Public Profile</span>
                <HugeiconsIcon icon={ViewIcon} size={18} />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader>
            <CardTitle>Profile Tips</CardTitle>
            <CardDescription>How to make your profile stand out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">1</div>
              <p className="text-sm">Add at least 3 high-quality images to your gallery to showcase your cafe&apos;s vibe.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">2</div>
              <p className="text-sm">Link your Instagram to automatically build trust with new customers.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">3</div>
              <p className="text-sm">Keep your menu highlights updated with seasonal specials.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
