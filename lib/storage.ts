import { Profile } from "@/types/profile";
import { MOCK_PROFILES } from "./mock-data";

const STORAGE_KEY = "bitebio-profiles";

/**
 * Mock storage service using localStorage
 */
export const storage = {
  getProfiles: (): Record<string, Profile> => {
    if (typeof window === "undefined") return MOCK_PROFILES;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with mock data if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PROFILES));
      return MOCK_PROFILES;
    }
    
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored profiles", e);
      return MOCK_PROFILES;
    }
  },

  getProfile: (username: string): Profile | null => {
    const profiles = storage.getProfiles();
    return profiles[username] || null;
  },

  saveProfile: (profile: Profile): void => {
    if (typeof window === "undefined") return;
    
    const profiles = storage.getProfiles();
    profiles[profile.username] = profile;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  },

  deleteProfile: (username: string): void => {
    if (typeof window === "undefined") return;
    
    const profiles = storage.getProfiles();
    delete profiles[username];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }
};
