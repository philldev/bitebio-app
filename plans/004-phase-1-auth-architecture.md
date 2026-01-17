# Plan: Phase 1 - Mock Data Architecture (Auth & Multi-Tenancy)

## Goal
Establish the foundational data structures and a service layer to simulate authentication and multi-tenancy without a real backend.

## Proposed Changes

### 1. Data Modeling (`types/auth.ts`)
Define the core interfaces that will represent our system's entities:
- **`User`**: Represents a logged-in person (id, email, name, avatar).
- **`Business`**: Represents a cafe/restaurant entity. It contains a `profile` property which maps to the existing `Profile` type from Phase 2.
- **`Membership`**: A junction type linking a `User` to a `Business` with a specific `UserRole` (`owner`, `admin`, `editor`).
- **`BusinessContext`**: A helper type for managing the currently active business in the dashboard.

### 2. Mock Service Layer (`lib/mock-auth-service.ts`)
Create a singleton service responsible for managing state in `localStorage`:
- **Initialization (`init`)**: 
    - Seed the system with a default `DEMO_USER` (`admin@demo.com` / `password`).
    - Convert existing `MOCK_PROFILES` into `Business` records.
    - Create a default `Membership` linking the demo user to at least one business.
- **Authentication Methods**:
    - `login(email, password)`: Verify credentials against the mock user list and set a session ID in `localStorage`.
    - `logout()`: Clear the session ID.
    - `getCurrentUser()`: Retrieve the user based on the session ID.
- **Business Management**:
    - `getBusinessesForUser(userId)`: Query memberships and return associated businesses.
    - `createBusiness(userId, data)`: Simulate the creation of a new business entity and an associated "owner" membership.
- **Utility Functions**:
    - `get<T>(key)`: Wrapper for `localStorage.getItem` with JSON parsing.
    - `delay(ms)`: Simulate network latency for a more realistic UI feel.

## Verification Plan
1. **Type Safety**: Ensure `Business` correctly wraps the `Profile` type so existing grid components can render them.
2. **Persistence**: Verify that data seeded during `init()` persists in the browser's LocalStorage.
3. **Build Integrity**: Run `bun run build` to ensure no circular dependencies or missing type exports.
4. **Logic Check**: Manually verify that `createBusiness` correctly updates both the `businesses` and `memberships` collections in storage.

## Status
- [x] Define Types
- [x] Implement MockAuthService
- [x] Build check
