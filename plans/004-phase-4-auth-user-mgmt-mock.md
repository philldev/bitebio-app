# Phase 4: Auth & User Management (Mock)

## Context
We are simulating a full authentication and user management system using `localStorage`. This allows us to build the complete Dashboard UI and editing flows without needing a backend yet.

## Goals
1.  **Auth Simulation:** Users can "login" and "signup" (data persisted locally).
2.  **Dashboard UI:** A protected area to manage the profile.
3.  **Dynamic Editing:** Changes in the dashboard update the public profile immediately.

## Step-by-Step Plan

### 1. Foundation: Auth Context
- [ ] Create `lib/auth-context.tsx`.
  - Define `User` type (id, email, name, avatar).
  - Implement `AuthProvider` with `login`, `logout`, `signup`.
  - Use `localStorage` key `bitebio-auth` to persist session.
- [ ] Wrap `app/layout.tsx` (or a sub-layout) with `AuthProvider`.

### 2. Login Page
- [ ] Create `app/(auth)/login/page.tsx`.
- [ ] Design a simple login form (Email, Password) using `Card`, `Input`, `Button`.
- [ ] Wire up form submission to `auth.login()`.
- [ ] Redirect to `/dashboard` on success.

### 3. Dashboard Layout
- [ ] Create `app/dashboard/layout.tsx`.
  - Check `auth.isAuthenticated`. If false, redirect to `/login`.
  - Implement a Sidebar/Top-nav structure.
  - Add "Logout" button.
- [ ] Create `app/dashboard/page.tsx` (Overview).
  - Show "Welcome, {user.name}".
  - Simple stats placeholders.

### 4. Integration with Public Profile
- [ ] Create `lib/storage.ts`.
  - Functions to `getProfile(username)`, `saveProfile(profile)`.
  - Initialize with `MOCK_DATA` if local storage is empty.
- [ ] Update `app/[username]/page.tsx`.
  - Use `useEffect` or similar to fetch profile from `storage.ts` instead of raw mock import.

### 5. Profile Editor (Basic Info)
- [ ] Create `app/dashboard/profile/page.tsx`.
- [ ] Form to edit: Name, Bio, Avatar URL.
- [ ] Save changes to `storage.ts`.

### 6. Widget Managers
- [ ] Create `app/dashboard/widgets/page.tsx`.
- [ ] **Links:** List view + Add/Edit Dialog.
- [ ] **Menu:** List view + Add/Edit Dialog.
- [ ] **Gallery:** Simple URL list manager.

## Verification
- [ ] "Login" with fake creds -> Redirects to Dashboard.
- [ ] "Logout" -> Redirects to Login.
- [ ] Edit Bio in Dashboard -> Refresh Public Profile -> Bio is updated.
