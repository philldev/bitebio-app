"use client";

import { useBusiness } from "@/components/auth/business-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Store01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export default function DashboardPage() {
  const { activeBusiness, isLoading } = useBusiness();

  if (isLoading) {
    return <div>Loading business info...</div>;
  }

  if (!activeBusiness) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <h2 className="text-2xl font-bold">No Business Selected</h2>
            <p className="text-muted-foreground">Create a new business to get started.</p>
            <Button asChild>
                <Link href="/onboard">Create Business</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
            <Link href={`/${activeBusiness.slug}`} target="_blank">
                View Live Page <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Name</CardTitle>
            <HugeiconsIcon icon={Store01Icon} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBusiness.name}</div>
            <p className="text-xs text-muted-foreground">
              @{activeBusiness.slug}
            </p>
          </CardContent>
        </Card>
        {/* Add more stats cards here later */}
      </div>
    </div>
  );
}