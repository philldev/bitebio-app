# Phase 3: Onboarding Simulation Plan

## Goal
Simulate the user signup flow, allowing users to "claim" a link, enter basic profile information, and preview their generated profile.

## Features
1.  **Dedicated Onboarding Route:** A distraction-free environment for the signup process.
2.  **Multi-step Wizard:**
    -   **Step 1: Claim Link:** User enters a desired username. Simulated availability check.
    -   **Step 2: Basic Info:** User enters Cafe Name, Bio, and selects a Theme Color.
    -   **Step 3: Preview:** Real-time preview of the profile using the data entered.
    -   **Step 4: Success:** Confirmation screen.
3.  **State Management:** Client-side state to hold form data across steps.

## Technical Implementation

### 1. Routes & Layouts
-   **New Layout:** `app/onboard/layout.tsx`
    -   Simplified layout: Logo centered at the top, no main navigation or footer links to reduce distraction.
-   **New Page:** `app/onboard/page.tsx`
    -   Will host the `OnboardingWizard` client component.

### 2. Components
-   **`components/onboarding/onboarding-wizard.tsx`**: Main controller.
    -   Manages `currentStep` and `formData` state.
    -   Renders the appropriate step component based on state.
    -   Handles "Next" and "Back" transitions.
-   **`components/onboarding/steps/step-claim-link.tsx`**:
    -   Input for `username`.
    -   Validation logic (regex for slug).
    -   Simulated async check (spinner -> success checkmark).
-   **`components/onboarding/steps/step-basic-info.tsx`**:
    -   Inputs for `displayName`, `bio`.
    -   Simple color selector (optional, if we want to simulate customization).
-   **`components/onboarding/steps/step-preview.tsx`**:
    -   Constructs a temporary `Profile` object from `formData`.
    -   Uses `ProfileGrid` and `WidgetFactory` (from Phase 2) to render a preview.
    -   "Publish" button to proceed to Success.
-   **`components/onboarding/steps/step-success.tsx`**:
    -   Celebratory message.
    -   Link to view the "live" profile (which would route to `/[username]` with the mock data - *Note: Since we don't have a real backend, we might just redirect to one of the static mock profiles or pass query params to simulate it if feasible, but for this phase, a visual confirmation is sufficient*).

### 3. State Interface
```typescript
interface OnboardingData {
  username: string;
  displayName: string;
  bio: string;
  // themeColor: string; // Deferred for now unless easy to hook up
}
```

### 4. Implementation Steps
1.  **Setup Directory Structure:** Create `app/onboard`, `components/onboarding`.
2.  **Create Layout:** Implement the simplified layout.
3.  **Build Wizard Shell:** Create `OnboardingWizard` with basic step switching logic.
4.  **Implement Step 1 (Claim):** Add input, validation, and mock API delay.
5.  **Implement Step 2 (Info):** Add fields for name and bio.
6.  **Implement Step 3 (Preview):** Reuse `ProfileGrid` to show how it looks.
    -   *Strategy:* Create a default set of widgets (Heading, one Link, one Placeholder Menu item) and inject the user's Name/Bio into the Heading/Profile widget.
7.  **Implement Step 4 (Success):** Final success screen.
8.  **Refine UI:** Ensure "Maia" styles (Orange/Shadcn) are applied. Add animation for step transitions if time permits.

## Verification
-   User can navigate to `/onboard`.
-   User cannot proceed without valid input (validation).
-   Preview accurately reflects the data entered in previous steps.
-   Responsiveness checks on mobile view.
