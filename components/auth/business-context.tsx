"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Business, BusinessContext as BusinessContextType, UserRole } from "@/types/auth";
import { MockAuthService } from "@/lib/mock-auth-service";
import { useAuth } from "./auth-provider";

interface BusinessContextValue {
  activeBusiness: Business | null;
  activeRole: UserRole | null;
  businesses: BusinessContextType[];
  isLoading: boolean;
  switchBusiness: (businessId: string) => void;
  refreshBusinesses: () => Promise<void>;
}

const BusinessContext = createContext<BusinessContextValue | undefined>(undefined);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<BusinessContextType[]>([]);
  const [activeBusinessId, setActiveBusinessId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshBusinesses = async () => {
    if (!user) {
      setBusinesses([]);
      setActiveBusinessId(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const fetched = await MockAuthService.getBusinessesForUser(user.id);
      setBusinesses(fetched);
      
      // If no active business or active business not in list, default to first
      if (fetched.length > 0) {
        const currentStillExists = fetched.some(b => b.business.id === activeBusinessId);
        if (!activeBusinessId || !currentStillExists) {
            setActiveBusinessId(fetched[0].business.id);
        }
      } else {
        setActiveBusinessId(null);
      }
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshBusinesses();
  }, [user]);

  const switchBusiness = (businessId: string) => {
    const exists = businesses.find(b => b.business.id === businessId);
    if (exists) {
      setActiveBusinessId(businessId);
    }
  };

  const activeContext = businesses.find(b => b.business.id === activeBusinessId);

  return (
    <BusinessContext.Provider
      value={{
        activeBusiness: activeContext?.business || null,
        activeRole: activeContext?.role || null,
        businesses,
        isLoading,
        switchBusiness,
        refreshBusinesses,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
}
