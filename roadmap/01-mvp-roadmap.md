# MVP Roadmap: BiteBio App (Mock Mode)

This roadmap focuses on building the core UI/UX and frontend logic without a backend. We will use mock data and local state to simulate the user experience.

## Phase 1: Foundation & Static Pages
**Goal:** Establish the brand feel and main landing points.
- [x] **Landing Page (`/`)**
  - Hero section with value proposition ("Your Cafe's Digital Home").
  - "Claim your Link" input field (visual only, redirects to onboarding).
  - Feature highlights (Menu, Socials, Gallery).
  - Footer with links.
- [x] **About Page (`/about`)**
  - Simple informational page about the project/mission.
- [x] **Navigation**
  - specific Navbar for public pages vs. profile view.

## Phase 2: Public Profile Page (The Core)
**Goal:** Create the "Bento-style" profile view.
- [x] **Dynamic Route (`/[username]`)**
  - Create the page structure to handle dynamic slugs (e.g., `/cool-beans-cafe`).
- [x] **Mock Data Structure**
  - Define a TypeScript interface for a `Profile` (Bio, Links, Menu Items, Photos).
  - Create a mock data store (a file with JSON data for 2-3 example cafes).
- [x] **Bento Grid Layout**
  - Implement a fixed, responsive CSS grid.
  - **Widgets/Cards:**
    - [x] **Profile Card:** Avatar, Name, Bio.
    - [x] **Link Card:** Button style links (Instagram, Website, UberEats).
    - [x] **Menu Highlight Card:** Featured item with price and image.
    - [x] **Map Card:** Static map placeholder or simple embed.
    - [x] **Gallery Card:** Grid of 2-4 images.
- [x] **Responsiveness**
  - Ensure the grid collapses gracefully to a single column on mobile.

## Phase 3: Onboarding Simulation
**Goal:** Simulate the user signup flow.
- [ ] **Onboarding Route (`/onboard`)**
  - Multi-step form experience (using client-side state).
- [ ] **Step 1: Claim Link**
  - Input username (slug).
  - Simulate "Checking availability..." -> Success.
- [ ] **Step 2: Basic Info**
  - Cafe Name, Bio, Primary Color (if applicable).
- [ ] **Step 3: Preview**
  - Show a generated preview of their profile based on the inputs.
- [ ] **Success State**
  - "Your profile is ready!" screen (simulating a completed signup).

## Phase 4: Polish & Refinement
**Goal:** Ensure the "Maia" aesthetic and high-quality feel.
- [ ] **Animations**
  - Add simple entry animations for grid items (fade-in/slide-up).
- [ ] **Theme Check**
  - Verify all components strictly follow the Orange theme and Maia style.
  - Check consistency of standard Shadcn components.
- [ ] **Mobile Optimization**
  - Verify touch targets and stacking order on small screens.
