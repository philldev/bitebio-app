import { User, Business, Membership, UserRole } from "@/types/auth";
import { MOCK_PROFILES } from "./mock-data";

// Simple ID generator fallback
const generateId = () => Math.random().toString(36).substring(2, 9);

const STORAGE_KEYS = {
  USERS: 'bitebio_users',
  BUSINESSES: 'bitebio_businesses',
  MEMBERSHIPS: 'bitebio_memberships',
  SESSION: 'bitebio_session_user_id',
};

// Seed Data
const DEMO_USER: User = {
  id: 'user_demo',
  email: 'admin@demo.com',
  name: 'Demo Admin',
  password: 'password', // Plain text for mock
  avatarUrl: 'https://github.com/shadcn.png',
};

export const MockAuthService = {
  
  // Initialize data if empty
  init() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      console.log('MockAuthService: Seeding initial data...');
      
      // 1. Create Demo User
      const users = [DEMO_USER];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      // 2. Create Businesses from MOCK_PROFILES
      const businesses: Business[] = [];
      const memberships: Membership[] = [];

      Object.values(MOCK_PROFILES).forEach((profile, index) => {
        const businessId = `biz_${profile.username}`;
        
        businesses.push({
          id: businessId,
          slug: profile.username,
          name: profile.displayName,
          createdAt: new Date().toISOString(),
          profile: profile,
        });

        // Assign the first business to the demo user as Owner
        // Assign others randomly or leave unowned for now? 
        // Let's give "cool-beans" to demo user.
        if (profile.username === 'cool-beans') {
          memberships.push({
            userId: DEMO_USER.id,
            businessId: businessId,
            role: 'owner',
          });
        }
      });

      localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(businesses));
      localStorage.setItem(STORAGE_KEYS.MEMBERSHIPS, JSON.stringify(memberships));
    }
  },

  async login(email: string, password: string): Promise<User> {
    await this.delay(500); // Simulate network

    const users = this.get<User[]>(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Persist session
    localStorage.setItem(STORAGE_KEYS.SESSION, user.id);
    return user;
  },

  async signup(name: string, email: string, password: string): Promise<User> {
    await this.delay(700);

    const users = this.get<User[]>(STORAGE_KEYS.USERS) || [];
    
    if (users.some(u => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser: User = {
      id: `user_${generateId()}`,
      email,
      name,
      password, // Plain text for mock
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`, // Random avatar
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Auto-login after signup
    localStorage.setItem(STORAGE_KEYS.SESSION, newUser.id);
    return newUser;
  },

  async logout(): Promise<void> {
    await this.delay(200);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  async getCurrentUser(): Promise<User | null> {
    if (typeof window === 'undefined') return null;
    const userId = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!userId) return null;

    const users = this.get<User[]>(STORAGE_KEYS.USERS) || [];
    return users.find(u => u.id === userId) || null;
  },

  async getBusinessesForUser(userId: string): Promise<{ business: Business; role: UserRole }[]> {
    await this.delay(300);
    const memberships = this.get<Membership[]>(STORAGE_KEYS.MEMBERSHIPS) || [];
    const businesses = this.get<Business[]>(STORAGE_KEYS.BUSINESSES) || [];

    const userMemberships = memberships.filter(m => m.userId === userId);
    
    return userMemberships.map(m => {
      const business = businesses.find(b => b.id === m.businessId);
      if (!business) return null;
      return { business, role: m.role };
    }).filter(item => item !== null) as { business: Business; role: UserRole }[];
  },

  async createBusiness(userId: string, data: { name: string; slug: string; bio: string }): Promise<Business> {
    await this.delay(600);
    const businesses = this.get<Business[]>(STORAGE_KEYS.BUSINESSES) || [];
    
    // Check slug uniqueness
    if (businesses.some(b => b.slug === data.slug)) {
      throw new Error("Handle is already taken");
    }

    const newBusiness: Business = {
      id: `biz_${generateId()}`,
      slug: data.slug,
      name: data.name,
      createdAt: new Date().toISOString(),
      profile: {
        username: data.slug,
        displayName: data.name,
        themeColor: 'orange', // Default
        widgets: [
             // Default starter widgets
            {
                id: `p_${generateId()}`,
                type: 'profile',
                size: '2x2',
                data: {
                    name: data.name,
                    bio: data.bio,
                }
            }
        ]
      }
    };

    // Save Business
    businesses.push(newBusiness);
    localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(businesses));

    // Save Membership
    const memberships = this.get<Membership[]>(STORAGE_KEYS.MEMBERSHIPS) || [];
    memberships.push({
      userId,
      businessId: newBusiness.id,
      role: 'owner'
    });
    localStorage.setItem(STORAGE_KEYS.MEMBERSHIPS, JSON.stringify(memberships));

    return newBusiness;
  },

  // Helpers
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
