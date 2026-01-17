# Plan: Phase 4 - Multi-Tenancy Dashboard

## Goal
Transform the placeholder dashboard into a proper multi-tenant environment where users can manage multiple businesses and switch between them.

## Proposed Changes

### 1. Business Context (`components/auth/business-context.tsx`)
Create a context to manage the "Active" business.
- **State**:
    - `activeBusiness`: `Business | null`
    - `role`: `UserRole | null`
    - `businesses`: `BusinessContext[]` (List of all businesses the user belongs to)
    - `isLoading`: boolean
- **Actions**:
    - `switchBusiness(businessId)`: Updates `activeBusiness`.
    - `refreshBusinesses()`: Re-fetches the list from `MockAuthService`.
- **Lifecycle**:
    - On mount (or when `user` changes), fetch businesses.
    - Default to the first business in the list if no active one is set.

### 2. Dashboard Shell (`app/dashboard/layout.tsx`)
Create a layout that includes the navigation sidebar.
- **Sidebar Component**:
    - **Business Switcher**: Dropdown at the top to switch tenants.
    - **Navigation Links**:
        - Home (`/dashboard`)
        - Edit Profile (`/dashboard/editor`) - *Future Phase*
        - Settings (`/dashboard/settings`) - *Future Phase*
    - **User Menu**: Bottom (Avatar + Logout).

### 3. Business Switcher Component (`components/dashboard/business-switcher.tsx`)
- Dropdown menu (using Shadcn `DropdownMenu`).
- Lists all businesses.
- "Create New Business" button (redirects to Onboarding or a dedicated create flow).

### 4. Update Onboarding (`components/onboarding/steps/step-success.tsx`)
- Currently, it just "pretends" to succeed.
- **Change**: On "Publish Profile", call `MockAuthService.createBusiness()` with the onboarding data.
- Redirect to `/dashboard` with the new business set as active.

## Verification Plan
1.  **Context Switching**: 
    - Log in as Demo User (who owns "Cool Beans").
    - Use `createBusiness` (via updated Onboarding or a temp button) to add "Burger Joint".
    - Switch between them in the Dashboard sidebar.
    - Verify the "Active Business" name changes in the UI.
2.  **Persistence**: Reload the page. Ensure the last active business is remembered (optional, or just defaults to first).
3.  **Onboarding Integration**: Go through `/onboard` as a logged-in user and verify a new business is actually created in the mock DB.

## Status
- [ ] Create Business Context
- [ ] Create Business Switcher
- [ ] Create Dashboard Layout (Sidebar)
- [ ] Connect Onboarding to Real Creation
