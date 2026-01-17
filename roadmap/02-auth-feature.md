# Roadmap: Mock Authentication & Multi-Tenancy

This roadmap outlines the implementation of a **simulated** authentication system. We will replicate the behavior of a real backend (users, sessions, multiple businesses, permissions) using local state and mock data structures.

## Overview
-   **Goal:** Simulate a logged-in experience with support for multiple businesses and user roles.
-   **Constraint:** **NO** real backend services (Supabase/Firebase). Use client-side storage (localStorage) and in-memory mock data.

## Core Concepts (Simulated)
1.  **User:** A person with login credentials.
2.  **Business:** A distinct entity (cafe/restaurant) with its own profile data.
3.  **Membership:** Link between User and Business with a Role (`Owner`, `Admin`, `Editor`).
4.  **Session:** Persisted via `localStorage` to keep the user "logged in" across reloads.

---

## Phase 1: Mock Data Architecture
**Goal:** Define the data structures and a "Service" layer to interact with them.

- [x] **Data Interfaces (`types/auth.ts`)**:
    -   `User`: `{ id, email, name, avatarUrl }`
    -   `Business`: `{ id, slug, name, ...profileData }`
    -   `Role`: `'owner' | 'admin' | 'editor'`
    -   `Membership`: `{ userId, businessId, role }`
- [x] **Mock Service (`lib/mock-auth-service.ts`)**:
    -   `getUsers()` / `createUser()`
    -   `getBusinessesForUser(userId)`
    -   `login(email, password)` (Simulated check)
    -   `switchBusiness(businessId)`

---

## Phase 2: Auth Context & State
**Goal:** Global state management for the active user.

- [x] **`AuthProvider` Context**:
    -   State: `user` | `null`, `isLoading`.
    -   Methods: `login`, `signup`, `logout`.
    -   Behavior: On mount, check `localStorage` for a fake session token and restore the user.
- [x] **Protected Routes**:
    -   A wrapper component (e.g., `<RequireAuth>`) that redirects to `/login` if `user` is null.

---

## Phase 3: Auth UI Pages
**Goal:** Functional (mock) login and signup screens.

- [x] **`/login` Page**:
    -   Email/Password form.
    -   Hardcoded "Demo Accounts" help text (e.g., "Use admin@demo.com / password").
- [x] **`/signup` Page**:
    -   Create a new mock user.
    -   Redirect to Onboarding or Dashboard.
- [x] **Logout Functionality**:
    -   Button in the dashboard/navbar to clear session.

---

## Phase 4: Multi-Tenancy Dashboard
**Goal:** Manage multiple businesses.

- [x] **Dashboard Layout**:
    -   **Business Switcher:** A dropdown in the sidebar/nav to switch between businesses the user belongs to.
    -   **Business Context:** Global state for `activeBusiness`.
- [x] **Update Onboarding (`/onboard`)**:
    -   Instead of just "success", actually "create" the mock Business and Membership for the currently logged-in user.

---

## Phase 5: Team Management (Simulated)
**Goal:** Demonstrate RBAC (Role-Based Access Control).

- [ ] **Settings Page (`/dashboard/settings`)**:
    -   **Account Tab:** Update user name/email.
    -   **Team Tab:**
        -   List mock members.
        -   "Invite" button (adds a random mock user or allows typing an email to "fake invite").
        -   Change roles (Dropdown: Owner/Admin/Editor).
        -   *Validation:* Prevent non-admins from editing roles.

---

## Phase 6: Connecting to Public Profile
- [ ] **Dynamic Data Fetching**:
    -   Update the public `/[username]` route to look up the business in our `MockAuthService` instead of the static `mock-data.ts`.