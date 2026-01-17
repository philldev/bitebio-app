# Plan: Phase 2 - Auth Context & State

## Goal
Implement global state management for authentication to track the logged-in user and protect restricted routes.

## Proposed Changes

### 1. Auth Context (`components/auth/auth-provider.tsx`)
Create a React Context to expose the auth state and methods to the application.
- **State**:
    - `user`: The current `User` object or `null`.
    - `isLoading`: Boolean to indicate if the session is being restored.
- **Methods**:
    - `login(email, password)`: Calls `MockAuthService.login` and updates state.
    - `logout()`: Calls `MockAuthService.logout` and updates state.
    - `signup(data)`: Calls `MockAuthService.createBusiness` (since our signup creates a biz) or a new `createUser` method. *Refinement:* For this phase, we'll focus on `login`. Signup might be part of the Onboarding flow later.
- **Lifecycle**:
    - On mount (`useEffect`), call `MockAuthService.init()` to ensure seed data exists.
    - Call `MockAuthService.getCurrentUser()` to restore the session from `localStorage`.

### 2. Global Provider Wrapper (`app/providers.tsx`)
Since `app/layout.tsx` is a Server Component, we need a client-side wrapper to hold our Context Providers.
- Create `app/providers.tsx`.
- Wrap children with `<AuthProvider>`.

### 3. Root Layout Integration (`app/layout.tsx`)
- Import `Providers` from `app/providers.tsx`.
- Wrap the main application content.

### 4. Auth Guard (`components/auth/auth-guard.tsx`)
Create a component to protect routes.
- **Logic**:
    - Check `useAuth()`.
    - If `isLoading`, show a spinner/skeleton.
    - If `!user` and `!isLoading`, redirect to `/login` (we will create a placeholder login page in Phase 3, but we can point to it now).
    - If `user`, render `children`.

## Verification Plan
1.  **Build Check**: Ensure no hydration mismatches or context errors.
2.  **State Persistence**: Manually check via React DevTools (or temporary logs) that `user` state is restored after a page reload.
3.  **Route Protection**: Try to wrap a page with `AuthGuard` and see if it redirects (will fail to 404 until `/login` exists, verifying the redirect logic works).

## Status
- [ ] Create `AuthProvider`
- [ ] Create `Providers` wrapper
- [ ] Update `RootLayout`
- [ ] Create `AuthGuard`
