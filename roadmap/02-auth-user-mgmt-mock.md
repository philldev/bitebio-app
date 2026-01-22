# Roadmap: Auth & User Management (Mock Mode)

This roadmap outlines the steps to build a functional User Dashboard and Authentication simulation without a real backend. We will use `localStorage` and React Context to manage state.

## Phase 4: Auth Simulation & Foundation
**Goal:** Create the infrastructure for "logged in" users and secure routes.

- [ ] **Auth Context (`AuthContext`)**
  - Create a React Context to manage `user`, `isAuthenticated`, and `isLoading` states.
  - Implement `login(email, password)` (mock verification).
  - Implement `logout()`.
  - Persist session to `localStorage`.
- [ ] **Login Page (`/login`)**
  - Simple email/password form using Shadcn `Card` and `Input`.
  - Handle "success" redirect to Dashboard.
  - Handle "error" states (visual only).
- [ ] **Signup Integration**
  - Connect the existing `/onboard` flow to the `AuthContext`.
  - "Completing" onboarding should automatically log the user in.
- [ ] **Protected Routes**
  - Create a `ProtectRoute` component or logic in `middleware` (if possible with mock) or Layout to redirect unauthenticated users to `/login`.

## Phase 5: The Dashboard (CMS)
**Goal:** A private area where users can manage their BiteBio profile.

- [ ] **Dashboard Layout (`/dashboard`)**
  - Sidebar navigation (Overview, Profile, Widgets, Settings).
  - Mobile-responsive navigation drawer.
  - User dropdown with "Logout" and "View Public Profile".
- [ ] **Overview Page**
  - Welcome message.
  - "Quick Actions" cards (e.g., "Add a new dish", "Update status").
  - Mock Analytics chart (Views/Clicks over time).
- [ ] **Profile Editor (`/dashboard/profile`)**
  - Form to edit global profile settings:
    - Display Name
    - Bio / Description
    - Avatar Image (URL input for mock)
    - Theme/Color selection.

## Phase 6: Widget Management (CRUD)
**Goal:** Make the profile content dynamic and editable.

- [ ] **Local Data Store**
  - Create a simple client-side service to read/write the `Profile` object to `localStorage`.
  - Seed it with the existing mock data if empty.
- [ ] **Link Manager**
  - List existing links.
  - Add/Edit/Delete modal for links (Label, URL, Icon).
  - Drag-and-drop reordering (optional, if time permits).
- [ ] **Menu Manager**
  - List menu highlights.
  - Add/Edit/Delete modal for menu items (Name, Price, Image URL).
- [ ] **Gallery Manager**
  - Grid view of current images.
  - "Add Image" button (prompts for a URL).
  - Delete action.

## Phase 7: Integration
**Goal:** Connect the Dashboard to the Public Profile.

- [ ] **Dynamic Public Profile**
  - Update `/[username]/page.tsx` to read from the shared `localStorage` (via the service created in Phase 6) instead of the static `mock-data.ts`.
  - Fallback to static mock data if no local data exists (for demo purposes).
