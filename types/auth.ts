import { Profile } from "./profile";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  password?: string; // Only for mock auth verification
}

export type UserRole = 'owner' | 'admin' | 'editor';

export interface Business {
  id: string;
  slug: string; // Corresponds to Profile.username
  name: string; // Internal name, might match Profile.displayName
  createdAt: string;
  // The content of the public profile
  profile: Profile; 
}

export interface Membership {
  userId: string;
  businessId: string;
  role: UserRole;
}

// Helper type for the full context of a logged-in user's relationship to a business
export interface BusinessContext {
  business: Business;
  role: UserRole;
}
