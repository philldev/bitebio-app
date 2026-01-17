"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/auth";
import { MockAuthService } from "@/lib/mock-auth-service";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      // 1. Ensure mock data exists
      MockAuthService.init();

      // 2. Try to restore session
      try {
        const currentUser = await MockAuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to restore session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await MockAuthService.login(email, password);
      setUser(loggedInUser);
      router.push("/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await MockAuthService.signup(name, email, password);
      setUser(newUser);
      router.push("/onboard"); // Redirect to onboarding for new users
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await MockAuthService.logout();
      setUser(null);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
