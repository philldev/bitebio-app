"use client";

import * as React from "react";
import { useBusiness } from "@/components/auth/business-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    Store01Icon, 
    ArrowDown01Icon, 
    CheckmarkCircle02Icon,
    PlusSignIcon 
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BusinessSwitcher() {
  const { businesses, activeBusiness, switchBusiness } = useBusiness();

  if (!activeBusiness) {
    return (
        <Button variant="outline" className="w-[200px] justify-between" asChild>
             <Link href="/onboard">
                <HugeiconsIcon icon={Store01Icon} className="mr-2 h-4 w-4" />
                Create Business
             </Link>
        </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] justify-between"
        >
          <div className="flex items-center truncate">
            <HugeiconsIcon icon={Store01Icon} className="mr-2 h-4 w-4 opacity-50" />
            <span className="truncate">{activeBusiness.name}</span>
          </div>
          <HugeiconsIcon icon={ArrowDown01Icon} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>My Businesses</DropdownMenuLabel>
        {businesses.map((item) => (
          <DropdownMenuItem
            key={item.business.id}
            onSelect={() => switchBusiness(item.business.id)}
            className="flex items-center justify-between"
          >
            <span className="truncate">{item.business.name}</span>
            {activeBusiness.id === item.business.id && (
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="ml-auto h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/onboard" className="cursor-pointer">
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
            Create New
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
