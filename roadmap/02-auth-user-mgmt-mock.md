# Roadmap: Auth & User Management (Mock Mode)

This roadmap outlines the steps to build a functional User Dashboard and Authentication simulation without a real backend. We will use `localStorage` and React Context to manage state.

## Phase 4: Auth Simulation & Foundation
**Goal:** Create the infrastructure for "logged in" users and secure routes.

- [x] **Auth Context (`AuthContext`)**
  - Create a React Context to manage `user`, `isAuthenticated`, and `isLoading` states.
  - Implement `login(email, password)` (mock verification).
  - Implement `logout()`.
  - Persist session to `localStorage`.
- [x] **Login Page (`/login`)**
  - Simple email/password form using Shadcn `Card` and `Input`.
  - Handle "success" redirect to Dashboard.
  - Handle "error" states (visual only).
- [x] **Signup Integration**
  - Connect the existing `/onboard` flow to the `AuthContext`.
  - "Completing" onboarding should automatically log the user in.
- [x] **Protected Routes**
  - Create a `ProtectRoute` component or logic in `middleware` (if possible with mock) or Layout to redirect unauthenticated users to `/login`.

## Phase 5: The Dashboard (CMS)
**Goal:** A private area where users can manage their BiteBio profile.

- [x] **Dashboard Layout (`/dashboard`)**
  - Sidebar navigation (Overview, Profile, Widgets, Settings).
  - Mobile-responsive navigation drawer.
  - User dropdown with "Logout" and "View Public Profile".
- [x] **Overview Page**
  - Welcome message.
  - "Quick Actions" cards (e.g., "Add a new dish", "Update status").
  - Mock Analytics chart (Views/Clicks over time).
- [x] **Profile Editor (`/dashboard/profile`)**
  - Form to edit global profile settings:
    - Display Name
    - Bio / Description
    - Avatar Image (URL input for mock)
    - Theme/Color selection.

## Phase 6: Widget Management (CRUD)
**Goal:** Make the profile content dynamic and editable.

- [x] **Local Data Store**
  - Create a simple client-side service to read/write the `Profile` object to `localStorage`.
  - Seed it with the existing mock data if empty.
- [ ] **Widget Operations (Partial)**
  - [x] List existing widgets.
  - [x] Delete widgets.
  - [x] Reorder widgets (Up/Down).
  - [ ] **Create Widget:** "Add Widget" dialog/modal to select type and enter data.
  - [ ] **Update Widget:** "Edit" dialog/modal to modify widget content.

## Phase 7: Integration
**Goal:** Connect the Dashboard to the Public Profile.

- [x] **Dynamic Public Profile**
  - Update `/[username]/page.tsx` to read from the shared `localStorage` (via the service created in Phase 6) instead of the static `mock-data.ts`.
  - Fallback to static mock data if no local data exists (for demo purposes).