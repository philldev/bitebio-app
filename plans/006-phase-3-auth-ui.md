# Plan: Phase 3 - Auth UI Pages

## Goal
Implement the user interface for authentication, including Login and Signup pages, and enable user registration in the mock service.

## Proposed Changes

### 1. Update Mock Service (`lib/mock-auth-service.ts`)
- Add a `signup(name, email, password)` method.
- Logic:
    - Check if email already exists.
    - Create new `User` object.
    - Persist to `localStorage`.
    - Return the new user.

### 2. Update Auth Context (`components/auth/auth-provider.tsx`)
- Add `signup` method to the context interface.
- Implement the wrapper around `MockAuthService.signup`.
- On success, set the `user` state (auto-login) and redirect to `/onboard` (or `/dashboard` if we decide to skip onboarding for now, but roadmap suggests Onboarding connection is Phase 4. Let's redirect to `/dashboard` for now as a safe default, or `/onboard` if they have no businesses).

### 3. Login Page (`app/login/page.tsx`)
- **UI**:
    - Email & Password inputs.
    - "Sign In" button.
    - Link to `/signup`.
    - **Helper Text**: Display the demo credentials (`admin@demo.com` / `password`) for easy testing.
- **Logic**:
    - Call `login(email, password)`.
    - Handle errors (invalid credentials).
    - Redirect to `/dashboard` on success.

### 4. Signup Page (`app/signup/page.tsx`)
- **UI**:
    - Name, Email, Password inputs.
    - "Create Account" button.
    - Link to `/login`.
- **Logic**:
    - Call `signup(...)`.
    - Redirect to `/onboard` (Since a new user has no business, they need to onboard).

### 5. Dashboard Placeholder (`app/dashboard/page.tsx`)
- Create a protected page to verify login/signup redirects.
- Wrap with `<AuthGuard>`.
- Show "Welcome, {user.name}".
- Add a "Logout" button to test the lifecycle.

## Verification Plan
1.  **Signup Flow**: Register a new user -> Redirect to `/onboard`.
2.  **Login Flow**: Log in as Demo User -> Redirect to `/dashboard`.
3.  **Logout**: Click logout -> Redirect to `/login`.
4.  **Error Handling**: Try invalid password -> Show error message.

## Status
- [ ] Update MockAuthService
- [ ] Update AuthProvider
- [ ] Create Login Page
- [ ] Create Signup Page
- [ ] Create Dashboard Placeholder
